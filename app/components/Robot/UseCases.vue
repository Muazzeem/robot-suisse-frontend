<template>
  <section class="featured" v-if="data.items?.length">
    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="(item, index) in data.items"
        :key="index"
        @click="activeTab = index"
        :class="['tab-button', { active: activeTab === index }]"
      >
        {{ getLocaleField(item, 'title', $i18n.locale) }}
      </button>
    </div>

    <!-- Content -->
    <div class="content-grid" v-if="activeItem">
      <!-- Left Column -->
      <div class="left-column">
        <div v-if="activeItem.icon" class="icon-wrapper">
          <component :is="currentIcon" class="icon" />
        </div>

        <div class="text-content">
          <!-- Render HTML safely -->
          <div
            class="richtext"
            v-html="getLocaleField(activeItem, 'content', $i18n.locale)"
          ></div>
        </div>

        <NuxtLink
          v-if="activeItem.button_link"
          :to="activeItem.button_link"
          class="contact-button blog-link"
        >
          {{ getLocaleField(activeItem, 'button_text', $i18n.locale) }}
        </NuxtLink>
      </div>

      <!-- Right Column -->
      <div class="right-column" v-if="activeItem.image?.original?.src">
        <div class="image-container">
          <img
            :src="HOST + activeItem.image.original.src"
            :alt="activeItem.image.original.alt || getLocaleField(activeItem.title, 'title', currentLang)"
            class="content-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
const HOST = computed(() => {
	return config.public.baseURL;
});
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

// State
const activeTab = ref(0)

// Computed: current active item
const activeItem = computed(() => props.data.items[activeTab.value])

// Example dynamic icon mapping
const iconMap = {
  factory: {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>`
  }
}

// Pick icon dynamically from item.icon if available
const currentIcon = computed(() => {
  const iconKey = activeItem.value?.icon
  return iconMap[iconKey] || null
})
</script>


<style scoped>
.header {
  text-align: center;
  margin-bottom: 3rem;
}
/* Tabs Styles */
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 4rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  color: #6b7280;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.tab-button:hover {
  background-color: #f9fafb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.tab-button.active {
  background-color: #FF0000;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 760px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .left-column {
    gap: 1rem;
  }
}

@media (max-width: 760px) {
  .content-grid {
    gap: 1rem;
  }
}
/* Left Column */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: #FF0000;
  border-radius: 1rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

:deep(.richtext h3){
  font-size: 34px !important;
  line-height: 44px !important;
  font-weight: 500 !important;
  letter-spacing: -2% !important;
}

:deep(.richtext p) {
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
}
:deep(.richtext ul) {
  list-style: none;
  padding-left: 0;
}

:deep(.richtext li) {
  position: relative;
  margin-top: 0.7rem !important;
  margin-bottom: 0.75rem !important;
  font-size: 16px !important;
  color: #10182899 !important;
  font-weight: 300;
  margin-left: 1rem;
  padding-left: 1.5rem;
}

:deep(.richtext li::before) {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: #10182899;
  font-weight: bold;
  font-size: 20px;
}
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-dot {
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ef4444;
  border-radius: 50%;
  margin-top: 0.5rem;
}

.feature-text {
  color: #374151;
  line-height: 1.6;
}

/* Contact Button */
.contact-button {
  padding: 0.75rem 2rem;
  border: 1px solid #FF0000;
  background-color: transparent;
  color: #FF0000;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.contact-button:hover {
  background-color: #FF0000;
  color: white;
}

/* Right Column - Image */
.right-column {
  position: relative;
}

.image-container {
  aspect-ratio: 4 / 3;
  border-radius: 1.5rem;
  overflow: hidden;
}

.content-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .content-title {
    font-size: 1.875rem;
  }
}
@media (max-width: 480px) {
  .featured{
    padding: 0 .5rem;
  }
}
</style>