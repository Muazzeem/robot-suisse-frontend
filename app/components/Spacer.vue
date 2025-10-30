<template>
  <div class="spacer" :style="{ padding: props.data.height + 'rem 0' }"></div>
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

@media (max-width: 1024px) {
  .spacer {
    padding: 1rem 0 !important;
  }
}
</style>