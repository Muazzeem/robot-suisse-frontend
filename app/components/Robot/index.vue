<template>
  <div>
    <!-- Category Title -->
    <div
      class="category-title"
      v-html="getLocaleField(data, 'title', $i18n.locale)"
    ></div>

    <!-- Category Filter -->
    <RobotCategoryFilter v-model="selectedCategory" />

    <!-- Products Grid -->
    <section class="featured">
      <div class="products-grid">
        <RobotProductCard
          v-for="product in rawItems"
          :key="product.id"
          :product="product"
          @open-modal="openModal"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalCount > pageSize" class="pagination">
        <button
          class="nav-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ‹
        </button>

        <button
          v-for="page in displayPages"
          :key="page"
          :class="['page-number', { active: currentPage === page, ellipsis: page === '...' }]"
          :disabled="page === '...'"
          @click="page !== '...' && changePage(page)"
        >
          {{ page }}
        </button>

        <button
          class="nav-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          ›
        </button>
      </div>
    </section>

    <!-- Modal -->
    <RobotDetailsModal
      v-if="selectedRobot"
      :is-open="isModalOpen"
      :robot="selectedRobot"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  data: null
})

const selectedCategory = ref('all')
const rawItems = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = 8
const isModalOpen = ref(false)
const selectedRobot = ref(null)

const config = useRuntimeConfig()
const HOST = computed(() => config.public.baseURL)

// --- Base API ---
const BASE_URL = computed(
  () =>
    `${HOST.value}/api/v2/pages/?type=home.RobotDetailPage&fields=robot_title,short_description,thumbnail,author,tags,fetch_parent,last_published_at,body,is_featured,slug`
)

// --- API with Pagination & Category ---
const API_URL = computed(() => {
  const offset = (currentPage.value - 1) * pageSize
  let url = `${BASE_URL.value}&limit=${pageSize}&offset=${offset}`

  if (selectedCategory.value !== 'all') {
    url += `&child_of=${selectedCategory.value}`
  }
  return url
})

// --- Fetch Robots ---
const fetchRobots = async () => {
  try {
    const res = await $fetch(API_URL.value)
    rawItems.value = res?.items || []
    totalCount.value = res?.meta?.total_count || 0
  } catch (error) {
    console.error('Error fetching robots:', error)
  }
}

// --- Computed Total Pages ---
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

// --- Display Pages Logic ---
const displayPages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(total)
  }

  return pages
})

// --- Change Page ---
const changePage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    await fetchRobots()
  }
}

// --- Watchers ---
watch([selectedCategory, currentPage], async ([category]) => {
  // reset to first page when category changes
  if (category !== 'all') currentPage.value = 1
  await fetchRobots()
})

// --- On Mount ---
onMounted(async () => {
  await fetchRobots()
})

// --- Modal Handlers ---
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
  gap: 1.5rem;
}
.featured {
  margin-top: 1.5rem;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.nav-btn,
.page-number {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  color: #374151;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled),
.page-number:hover:not(:disabled):not(.active):not(.ellipsis) {
  border-color: #d1d5db;
  background: #f9fafb;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-number.active {
  background: #FF0000;
  border-color: #FF0000;
  color: white;
}

.page-number.ellipsis {
  border: none;
  cursor: default;
  background: transparent;
}
</style>