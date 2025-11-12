<template>
  <div
    class="chat-container"
    :style="{ minHeight: data['min-height'], maxHeight: data['max-height'] }"
  >
    <!-- Welcome screen -->
    <div v-if="messages.length === 0" class="welcome-screen">
      <div class="welcome-content">
        <div class="welcome-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="welcome-title">Talk with your Robonnement Guide Assistant</h1>
        <p class="welcome-subtitle">How can I help you today?</p>
      </div>
    </div>

    <!-- Chat messages -->
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

    <!-- Input box -->
    <div class="input-container">
      <!-- Chips section - fixed at bottom above input -->
      <div class="chips-section" v-if="!selectedChip && !inputMessage && (!messages || messages.length === 0)" ref="chipsSection">
        <div class="chips-container">
          <button
            v-for="chip in suggestionChips"
            :key="chip.id"
            @click="handleChipClick(chip.id, $event)"
            :class="['chip', { 'chip-active': selectedChip === chip.id }]"
          >
            <span class="chip-icon">{{ chip.icon }}</span>
            <span class="chip-label">{{ chip.label }}</span>
          </button>
        </div>
      </div>

      <!-- Suggestions dropdown - shows when chip is selected -->
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
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  selectedRobotName: {
    type: String,
    default: null
  }
})

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
const uidKey = 'chat_uid'
const uid = ref('')

const suggestionChips = [
  {
    id: 'setup',
    icon: '📚',
    label: 'Setup Guide',
    suggestions: [
      'deploy and setup the CC1 cleaning robot?',
      'install the T300 towing device?',
      'How to calibrate BellaBot Pro tray cameras?',
      'How to configure MT1 for warehouse cleaning?',
    ],
  },
  {
    id: 'troubleshoot',
    icon: '🔧',
    label: 'Troubleshoot',
    suggestions: [
      'Help me fix robot charging and battery issues',
      'Help me fix navigation and positioning problems',
      'Help me fix sensor calibration and detection',
      'Help me fix mapping and localization errors',
    ],
  },
  {
    id: 'compare',
    icon: '⚖️',
    label: 'Compare',
    suggestions: [
      'Compare CC1 vs MT1 cleaning capabilities',
      'Compare BellaBot vs BellaBot Pro features',
      'Compare T300 vs MT1 for material transport',
      'Compare environmental requirements across models',
    ],
  },
  {
    id: 'maintenance',
    icon: '🛠️',
    label: 'Maintenance',
    suggestions: [
      'Maintain cleaning brushes and filtration systems',
      'Maintain charging systems and battery health',
      'Maintain sensors and camera calibration',
      'Maintain safety systems and fall prevention',
    ],
  },
  {
    id: 'operations',
    icon: '⚙️',
    label: 'Operations',
    suggestions: [
      'Operate robots in different cleaning modes',
      'Operate towing and material transport systems',
      'Operate virtual walls and restricted areas',
      'Operate multi-robot coordination and scheduling',
    ],
  },
  {
    id: 'think',
    icon: '💡',
    label: 'Think Deploy',
    suggestions: [
      'Analyze optimal robot deployment strategies',
      'Analyze environmental safety requirements',
      'Analyze cost-benefit of automation solutions',
      'Analyze integration with existing workflows',
    ],
  },
]

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
  if (event) {
    event.stopPropagation()
  }
  selectedChip.value = selectedChip.value === id ? null : id
}

const getCurrentSuggestions = () => {
  const chip = suggestionChips.find(c => c.id === selectedChip.value)
  return chip ? chip.suggestions : []
}

const handleSuggestionClick = (suggestion, event) => {
  if (event) {
    event.stopPropagation()
  }
  inputMessage.value = 'How to ' + suggestion
  selectedChip.value = null
  nextTick(() => document.querySelector('.message-input')?.focus())
}

// Handle incoming WebSocket messages
const handleWsMessage = (event) => {
  try {
    const payload = JSON.parse(event.data)
    if (payload && payload.type === 'broadcast' && Array.isArray(payload.content)) {
      for (const item of payload.content) {
        if (!item) continue
        const itemUid = item.uid || item.user_id || item.userId
        if (itemUid && uid.value && itemUid === uid.value) {
          const output = item.output ?? item.message ?? item.text ?? ''
          if (!output) continue
          // Find the last typing indicator from assistant, replace with output; otherwise push new assistant message
          let typingIdx = -1
          for (let i = messages.value.length - 1; i >= 0; i--) {
            if (messages.value[i]?.type === 'assistant' && messages.value[i]?.text === 'AI is typing…') {
              typingIdx = i
              break
            }
          }
          if (typingIdx >= 0) {
            messages.value[typingIdx].text = output
          } else {
            messages.value.push({ type: 'assistant', text: output })
          }
          isTyping.value = false
          scrollToBottom()
        }
      }
    }
  } catch (err) {
    // Ignore malformed messages
  }
}

// Connect to WebSocket server
const connectWebSocket = () => {
  if (!uid.value) return
  try {
    const wsUrl = `wss://api.robot.marketize.biz/ws/chat?uid=${encodeURIComponent(uid.value)}`
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
      // Optional simple retry (basic backoff)
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
  // Reset textarea height
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
    // Send the prompt to backend; response will arrive via WebSocket
    const response = await fetch('https://muazzem.app.n8n.cloud/webhook/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: uid.value || sessionStorage.getItem(uidKey), message: msg }),
    })
    // We ignore HTTP response body and rely on WS broadcast
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
  nextTick(() => {
    if (messagesEnd.value && typeof messagesEnd.value.scrollIntoView === 'function') {
      messagesEnd.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
      return
    }
    const container = document.querySelector('.messages-content')
    container?.scrollTo({ top: 999999, behavior: 'smooth' })
  })
}

// Auto-resize textarea
const autoResizeTextarea = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
}

// Handle click outside to close suggestions
const handleClickOutside = (event) => {
  if (!selectedChip.value) return

  const dropdown = suggestionsDropdown.value
  const chips = chipsSection.value

  // Check if click is outside both suggestions dropdown and chips section
  if (
    dropdown &&
    !dropdown.contains(event.target) &&
    (!chips || !chips.contains(event.target))
  ) {
    selectedChip.value = null
  }
}

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Initialize uid once per session
  let existing = sessionStorage.getItem(uidKey)
  if (!existing) {
    try {
      existing = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
    } catch (e) {
      existing = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
    }
    sessionStorage.setItem(uidKey, existing)
  }
  uid.value = existing
  // Connect WS after uid available
  connectWebSocket()
})

// Remove click outside listener
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    try { socket.value.close() } catch (e) {}
  }
})

// Watch for selected robot name changes and update input
watch(() => props.selectedRobotName, (newRobotName) => {
  if (newRobotName) {
    inputMessage.value = "Tell me about the " + newRobotName + " robot" 
    // Focus the input after updating
    nextTick(() => {
      const textarea = document.querySelector('.message-input')
      if (textarea) {
        textarea.focus()
        // Auto-resize if needed
        autoResizeTextarea({ target: textarea })
      }
    })
  }
}, { immediate: false })
</script>

<style scoped>
@import './chat.css';

</style>