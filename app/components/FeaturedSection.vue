<template>
  <section class="featured">
    <div class="products-grid">
      <RobotProductCard 
        v-for="product in rawItems" 
        :key="product.id" 
        :product="product"
        @open-modal="openModal"
      />
    </div>

    <RobotDetailsModal
      :is-open="isModalOpen"
      :robot="selectedRobot"
      @close="closeModal"
    />
    
  </section>
</template>

<script setup>
const isModalOpen = ref(false)
const selectedRobot = ref(null)
const rawItems = ref([])

const config = useRuntimeConfig()

const HOST = computed(() => {
	return config.public.baseURL;
});

const API_URL = `${HOST.value}/api/v2/pages/?type=home.RobotDetailPage&fields=title,short_description,thumbnail,author,tags,fetch_parent,last_published_at,body,is_featured,slug`

const fetchRobots = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    console.log(data)
    rawItems.value = data.items || []
  } catch (err) {
    console.error('Failed to fetch robots:', err)
  }
}

const openModal = (product) => {
  selectedRobot.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  fetchRobots()
})
</script>

<style scoped>
.featured {
  padding: 2rem 0;
  background: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 1024px) {
  .products-grid {
      grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
  .featured {
    padding: 4rem 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
