<template>
  <div class="category-section">
    <div class="category-list">
      <!-- "All Robots" Button -->
      <button
        :class="['category-btn', { active: selectedCategory === 'all' }]"
        @click="selectCategory('all')"
      >
        {{ $t('all_robots') || 'All Robots' }}
      </button>

      <!-- Dynamic Unique Category Buttons -->
      <button
        v-for="category in uniqueCategories"
        :key="category.id"
        :class="[
          'category-btn',
          { active: selectedCategory === category.id }
        ]"
        @click="selectCategory(category.id)"
      >
        {{ category.title.title[$i18n.locale] || category.title.title.en }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: 'all'
  }
})

const emit = defineEmits(['update:modelValue'])
const utilityStore = useUtilityStore()
const { getRobots } = storeToRefs(utilityStore)

const selectedCategory = ref(props.modelValue)

onMounted(async () => {
  if (!getRobots.value || getRobots.value.length === 0) {
    await utilityStore.fetchRobots()
  }
})

// Keep prop in sync
watch(
  () => props.modelValue,
  (newVal) => {
    selectedCategory.value = newVal
  }
)

// Extract unique fetch_parent categories
const uniqueCategories = computed(() => {
  const seen = new Map()
  for (const robot of getRobots.value || []) {
    const parent = robot.fetch_parent
    if (parent && !seen.has(parent.id)) {
      seen.set(parent.id, parent)
    }
  }
  return Array.from(seen.values())
})

// Handle click
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  emit('update:modelValue', categoryId)
}
</script>

<style scoped>
.category-section {
  padding-bottom: 2rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.category-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  background: white;
  border: 1px solid #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  cursor: pointer;
  transition: all 0.25s ease;
}

.category-btn:hover {
  background: #f9fafb;
}

.category-btn.active {
  background: #ffecec;
  color: #ff3b30;
  border-color: #ffb3ae;
}
</style>
