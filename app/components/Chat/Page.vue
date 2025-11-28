<template>
  <div
    class="chat-container"
    :style="{ minHeight: data['min-height'], maxHeight: data['max-height'] }"
  >
    <!-- Collapse/Expand Button -->
    <button v-if="route.path === '/chat'"
      class="sidebar-toggle-btn" 
      :class="{ 'sidebar-open': isSidebarOpen, 'sidebar-closed': !isSidebarOpen }"
      @click="$emit('toggle-sidebar')"
    >
      <svg 
        v-if="isSidebarOpen" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg 
        v-else 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div v-if="messages.length === 0" class="welcome-screen">
      
      <div class="welcome-content">
        <div class="welcome-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="welcome-title">Talk with your Robonnement Guide Assistant</h1>
        <p class="welcome-subtitle">How can I help you today?</p>
      </div>
    </div>

    <div v-else class="messages-wrapper" ref="messagesContainer">
      <div class="messages-content">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message-row', message.type === 'user' ? 'user-message-row' : 'assistant-message-row']"
        >
          <div v-if="message.type === 'assistant'" class="message-avatar">
            <div class="avatar-assistant">
              <i class="fa-solid fa-robot"></i>
            </div>
          </div>
          <div :class="['message-bubble', message.type]">
            <div v-if="message.text === 'AI is typing…'" class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <div v-else class="message-text">{{ message.text }}</div>
          </div>
        </div>
        <div ref="messagesEnd"></div>
      </div>
    </div>

    <div class="input-container">
      <div class="chips-section" v-if="!selectedChip && !inputMessage && (!messages || messages.length === 0)" ref="chipsSection">
        <div class="chips-container">
          <button
            v-for="chip in Chips"
            :key="chip.id"
            @click="handleChipClick(chip.id, $event)"
            :class="['chip', { 'chip-active': selectedChip === chip.id }]"
          >
            <span class="chip-icon">{{ chip.icon }}</span>
            <span class="chip-label">{{ chip.label }}</span>
          </button>
        </div>
      </div>

      <transition name="slide-up">
        <div 
          v-if="selectedChip" 
          ref="suggestionsDropdown" 
          class="suggestions-dropdown"
          :style="suggestionsDropdownStyle"
        >
          <div class="suggestions-content">
            <button
              v-for="(suggestion, index) in getCurrentSuggestions()"
              :key="index"
              @click="handleSuggestionClick(suggestion, $event)"
              class="suggestion-item"
            >
              <span class="suggestion-prefix">How to</span>
              <span class="suggestion-text">{{ suggestion }}</span>
            </button>
          </div>
        </div>
      </transition>
      <div class="input-wrapper">
        <textarea
          v-model="inputMessage"
          type="text"
          :placeholder="inputPlaceholder"
          class="message-input"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.shift.enter.exact="true"
          @input="autoResizeTextarea"
          :disabled="!isConnected || isTyping"
          rows="1"
        />
        <button 
          class="send-button" 
          @click="sendMessage"
          :disabled="!isConnected || isTyping || !inputMessage.trim()"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chips from './Chips'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  selectedRobotName: {
    type: String,
    default: null
  },
  isSidebarOpen: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle-sidebar'])

const messages = ref([])
const inputMessage = ref('')
const isTyping = ref(false)
const isConnected = ref(false)
const socket = ref(null)
const selectedChip = ref(null)
const suggestionsDropdown = ref(null)
const chipsSection = ref(null)
const messagesEnd = ref(null)
const messagesContainer = ref(null)

const uidCookie = useCookie('uid')

const API_BASE = 'https://api.robot.marketize.biz/api/v1'

const inputPlaceholder = computed(() =>
  isTyping.value ? 'AI is typing...' : 'Ask anything...'
)

const suggestionsDropdownStyle = computed(() => {
  const showChips = !inputMessage.value && (!messages.value || messages.value.length === 0)
  if (showChips && chipsSection.value && chipsSection.value.offsetHeight > 0) {
    const chipsHeight = chipsSection.value.offsetHeight
    return {
      bottom: `calc(100% + 1rem + ${chipsHeight}px)`
    }
  }
  return {
    bottom: 'calc(100% + 1rem)'
  }
})

const handleChipClick = (id, event) => {
  if (event) event.stopPropagation()
  selectedChip.value = selectedChip.value === id ? null : id
}

const getCurrentSuggestions = () => {
  const chip = Chips.find(c => c.id === selectedChip.value)
  return chip ? chip.suggestions : []
}

const handleSuggestionClick = (suggestion, event) => {
  if (event) event.stopPropagation()
  inputMessage.value = 'How to ' + suggestion
  selectedChip.value = null
  nextTick(() => document.querySelector('.message-input')?.focus())
}

