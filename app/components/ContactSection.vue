<template>
  <section class="contact">
    <div class="contact-grid">
      <div class="contact-content">
        <div class="richtext" v-html="getLocaleField(data, 'description', $i18n.locale)"></div>

        <div class="chat-option">
          <div class="chat-info">
            <div class="chat-icon bg-red">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.67-.32-3.83-.88l-.27-.14-2.83.48.48-2.83-.14-.27C4.32 14.67 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                <path
                  d="M12 6c-3.31 0-6 2.69-6 6 0 1.01.25 1.97.7 2.8l.15.27-.64 2.34 2.34-.64.27.15c.83.45 1.79.7 2.8.7 3.31 0 6-2.69 6-6s-2.69-6-6-6zm0 10.5c-.83 0-1.62-.21-2.3-.58l-.16-.09-1.17.32.32-1.17-.09-.16c-.37-.68-.58-1.47-.58-2.3 0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" />
              </svg>
            </div>
            <div>
              <div class="chat-text" v-html="getLocaleField(data, 'chat_section', $i18n.locale)"></div>
            </div>
          </div>
          <NuxtLink to="/chat" class="blog-link">
            <button class="chat-button">
            {{ getLocaleField(data, 'button_text', $i18n.locale) }}
            <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          </NuxtLink>
        </div>
      </div>
      <div class="contact-form-wrapper">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: null
});
</script>

<style scoped>
.contact {
  background: white;
  padding: 2rem 1rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-content {
  padding-right: 2rem;
}

.contact-form-wrapper {
  width: 100%;
}

.richtext{
  padding-bottom: 2rem;
}

:deep(.richtext h2){
  font-size: 40px !important;
  line-height: 56px !important;
  font-weight: 500 !important;
}

:deep(.richtext h3){
  font-size: 34px !important;
  line-height: 44px !important;
  font-weight: 500 !important;
  letter-spacing: -2% !important;
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

:deep(.chat-text p){
  color: #10182899;
  font-size: 14px;
  font-weight: 400;
}

.chat-option {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.chat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.chat-button {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: white;
  color: #FF0000;
  border: 2px solid #FF0000;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.chat-button:hover {
  background: #fef2f2;
  transform: translateY(-1px);
}

.arrow-icon {
  width: 18px;
  height: 18px;
}

/* Tablet breakpoint */
@media (max-width: 992px) {
  .contact-grid {
    gap: 3rem;
  }
  
  .contact-content {
    padding-right: 1rem;
  }
  
  :deep(.richtext h2) {
    font-size: 32px !important;
    line-height: 44px !important;
  }
  
  :deep(.richtext h3) {
    font-size: 28px !important;
    line-height: 38px !important;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .contact {
    padding: 1.5rem 1rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-content {
    padding-right: 0;
  }
  
  :deep(.richtext h2) {
    font-size: 28px !important;
    line-height: 38px !important;
  }
  
  :deep(.richtext h3) {
    font-size: 24px !important;
    line-height: 34px !important;
  }
  
  :deep(.richtext p),
  :deep(.richtext li) {
    font-size: 15px !important;
  }
  
  .chat-info {
    gap: 0.75rem;
  }
  
  .chat-icon {
    width: 40px;
    height: 40px;
  }
  
  .chat-icon svg {
    width: 20px;
    height: 20px;
  }
}

/* Small mobile breakpoint */
@media (max-width: 480px) {
  .contact {
    padding: 1rem 0.75rem;
  }
  
  .contact-grid {
    gap: 1.5rem;
  }
  
  :deep(.richtext h2) {
    font-size: 24px !important;
    line-height: 32px !important;
  }
  
  :deep(.richtext h3) {
    font-size: 20px !important;
    line-height: 28px !important;
  }
  
  .chat-option {
    padding: 0.875rem;
  }
  
  .chat-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>