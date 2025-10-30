<template>
  <div class="robotics-section">
    <div class="container">
      <div class="content-grid">
        <!-- Left Section -->
        <!-- <div class="left-section">
          <div class="category-tag" style="max-width: fit-content;">
            {{ localizedData.tag }}
          </div>
          
          <div class="richtext" v-html="localizedData.description"></div>
          <div class="chat-card">
            <div class="chat-header">
              <div class="icon-wrapper">
                <i :class="localizedData.icon" class="icon-size"></i>
              </div>
              <div>
                <h4 class="chat-title">{{ localizedData.title }}</h4>
                <p class="chat-subtitle">{{ localizedData.subtitle }}</p>
              </div>
            </div>
            
            <button class="chat-button">
              {{ localizedData.button_text }} 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div> -->
        
        <!-- Right Section -->
        <!-- <div class="right-section">
          <div 
            v-for="(step, index) in localizedData.items" 
            :key="index" 
            class="step-card"
          >
            <span class="step-number">0{{ index + 1 }}</span>
            <div class="richtext" v-html="step.description"></div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
.robotics-section {
  background-color: #f9fafb;
  padding: 4rem 1rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
.icon-size{
  font-size: 1.5rem;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* Left Section */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Chat Card */
.chat-card {
  background: white;
  border-radius: 0.8rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}

.chat-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-wrapper {
  background-color: #FF0000;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.chat-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.chat-button {
  width: 100%;
  background: white;
  color: #FF0000;
  border: 2px solid #FF0000;
  padding: 0.875rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.chat-button:hover {
  background-color: #fef2f2;
}

/* Right Section */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.step-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-number {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

.step-title {
    font-weight: 500;
    font-size: 34px;
    line-height: 44px;
    letter-spacing: -2%;
    vertical-align: middle;
}

.step-description {
    font-weight: 400;
    font-style: Regular;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: #10182899;
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
</style>
