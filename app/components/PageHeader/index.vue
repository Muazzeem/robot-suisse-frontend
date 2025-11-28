<template>
  <section class="page-hero">
    <div class="hero-background"></div>
    <div class="hero-overlay" :style="{
      background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${imageURL}) center/cover`
    }"></div>
    <div class="container">
      <div v-if="data?.tag?.en">
        <div class="update-badge">
          {{ getLocaleField(data, 'tag', $i18n.locale) }}
        </div>
      </div>
      <h1 class="hero-title">
        {{ getLocaleField(data, 'hero_title', $i18n.locale) }}
      </h1>
      <div class="hero-subtext" v-html="getLocaleField(data, 'hero_subtitle', $i18n.locale)"></div>

      <!-- Buttons -->
      <div v-if="data?.buttons">
        <div class="hero-actions">
          <div class="buttons">
            <nuxt-link v-for="(button, index) in data?.buttons" :key="index" :to="button.link || '#'"
              class="button-link">
              <button :class="index === 0 ? 'btn-outline' : 'btn-primary'">
                {{ getLocaleField(button, 'text', $i18n.locale) }}
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: null
})

const config = useRuntimeConfig()
const HOST = computed(() => {
  return config.public.baseURL;
});
const imageURL = computed(() => HOST.value + props.data?.image?.original?.src)
</script>

<style lang="css" scoped>
@import './header.css';
</style>