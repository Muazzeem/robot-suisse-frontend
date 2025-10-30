<template>
  <section class="why-choose">
    <div class="features-grid">
      <div
        class="feature-card"
        v-for="(item, index) in data.cards"
        :key="index"
      >
        <div class="icon-wrapper bg-red">
          <i :class="item.icon"  class="icon-size" style="color: white;"></i>
        </div>
        <div class="richtext" v-html="getLocaleField(item, 'description', $i18n.locale)"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getLocaleField } from '../utils/useLocale';

const props = defineProps({
  data: null
});

</script>

<style scoped>
.why-choose {
  background: white;
  padding-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
  border-radius: 12px;
}

.icon {
  width: 28px;
  height: 28px;
  color: white;
}

:deep(.richtext h3){
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 500 !important;
  letter-spacing: -2% !important;
}

:deep(.richtext p) {
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
}
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .why-choose {
    padding: 0px;
  }
  .feature-card {
    padding: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