const loadChatHistory = async () => {
  if (!uidCookie.value) return
  try {
    const res = await fetch(`${API_BASE}/chat?uid=${encodeURIComponent(uidCookie.value)}`)
    if (!res.ok) return
    const data = await res.json()
    if (Array.isArray(data.results)) {
      messages.value = data.results
      .flatMap(item => [
        { type: 'user', text: item.question },
        { type: 'assistant', text: item.output }
      ])
      scrollToBottom()
    }
  } catch (err) {
    console.error('Error loading chat history:', err)
  }
}

const handleWsMessage = (event) => {
  try {
    const payload = JSON.parse(event.data);

    if (payload?.type === "broadcast" && payload.content) {
      const output =
        payload.content.output ??
        payload.content.message ??
        payload.content.text ??
        "";

      if (!output) return;

      // Find typing bubble
      const typingIdx = messages.value.findIndex(
        (m) => m.type === "assistant" && m.text === "AI is typing…"
      );

      if (typingIdx !== -1) {
        // Replace “typing…” with actual message
        messages.value = messages.value.map((m, i) =>
          i === typingIdx ? { ...m, text: output } : m
        );
      } else {
        // Add a new assistant message
        messages.value = [
          ...messages.value,
          { type: "assistant", text: output },
        ];
      }

      isTyping.value = false;
      scrollToBottom();
    }
  } catch (e) {
    console.error("WS parse error", e);
  }
};


const connectWebSocket = () => {
  if (!uidCookie.value) return
  try {
    const wsUrl = `wss://api.robot.marketize.biz/ws/chat?uid=${encodeURIComponent(uidCookie.value)}`
    const ws = new WebSocket(wsUrl)
    socket.value = ws
    ws.onopen = () => {
      isConnected.value = true
    }
    ws.onmessage = handleWsMessage
    ws.onerror = () => {
      isConnected.value = false
    }
    ws.onclose = () => {
      isConnected.value = false
      socket.value = null
      setTimeout(() => connectWebSocket(), 1500)
    }
  } catch (e) {
    isConnected.value = false
  }
}

const sendMessage = async () => {
  const msg = inputMessage.value.trim()
  if (!msg || isTyping.value) return

  messages.value.push({ type: 'user', text: msg })
  inputMessage.value = ''
  nextTick(() => {
    const textarea = document.querySelector('.message-input')
    if (textarea) {
      textarea.style.height = 'auto'
    }
  })
  isTyping.value = true
  const typingIndex = messages.value.push({ type: 'assistant', text: 'AI is typing…' }) - 1
  scrollToBottom()

  try {
    const response = await fetch('https://n8n.marketize.biz/webhook/robot-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: uidCookie.value, message: msg, company_name: "robot_suisses"}),
    })
    if (!response.ok) {
      messages.value[typingIndex].text = 'Failed to send message.'
      isTyping.value = false
    }
  } catch (e) {
    messages.value[typingIndex].text = 'Failed to get a response.'
    isTyping.value = false
  } finally {
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (route.path === '/chat') {
    nextTick(() => {
      if (messagesEnd.value && typeof messagesEnd.value.scrollIntoView === 'function') {
        messagesEnd.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
        return
      }
      const container = document.querySelector('.messages-content')
      container?.scrollTo({ top: 999999, behavior: 'smooth' })
    })
  }
}

const autoResizeTextarea = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
}

const handleClickOutside = (event) => {
  if (!selectedChip.value) return
  const dropdown = suggestionsDropdown.value
  const chips = chipsSection.value
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    (!chips || !chips.contains(event.target))
  ) {
    selectedChip.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  connectWebSocket()
  loadChatHistory()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    try { socket.value.close() } catch (e) {}
  }
})

watch(() => props.selectedRobotName, (newRobotName) => {
  if (newRobotName) {
    inputMessage.value = "Tell me about the " + newRobotName + " robot"
    nextTick(() => {
      const textarea = document.querySelector('.message-input')
      if (textarea) {
        textarea.focus()
        autoResizeTextarea({ target: textarea })
      }
    })
  }
}, { immediate: false })
</script>


<style scoped>
@import './chat.css';

.sidebar-toggle-btn {
  position: fixed;
  top: 5.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.4s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #6b7280;
}
.sidebar-toggle-btn.sidebar-open {
  left: 16.5rem;
}

/* When sidebar is closed */
.sidebar-toggle-btn.sidebar-closed {
  left: 1.5rem;
}

.sidebar-toggle-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #FF0000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-toggle-btn:active {
  transform: scale(0.95);
}
</style>