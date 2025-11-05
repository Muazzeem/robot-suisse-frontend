<template>
  <Header />
  <div class="chat-container">
    <div class="messages-wrapper" ref="messagesContainer">
      <div class="messages-content">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message-row', message.type === 'user' ? 'user-message' : 'assistant-message']"
        >
          <div :class="['message-bubble', message.type]">
            {{ message.text }}
          </div>
        </div>
        <div ref="messagesEnd"></div>
      </div>
    </div>
    <div class="input-container">
      <div class="input-wrapper">
        <button class="icon-button add-button" @click="attachFile">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
               viewBox="0 0 24 24" fill="none" stroke="currentColor" 
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        <input
          v-model="inputMessage"
          type="text"
          :placeholder="inputPlaceholder"
          class="message-input"
          @keypress.enter="sendMessage"
          :disabled="!isConnected"
        />

        <button class="icon-button mic-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
               viewBox="0 0 24 24" fill="none" stroke="currentColor" 
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>

        <button class="icon-button send-button" @click="sendMessage">
          <i class="fa-solid fa-paper-plane" style="font-size: 1.2rem;"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'chat'
})

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
const messagesEnd = ref(null);
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
      type: 'assistant',
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
    type: 'assistant',
    text,
    timestamp: new Date()
  });
  scrollToBottom();
};

const attachFile = () => {
  console.log('Attach file clicked');
};

const scrollToBottom = () => {
  nextTick(() => {
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' });
  });
};

onMounted(() => {
  connectWebSocket();
  scrollToBottom();
});

onUnmounted(() => {
  if (ws.value) ws.value.close();
  if (typingTimeout) clearTimeout(typingTimeout);
});
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.25rem;
  }
}

.chat-container {
  padding: 6rem 0 0 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9fafb;
}

.messages-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.messages-content {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-row {
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.assistant-message {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 42rem;
  padding: 0.875rem 1.25rem;
  border-radius: 1rem;
  font-size: 14.5px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.message-bubble.user {
  background-color: #1f2937;
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.message-bubble.assistant {
  background-color: white;
  color: #1f2937;
  border-bottom-left-radius: 0.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container {
  padding: 1rem;
  background-color: #f9fafb;
}

.input-wrapper {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: white;
  border-radius: 1.5rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 14px;
  background: transparent;
  color: #1f2937;
}

.message-input::placeholder {
  color: #9ca3af;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.icon-button:hover {
  background-color: #f3f4f6;
}

.add-button {
  color: #6b7280;
}

.mic-button {
  color: #6b7280;
}

.send-button {
  background-color: #FF0000;
  color: white;
}

.send-button:hover {
  background-color: #dc2626;
}

/* Scrollbar Styling */
.messages-wrapper::-webkit-scrollbar {
  width: 6px;
}

.messages-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.messages-wrapper::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.messages-wrapper::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>