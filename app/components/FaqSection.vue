<template>
  <section class="faq-section">
    <div class="container"> 
      <div class="faq-list">
        <div v-for="(item, index) in data.items" :key="index" class="faq-item" :class="{ active: activeIndex === index }">
          <button class="faq-question" @click="toggleFaq(index)" :aria-expanded="activeIndex === index">
            <span>{{ getLocaleField(item, 'question', $i18n.locale) }}</span>
            <span class="icon">{{ activeIndex === index ? '×' : '+' }}</span>
          </button>
          <div class="faq-answer" v-show="activeIndex === index">
            <div v-html="getLocaleField(item, 'answer', $i18n.locale)"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const activeIndex = ref(0);
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

</script>

<style scoped>
.faq-section {
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.faq-item.active {
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); */
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.faq-question:hover {
  background-color: #f9f9f9;
}

.faq-question .icon {
  font-size: 32px;
  font-weight: 300;
  color: #666;
  transition: transform 0.3s ease;
  line-height: 1;
  margin-left: 16px;
  flex-shrink: 0;
}

.faq-item.active .faq-question .icon {
  transform: rotate(0deg);
}

.faq-answer {
  padding: 0 20px 20px 20px;
  animation: slideDown 0.3s ease;
}

:deep(.faq-answer p) {
  font-size: 16px;
  color: #666;
  font-weight: 300 !important;
  line-height: 1.6;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .faq-section {
    padding: 60px 20px;
  
  .faq-question {
    padding: 20px 24px;
    font-size: 16px;
  }

  .faq-answer {
    padding: 0 24px 20px 24px;
  }

  .faq-answer p {
    font-size: 15px;
  }
}
}
</style>
