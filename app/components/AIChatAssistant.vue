<template>
  <section class="ai-chat-section">
    <div class="chat-section">
      <div class="ai-chat-grid">
        <div class="ai-chat-info">
          <div class="richtext" v-html="getLocaleField(data, 'details', $i18n.locale)"></div>
          <button class="btn-try-ai" @click="scrollToChat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            {{ getLocaleField(data, 'button_text', $i18n.locale) }}
          </button>
        </div>

        <div class="ai-chat-demo" ref="chatDemo">
          <div class="chat-window">
            <div class="chat-messages" ref="messagesContainer">
              <div 
                v-for="(message, index) in messages" 
                :key="index"
                :class="['message', message.type === 'user' ? 'user-message' : 'bot-message']"
              >
                <div :class="['message-avatar', message.type === 'user' ? 'user-avatar' : 'bot-avatar']">
                  <svg v-if="message.type === 'user'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 7h-3.18C13.4 7.84 11.3 7 9 7c-2.3 0-4.4.84-5.82 2H0v2h3v8h2v-8h2v8h2v-4c0-1.66 1.34-3 3-3h2c1.66 0 3 1.34 3 3v4h2v-8h2v8h2v-8h3V9z"/>
                  </svg>
                </div>
                <div :class="['message-bubble', message.type === 'user' ? 'user-bubble' : 'bot-bubble']">
                  {{ message.text }}
                </div>
              </div>
            </div>

            <div class="chat-input-container">
              <input
                v-model="inputMessage"
                type="text"
                class="chat-input"
                :placeholder="inputPlaceholder"
                @keypress.enter="sendMessage"
                :disabled="!isConnected || isTyping"
              />
              <div class="input-actions">
                <button class="input-btn" @click="attachFile" aria-label="Attach file">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                <button 
                  class="input-btn send-btn" 
                  @click="sendMessage"
                  :disabled="!inputMessage.trim() || !isConnected || isTyping"
                  aria-label="Send message"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  wsUrl: {
    type: String,
    default: 'wss://api.robot.marketize.biz/ws/chat'
  }
});

const messages = ref([]);
const inputMessage = ref('');
const isTyping = ref(false);
const isConnected = ref(false);
const ws = ref(null);
const messagesContainer = ref(null);
const chatDemo = ref(null);
const currentBotMessage = ref(null);
let typingTimeout = null;


const inputPlaceholder = computed(() => {
  if (!isConnected.value) return 'Connecting...';
  if (isTyping.value) return 'AI is typing...';
  return 'Ask anything';
});

const connectWebSocket = () => {
  try {
    ws.value = new WebSocket(props.wsUrl);

    ws.value.onopen = () => {
      console.log('✅ WebSocket connected');
      isConnected.value = true;
    };

    ws.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      } catch (error) {
        console.error('Error parsing message:', event.data);
      }
    };

    ws.value.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      isConnected.value = false;
    };

    ws.value.onclose = () => {
      console.warn('⚠️ WebSocket disconnected');
      isConnected.value = false;

      // Auto reconnect after 3s
      setTimeout(() => {
        if (!isConnected.value) connectWebSocket();
      }, 3000);
    };
  } catch (err) {
    console.error('WebSocket connection failed:', err);
    isConnected.value = false;
  }
};

const handleIncomingMessage = (data) => {
  if (data.type === 'chunk') {
    showChunk(data.content || '');
  } else if (data.type === 'done') {
    isTyping.value = false;
    currentBotMessage.value = null;
  } else if (data.type === 'message') {
    addBotMessage(data.text || '');
  } else if (data.type === 'error') {
    addBotMessage(`⚠️ Error: ${data.message}`);
  }
};

const showChunk = (chunk) => {
  if (!chunk) return;
  isTyping.value = true;

  if (!currentBotMessage.value) {
    currentBotMessage.value = {
      type: 'bot',
      text: '',
      timestamp: new Date()
    };
    messages.value.push(currentBotMessage.value);
  }

  const chars = chunk.split('');
  let index = 0;

  const typeNextChar = () => {
    if (index < chars.length) {
      currentBotMessage.value.text += chars[index];
      index++;
      scrollToBottom();
      setTimeout(typeNextChar, 20);
    }
  };

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(typeNextChar, 10);
};

