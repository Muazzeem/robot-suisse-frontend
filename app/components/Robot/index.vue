<template>
  <div>
    <div
      class="category-title"
      v-html="getLocaleField(data, 'title', $i18n.locale)"
    ></div>

    <CategoryFilter v-model="selectedCategory" />

    <section class="featured">
      <div class="products-grid">
        <RobotProductCard
          v-for="product in rawItems"
          :key="product.id"
          :product="product"
          @open-modal="openModal"
        />
      </div>
    </section>
    <RobotDetailsModal
      :is-open="isModalOpen"
      :robot="selectedRobot"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { getLocaleField } from '@/utils/useLocale'
import CategoryFilter from './CategoryFilter.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectedCategory = ref('all')
const rawItems = ref([])

const isModalOpen = ref(false)
const selectedRobot = ref(null)
const URL = import.meta.env.VITE_APP_BASE_URL
const BASE_URL =
  `${URL}/api/v2/pages/?type=home.RobotDetailsPage&fields=title_en,title_dech,title_frch,title_itch,short_description_en,short_description_dech,short_description_frch,short_description_itch,thumbnail,author,tags_en,tags_dech,tags_frch,tags_itch,fetch_parent,last_published_at,body,is_featured,slug`

// Build API URL based on selected category
const API_URL = computed(() => {
  if (selectedCategory.value === 'all') {
    return BASE_URL
  }
  return `${BASE_URL}&child_of=${selectedCategory.value}`
})

const { result, pending, error, refresh } = await useFetch(API_URL, {
  key: 'robots',
  transform: (res) => {
    rawItems.value = res.items || []
    return rawItems.value
  }
})

watch(selectedCategory, async () => {
  await refresh()
})
const openModal = (product) => {
  selectedRobot.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.category-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.featured {
  margin-top: 1.5rem;
}
</style>
