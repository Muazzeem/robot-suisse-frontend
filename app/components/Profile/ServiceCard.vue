<template>
  <section class="mission-vision-section">
    <div class="container">
      <div class="cards-grid">
        <div v-for="(item, index) in data?.cards" :key="index" class="card">
          <div
            class="icon-wrapper"
            style="display: flex; justify-content: center; align-items: center;"
          >
            <i :class="item?.icon" class="icon-size"></i>
          </div>

          <div
            class="card-description richtext"
            v-html="getLocaleField(item, 'description', $i18n.locale)"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: null,
});
</script>

<style scoped>
.mission-vision-section {
  padding: 2rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center; /* centers all child elements horizontally */
  justify-content: center; /* centers vertically if fixed height */
  text-align: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}
@media (max-width: 1024px) {
    .cards-grid {
        gap: 1rem;
    }
    .card{
        padding: 1rem;
    }
}
.card:hover {
  border-color: #ef4444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.icon-wrapper {
  margin-bottom: 1rem;
}

.icon-size {
  font-size: 2rem;
  color: white;
}

.card-description h2,
.card-description h3,
.card-description h4,
.card-description h5,
.card-description h6 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: rgb(26, 26, 26) !important;
  margin-bottom: 1rem !important;
  text-align: center;
}

p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #050505;
  text-align: center;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .mission-vision-section {
    padding: 1rem 0 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .card {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.25rem;
  }
}

:deep(.richtext h4) {
  font-size: 20px !important;
  line-height: 30px !important;
  font-weight: 500 !important;
  text-align: center !important;
}

:deep(.richtext p) {
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
  text-align: center !important;
}
</style>