const sendMessage = () => {
  if (!inputMessage.value.trim() || !isConnected.value || isTyping.value) return;

  const msg = inputMessage.value.trim();

  messages.value.push({
    type: 'user',
    text: msg,
    timestamp: new Date()
  });

  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({
      type: 'message',
      text: msg
    }));
  }

  inputMessage.value = '';
  isTyping.value = true;
  currentBotMessage.value = null;
  scrollToBottom();
};

const addBotMessage = (text) => {
  isTyping.value = false;
  currentBotMessage.value = null;
  messages.value.push({
    type: 'bot',
    text,
    timestamp: new Date()
  });
  scrollToBottom();
};

const attachFile = () => {
  console.log('Attach file clicked');
};

const scrollToChat = () => {
  if (chatDemo.value) {
    chatDemo.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  connectWebSocket();
  scrollToBottom();
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
});

</script>

<style scoped>
.ai-chat-section {
  padding: 2rem 0;
}

.chat-section {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 16px;
  border: 2px solid #FF00001A;
}

.ai-chat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.ai-chat-info {
  padding-right: 2rem;
}

.richtext {
  padding-bottom: 2rem;
}

:deep(.richtext h2) {
  font-size: 48px;
  line-height: 56px;
  font-weight: 500;
}

:deep(.richtext h4) {
  font-size: 20px !important;
  line-height: 30px !important;
  font-weight: 500 !important;
  vertical-align: middle !important;
}

:deep(.richtext p) {
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
}

:deep(.richtext ul) {
  list-style: none;
  padding-left: 0;
}

:deep(.richtext li) {
  position: relative;
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
  font-weight: 300;
  margin-left: 1rem;
  padding-left: 1.5rem;
}

:deep(.richtext li::before) {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 18px;
}

.btn-try-ai {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.btn-try-ai:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.btn-try-ai svg {
  width: 20px;
  height: 20px;
}

.ai-chat-demo {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.connection-status.connected {
  background: #d1fae5;
  color: #065f46;
}

.connection-status.disconnected {
  background: #fee2e2;
  color: #991b1b;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.connected .status-dot {
  background: #10b981;
}

.disconnected .status-dot {
  background: #ef4444;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.chat-window {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 300px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.message {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar {
  background: #e5e7eb;
  color: #6b7280;
}

.bot-avatar {
  background: #ef4444;
  color: white;
}

.message-bubble {
  padding: 1rem 1.25rem;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  flex-direction: row-reverse;
}

.user-bubble {
  background: #f3f4f6;
  color: #1a1a1a;
  border-top-right-radius: 4px;
}

.bot-message {
  position: relative;
}

.bot-bubble {
  background: #ef4444;
  color: white;
  border-top-left-radius: 4px;
}
.chat-input-container {
  position: relative;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: border-color 0.2s;
}

.chat-input-container:focus-within {
  border-color: #ef4444;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.chat-input::placeholder {
  color: #9ca3af;
}

.chat-input:disabled {
  background: transparent;
  cursor: not-allowed;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #6b7280;
}

.input-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.input-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  background: #ef4444;
  color: white;
}

.send-btn:hover:not(:disabled) {
  background: #dc2626;
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #fca5a5;
}

@media (max-width: 1024px) {
  .ai-chat-info {
    padding-right: 0;
    text-align: left;
  }

  .btn-try-ai {
    display: inline-flex;
  }
}

@media (max-width: 760px) {
  :deep(.richtext h2){
    font-size: 34px;
    line-height: 44px;
  }
  .ai-chat-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .chat-section {
    padding: 1rem;
  }
  
  .ai-chat-section {
    padding: 2rem 0;
  }

  .ai-chat-demo {
    padding: 1rem;
  }

  .message-bubble {
    max-width: 85%;
    font-size: 0.875rem;
  }

  .chat-messages {
    min-height: 250px;
    max-height: 400px;
  }
}

@media (min-width: 1024px) {
  .chat-section {
    padding: 4rem 2rem;
  }
}
</style>