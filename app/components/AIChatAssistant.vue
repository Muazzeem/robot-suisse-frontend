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
                <button 
                  v-if="message.type === 'bot'"
                  class="delete-btn" 
                  @click="deleteMessage(index)"
                  aria-label="Delete message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </div>

              <!-- Typing indicator -->
              <div v-if="isTyping" class="message bot-message">
                <div class="message-avatar bot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 7h-3.18C13.4 7.84 11.3 7 9 7c-2.3 0-4.4.84-5.82 2H0v2h3v8h2v-8h2v8h2v-4c0-1.66 1.34-3 3-3h2c1.66 0 3 1.34 3 3v4h2v-8h2v8h2v-8h3V9z"/>
                  </svg>
                </div>
                <div class="message-bubble bot-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <path d="M12 5v14M5 12h14"/>
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
  data: null,
  wsUrl: {
    type: String,
    default: 'wss://echo.websocket.org'
  }
});

// Refs
const messages = ref([
  {
    type: 'user',
    text: 'I need a robot for warehouse automation. What do you recommend?',
    timestamp: new Date()
  },
  {
    type: 'bot',
    text: 'Based on your warehouse size and requirements, I recommend the LogiBot Warehouse series. It offers heavy lifting capabilities and fleet coordination. Would you like to see detailed specifications?',
    timestamp: new Date()
  }
]);

const inputMessage = ref('');
const isTyping = ref(false);
const isConnected = ref(false);
const ws = ref(null);
const messagesContainer = ref(null);
const chatDemo = ref(null);

// Computed
const inputPlaceholder = computed(() => {
  if (!isConnected.value) return 'Connecting...';
  if (isTyping.value) return 'AI is typing...';
  return 'Ask anything';
});

const connectionStatus = computed(() => {
  return isConnected.value ? 'Connected' : 'Disconnected';
});

// Methods
const connectWebSocket = () => {
  try {
    ws.value = new WebSocket(props.wsUrl);
    
    ws.value.onopen = () => {
      console.log('WebSocket connected');
      isConnected.value = true;
    };
    
    ws.value.onmessage = (event) => {
      console.log('Message received:', event.data);
      
      try {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      } catch (error) {
        // If not JSON, treat as plain text
        addBotMessage(event.data);
      }
    };
    
    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error);
      isConnected.value = false;
    };
    
    ws.value.onclose = () => {
      console.log('WebSocket disconnected');
      isConnected.value = false;
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (!isConnected.value) {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }
      }, 3000);
    };
  } catch (error) {
    console.error('Failed to connect WebSocket:', error);
    isConnected.value = false;
  }
};

const handleIncomingMessage = (data) => {
  if (data.type === 'message') {
    addBotMessage(data.text || data.message);
  } else if (data.type === 'typing') {
    isTyping.value = data.isTyping;
  } else if (data.type === 'error') {
    addBotMessage(`Error: ${data.message}`);
  } else {
    // Handle other message types
    addBotMessage(data.text || data.message || JSON.stringify(data));
  }
};

const sendMessage = () => {
  if (!inputMessage.value.trim() || !isConnected.value || isTyping.value) return;
  
  const message = inputMessage.value.trim();
  
  // Add user message to chat
  messages.value.push({
    type: 'user',
    text: message,
    timestamp: new Date()
  });
  
  // Send to WebSocket
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({
      type: 'message',
      text: message,
      timestamp: new Date().toISOString()
    }));
    
    // Show typing indicator
    isTyping.value = true;
  }
  
  // Clear input
  inputMessage.value = '';
  
  // Scroll to bottom
  scrollToBottom();
};

const addBotMessage = (text) => {
  isTyping.value = false;
  
  messages.value.push({
    type: 'bot',
    text: text,
    timestamp: new Date()
  });
  
  scrollToBottom();
};

const deleteMessage = (index) => {
  messages.value.splice(index, 1);
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const scrollToChat = () => {
  if (chatDemo.value) {
    chatDemo.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const attachFile = () => {
  // Implement file attachment logic
  console.log('Attach file clicked');
  // You can emit an event or open a file dialog
};

const toggleVoice = () => {
  // Implement voice input logic
  console.log('Voice input clicked');
  // You can implement speech recognition here
};

// Lifecycle
onMounted(() => {
  connectWebSocket();
  scrollToBottom();
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
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
  font-size: 48px !important;
  line-height: 56px !important;
  font-weight: 500 !important;
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
  max-height: 350px;
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

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 1rem 1.5rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.bot-message:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: #fee2e2;
}

.delete-btn svg {
  color: #ef4444;
}

.chat-input-container {
  position: relative;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 1rem;
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

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
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
  .chat-section{
    padding: 4rem 2rem;
  }
}
</style>