<template>
  <div class="category-section">
    <div class="category-list">
      <!-- All Robots button -->
      <button
        :class="['category-btn', { active: selectedCategory === 'all' }]"
        @click="selectCategory('all')"
      >
        {{ 'All Robots' }}
      </button>

      <!-- Dynamic category buttons -->
      <button
        v-for="category in getRobots"
        :key="category.id"
        :class="[
          'category-btn',
          { active: category.fetch_parent?.id === selectedCategory }
        ]"
        @click="selectCategory(category.fetch_parent?.id)"
      >
        {{ getLocaleField(category, 'title', $i18n.locale) }}
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

watch(
  () => props.modelValue,
  (newVal) => {
    selectedCategory.value = newVal
  }
)

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
