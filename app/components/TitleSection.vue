<template>
  <section class="why-choose" :style="{ background: props.data.bg_color_code }">
    <div class="container">
      <div class="section-header">
        <div class="category-tag">{{ getLocaleField(props.data, 'tag', $i18n.locale) }}</div>
        <div class="richtext" v-html="getLocaleField(props.data, 'title', $i18n.locale)"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getLocaleField } from '../utils/useLocale';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.why-choose {
  padding: 7rem 0 2rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
}

:deep(.richtext h2){
  font-size: 48px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

:deep(.richtext p){
  max-width: 500px;
  font-size: 16px;
  color: #10182899;
  line-height: 1.7;
  margin: 0 auto;
  text-align: center;
  font-weight: 300;
}

@media (max-width: 768px) {
  .why-choose {
    padding: 4rem 0;
  }
  .section-title {
    font-size: 2rem;
  }

  .section-description br {
    display: none;
  }
  .section-description {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  :deep(.richtext h2){
    font-size: 34px;
    font-weight: 500;
    color: #1a1a1a;
    letter-spacing: -0.02em;
    line-height: 44px;
    margin-top: .6rem;
    margin-bottom: .5rem;
  }
  .why-choose{
    padding: 3rem 0;
  }
}
</style>
