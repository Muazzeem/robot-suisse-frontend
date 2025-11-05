<template>
  <section class="mission-vision-section">
    <div class="container">
      <div class="cards-grid">
        <div 
          v-for="(item, index) in data?.cards" 
          :key="index" 
          class="card" :style="{ padding: `${padding}rem` }"
        >
          <div class="icon-wrapper">
            <i :class="item?.icon" class="icon-size"></i>
          </div>
          <div class="card-description richtext" v-html="getLocaleField(item, 'description', $i18n.locale)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  data: null,
  padding: {
    type: Number,
    default: 2
  }
});
</script>

<style scoped>
.mission-vision-section {
  padding: 0rem 0 0rem;
  background: white;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #ef4444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-description h2, h3, h4, h5, h6 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: rgb(26, 26, 26) !important;
  margin-bottom: 2rem !important;
}

p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #050505;
  white-space: pre-line;
}

@media (max-width: 425px) {
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

:deep(.richtext h3){
  font-size: 20px !important;
  line-height: 30px !important;
  font-weight: 500 !important;
  vertical-align: middle !important;
}
:deep(.richtext p) {
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  background: #FF00000F;
}
.icon-size{
  color: #FF0000;
  font-size: 1.5rem;
}
</style>
