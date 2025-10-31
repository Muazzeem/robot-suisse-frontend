<template>
  <section class="mission-vision-section">
    <div class="container">
      <div class="quote-card">
        <div class="quote-mark">"</div>
        <blockquote class="quote-text" v-html="getLocaleField(data, 'quote', $i18n.locale)">
        </blockquote>
        <p class="quote-author">
            {{ getLocaleField(data, 'author', $i18n.locale) }}
        </p>
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
.quote-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  border-radius: 20px;
  padding: 3rem;
  position: relative;
}

.quote-mark {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  font-size: 4rem;
  font-family: Georgia, serif;
  color: #ef4444;
  line-height: 1;
  opacity: 0.3;
}

.quote-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #1a1a1a;
  font-weight: 500;
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 1;
}

.quote-author {
  font-size: 0.95rem;
  color: #6b7280;
  font-style: italic;
  margin: 0;
}

@media (max-width: 768px) {
  .mission-vision-section {
    padding: 1rem 0 1rem;
  }

  .quote-card {
    padding: 1rem;
  }

  .quote-mark {
    font-size: 3rem;
    top: 1.5rem;
    left: 1.5rem;
  }

  .quote-text {
    font-size: 1rem;
  }
}
</style>
