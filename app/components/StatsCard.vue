<template>
  <section class="what-defines-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in data.items" :key="stat.description">
          <div v-html="getLocaleField(stat, 'description', $i18n.locale)"></div>
        </div>
      </div>
    </div>
  </section>
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
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding-top: 3rem;
  border-top: 1px solid #e5e7eb;
}

.stat-card {
  text-align: center;
}

:deep(h3){
  font-size: 3.5rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1;
}

:deep(p) {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 1024px) {

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  :deep(h3){
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    gap: 2rem;
  }

  :deep(h3){
    font-size: 2.5rem;
  }
  .feature-card {
    padding: 1rem;
  }
}
</style>
