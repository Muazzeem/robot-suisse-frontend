<template>
  <div>
    <div
      class="category-title"
      v-html="getLocaleField(data, 'title', $i18n.locale)"
    ></div>

    <RobotCategoryFilter v-model="selectedCategory" />

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
    <div v-if="selectedRobot">
      <RobotDetailsModal
        :is-open="isModalOpen"
        :robot="selectedRobot"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: null
})

const selectedCategory = ref('all')
const rawItems = ref([])

const isModalOpen = ref(false)
const selectedRobot = ref(null)
const config = useRuntimeConfig()

const HOST = computed(() => {
	return config.public.baseURL;
});
const BASE_URL =
  `${HOST.value}/api/v2/pages/?type=home.RobotDetailPage&fields=title,short_description,thumbnail,author,tags,fetch_parent,last_published_at,body,is_featured,slug`

// Build API URL based on selected category
const API_URL = computed(() => {
  if (selectedCategory.value === 'all') {
    return BASE_URL
  }
  return `${BASE_URL}&child_of=${selectedCategory.value}`
})

const { result, pending, error, refresh } = await useFetch(API_URL, {
  key: 'robots-products',
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
