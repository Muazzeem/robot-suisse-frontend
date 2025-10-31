<template>
  <section class="why-choose">
    <div class="container">
        <div class="custom-block" v-html="getLocaleField(data, 'content', $i18n.locale)"></div>
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
.why-choose {
  background: white;
  padding-bottom: 3rem;
}

.container {
  padding-top: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.custom-block ul li{
    margin-left: 3rem;
    line-height: 3rem;
}

:deep(ul) {
  list-style-type: disc !important;
  margin-left: 2.5rem !important;
}

:deep(li) {
  margin-bottom: 0.5rem !important;
}

:deep(strong) {
  margin-top: 10px !important;
  font-size: 16px;
}
:deep(p) {
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #737373 !important;
}

</style>
