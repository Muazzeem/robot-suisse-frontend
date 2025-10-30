<template>
  <section class="what-defines-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">120+</div>
          <p class="stat-label">Robonnement Robots are already working for clients</p>
        </div>

        <div class="stat-card">
          <div class="stat-number">€10M+</div>
          <p class="stat-label">In sales</p>
        </div>

        <div class="stat-card">
          <div class="stat-number">€120k+</div>
          <p class="stat-label">worth of the first robot was sold to initial owners in just 7 hours.</p>
        </div>

        <div class="stat-card">
          <div class="stat-number">20+</div>
          <p class="stat-label">Team Members</p>
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

.stat-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.stat-label {
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

  .stat-number {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
  .feature-card {
    padding: 1rem;
  }
}
</style>
