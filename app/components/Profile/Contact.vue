<template>
  <section class="contact">
    <div class="contact-grid">
      <div class="contact-content">
        <div class="richtext" v-html="getLocaleField(data, 'description', $i18n.locale)"></div>
        <ProfileCards :data="data" :padding="1" />
      </div>
      <div class="hero-right">
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
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
  .contact-content {
    padding-right: 0rem !important;
  }
}
.contact-content {
  padding-right: 2rem;
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

.chat-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.chat-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
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
</style>
