<template>
  <section class="ai-chat-section">
    <div class="chat-section">
      <div class="ai-chat-grid">
        <div class="ai-chat-info">
          <div class="richtext" v-html="getLocaleField(data, 'details', $i18n.locale)"></div>
          <NuxtLink to="/chat">
            <button class="btn-try-ai" @click="scrollToChat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            {{ getLocaleField(data, 'button_text', $i18n.locale) }}
          </button>
          </NuxtLink>
        </div>

        <div class="ai-chat-demo" ref="chatDemo">
          <div class="chat-window">
            <ChatPage :data="{ 'min-height': '40rem', 'max-height': '40rem' }" />
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
  background: #ff0000;
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
    padding: 0rem;
  }
}

@media (min-width: 1024px) {
  .chat-section {
    padding: 1.5rem 2rem;
  }
}
</style>