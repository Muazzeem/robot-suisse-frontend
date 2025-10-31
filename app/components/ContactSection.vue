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
          <button class="chat-button" @click="startChat">
            {{ getLocaleField(data, 'button_text', $i18n.locale) }}
            <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="contact-form-wrapper">
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" v-model="formData.fullName" placeholder="Enter your full name" class="form-input"
              required />
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" v-model="formData.email" placeholder="Enter your email" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Company Name</label>
            <input type="text" v-model="formData.companyName" placeholder="Enter your company name" class="form-input"
              required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Industry</label>
              <div class="select-wrapper">
                <select v-model="formData.industry" class="form-select" required>
                  <option value="" disabled>Choose service</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="logistics">Logistics</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
                <svg class="select-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Inquiry Type</label>
              <div class="select-wrapper">
                <select v-model="formData.inquiryType" class="form-select" required>
                  <option value="" disabled>Choose service</option>
                  <option value="rental">Robot Rental</option>
                  <option value="purchase">Robot Purchase</option>
                  <option value="consultation">Consultation</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="demo">Request Demo</option>
                </select>
                <svg class="select-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Project Description</label>
            <textarea v-model="formData.projectDescription" placeholder="Tell us about your project"
              class="form-textarea" rows="4" required></textarea>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Get My Robot Recommendations' }}
            <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: null
});

const formData = ref({
  fullName: '',
  email: '',
  companyName: '',
  industry: '',
  inquiryType: '',
  projectDescription: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  formData.value = {
    fullName: '',
    email: '',
    companyName: '',
    industry: '',
    inquiryType: '',
    projectDescription: ''
  }

  isSubmitting.value = false
  alert('Thank you! We will contact you soon.')
}

const startChat = () => {
  console.log('Starting AI chat...')
  alert('AI Chat feature coming soon!')
}
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

.contact-content {
  padding-right: 2rem;
}
.richtext{
  padding-bottom: 2rem;
}

:deep(.richtext h2){
  font-size: 48px !important;
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

.contact-form-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.875rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1a1a1a;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  appearance: none;
  background: white;
  cursor: pointer;
  padding-right: 2.5rem;
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
  pointer-events: none;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  padding: 1rem 2rem;
  background: #FF0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-content {
    padding-right: 0;
  }
  
    @media (max-width: 768px) {
      .contact {
        padding: 4rem 0;
      }
  
      .contact-form-wrapper {
        padding: 1.5rem;
      }
  
      .form-row {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  
    }
</style>
