<template>
  <div class="contact-form-wrapper" :style="{ padding: `${props.padding}rem` }">
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ $t('contact.first_name') }}</label>
          <input
            type="text"
            v-model="formData.first_name"
            :placeholder="$t('contact.first_name_placeholder')"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ $t('contact.last_name') }}</label>
          <input
            type="text"
            v-model="formData.last_name"
            :placeholder="$t('contact.last_name_placeholder')"
            class="form-input"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contact.email') }}</label>
        <input
          type="email"
          v-model="formData.email"
          :placeholder="$t('contact.email_placeholder')"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contact.phone') }}</label>
        <input
          type="text"
          v-model="formData.phone"
          :placeholder="$t('contact.phone_placeholder')"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contact.company_name') }}</label>
        <input
          type="text"
          v-model="formData.company_name"
          :placeholder="$t('contact.company_name_placeholder')"
          class="form-input"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ $t('contact.industry') }}</label>
          <div class="select-wrapper">
            <select v-model="formData.industry" class="form-select" required>
              <option value="" disabled>{{ $t('contact.industry_placeholder') }}</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="healthcare">Healthcare</option>
              <option value="logistics">Logistics</option>
              <option value="agriculture">Agriculture</option>
              <option value="hospitality">Hospitality</option>
              <option value="retail">Retail</option>
              <option value="other">Other</option>
            </select>
            <svg class="select-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">{{ $t('contact.inquiry_type') }}</label>
          <div class="select-wrapper">
            <select v-model="formData.inquiry_type" class="form-select" required>
              <option value="" disabled>{{ $t('contact.choose_service') }}</option>
              <option value="rental">Robot Rental</option>
              <option value="purchase">Robot Purchase</option>
              <option value="consultation">Consultation</option>
              <option value="maintenance">Maintenance</option>
              <option value="demo">Request Demo</option>
            </select>
            <svg class="select-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contact.project_description') }}</label>
        <textarea
          v-model="formData.project_description"
          :placeholder="$t('contact.project_description_placeholder')"
          class="form-textarea"
          rows="2"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? $t('contact.submitting') : $t('contact.button_text') }}
        <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="modal-title">{{ $t('contact.success_title') || 'Thank You!' }}</h3>
        <p class="modal-message">
          {{ $t('contact.success_message') || 'Your inquiry has been submitted successfully. We will contact you soon.' }}
        </p>
        <button class="modal-button" @click="closeModal">
          {{ $t('contact.close') || 'Close' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  padding: {
    type: String,
    default: "2",
  },
});

const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company_name: "",
  industry: "",
  inquiry_type: "",
  project_description: "",
});

const isSubmitting = ref(false);
const showSuccessModal = ref(false);

const closeModal = () => {
  showSuccessModal.value = false;
};

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    const response = await fetch("https://api.robot.marketize.biz/api/v1/utility/contact-us/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Show success modal
    showSuccessModal.value = true;

    // Reset form after success
    formData.value = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      industry: "",
      inquiry_type: "",
      project_description: "",
    };
  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-form-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: .4rem;
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
  min-height: 100px;
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

.arrow-icon {
  width: 18px;
  height: 18px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease;
}

.modal-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
}

.modal-icon svg {
  width: 36px;
  height: 36px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.modal-message {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-button {
  width: 100%;
  padding: 0.875rem 2rem;
  background: #FF0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-button:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-content {
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 0;
  }

  .contact-form-wrapper {
    padding: 1.5rem !important;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  :deep(.richtext h2){
    font-size: 29px !important;
  }
}

@media (max-width: 480px) {
  .submit-button{
    font-size: .8rem;
  }
  
  .modal-content {
    padding: 2rem 1.5rem;
  }
  
  .modal-title {
    font-size: 1.25rem;
  }
  
  .modal-message {
    font-size: 0.9rem;
  }
}
</style>