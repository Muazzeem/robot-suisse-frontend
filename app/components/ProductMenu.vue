<template>
    <div class="product-menu-wrapper">
        <NuxtLink to="/products" class="blog-link">
            <button :style="{ color: menuColor }" class="menu-trigger" @mouseenter="openMenu" @mouseleave="startCloseTimer"
                @click="toggleMenu">
                Products
                <span class="arrow" :class="{ open: isOpen }">
                    <svg class="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
            </button>
        </NuxtLink>

        <transition name="menu">
            <div v-if="isOpen" class="mega-menu" @mouseenter="cancelCloseTimer" @mouseleave="closeMenu">
                <div class="menu-container">
                    <!-- Categories Sidebar -->
                    <div class="categories-sidebar">
                        <button v-for="category in uniqueCategories" :key="category.id" class="category-item"
                            :class="{ active: activeCategory === category.id }"
                            @mouseenter="setActiveCategory(category.id)">
                            {{ getStremleField(category.title.title, $i18n.locale) }}
                        </button>
                    </div>

                    <!-- Products Grid -->
                    <div class="products-section">
                        <div class="products-grid">
                            <NuxtLink v-for="product in activeProducts" :key="product.id"
                                :to="`/products/${product.meta?.slug || product.slug}`" class="product-card" @click="closeMenu">
                                <div class="product-image">
                                    <img :src="HOST + product.thumbnail?.original?.src || product.image" 
                                         :alt="getLocaleField(product, 'title', $i18n.locale)" />
                                </div>
                                <h3 class="product-name">{{ getLocaleField(product, 'title', $i18n.locale) }}</h3>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from "pinia"
import { useUtilityStore } from "@/stores/utility"

import { getStremleField, getLocaleField } from '@/utils/useLocale';

const config = useRuntimeConfig();
const HOST = computed(() => {
	return config.public.HOST;
});

const props = defineProps({
    menuColor: {
        type: String,
        default: 'white'
    }
})

const utilityStore = useUtilityStore()
const { getRobots } = storeToRefs(utilityStore)

onMounted(async () => {
    if (!getRobots.value || getRobots.value.length === 0) {
        await utilityStore.fetchRobots()
    }
})
const isOpen = ref(false)
const activeCategory = ref(null)
let closeTimer = null

const uniqueCategories = computed(() => {
    if (!getRobots.value) return []
    
    const categoriesMap = new Map()
    getRobots.value.forEach(robot => {
        if (robot.fetch_parent) {
            categoriesMap.set(robot.fetch_parent.id, robot.fetch_parent)
        }
    })
    return Array.from(categoriesMap.values())
})

// Set initial active category when robots are loaded
watch(uniqueCategories, (newCategories) => {
    if (newCategories && newCategories.length > 0 && !activeCategory.value) {
        activeCategory.value = newCategories[0].id
    }
}, { immediate: true })

// Group robots by their parent category
const robotsByCategory = computed(() => {
    if (!getRobots.value) return {}
    
    const grouped = {}
    getRobots.value.forEach(robot => {
        const categoryId = robot.fetch_parent?.id || 'uncategorized'
        if (!grouped[categoryId]) {
            grouped[categoryId] = []
        }
        grouped[categoryId].push(robot)
    })
    return grouped
})

const activeProducts = computed(() => {
    if (!activeCategory.value) return []
    return robotsByCategory.value[activeCategory.value] || []
})

const openMenu = () => {
    cancelCloseTimer()
    isOpen.value = true
}

const startCloseTimer = () => {
    closeTimer = setTimeout(() => {
        isOpen.value = false
    }, 300)
}

const cancelCloseTimer = () => {
    if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
    }
}

const closeMenu = () => {
    startCloseTimer()
}

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const setActiveCategory = (categoryId) => {
    activeCategory.value = categoryId
}
</script>

<style scoped>
.product-menu-wrapper {
    position: relative;
    display: inline-block;
}

.menu-trigger {
    background: transparent;
    border: none;
    font-size: 0.95rem;
    font-weight: 400;
    cursor: pointer;
    padding-top: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.2s;
    margin-top: 0px;
}

.menu-trigger:hover {
    color: #ef4444 !important;
}

.arrow {
    font-size: 0.7rem;
    transition: transform 0.3s ease;
}

.arrow.open {
    transform: rotate(180deg);
}

.mega-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 1rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    z-index: 1000;
}

.menu-container {
    display: flex;
    min-height: 400px;
    padding: 1.5rem;
}

.categories-sidebar {
    width: 220px;
    background: #FAFAFA;
    border: 1px solid #17191C1A;
    border-radius: 15px;
}

.category-item {
    width: 100%;
    padding: 1rem 1rem;
    background: transparent;
    border: none;
    text-align: left;
    font-size: 0.95rem;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.category-item:hover {
    background: rgba(239, 68, 68, 0.05);
    color: #ef4444;
}

.category-item.active {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border-left-color: #ef4444;
    font-weight: 500;
    border-radius: 10px;
}

.products-section {
    flex: 1;
    padding: 0rem 1rem;
    min-width: 500px;
    max-width: 900px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.product-card {
    text-decoration: none;
    background: #FAFAFA;
    border: 1px solid #17191C1A;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #ef4444;
}

.product-image {
    width: 100%;
    height: 100px;
    background: #FAFAFA;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-name {
    padding: 1rem;
    margin: 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: #1f2937;
    text-align: center;
}

/* Transitions */
.menu-enter-active,
.menu-leave-active {
    transition: all 0.3s ease;
}

.menu-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
}

.menu-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .mega-menu {
        left: 0;
        transform: translateX(0);
        right: 0;
        margin: 1rem;
        width: calc(100% - 2rem);
    }

    .products-section {
        min-width: auto;
    }

    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .menu-container {
        flex-direction: column;
    }

    .categories-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        padding: 1rem 0;
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
    }

    .category-item {
        padding: 0.75rem 1rem;
        border-left: none;
        border-bottom: 3px solid transparent;
        flex-shrink: 0;
    }

    .category-item.active {
        border-left: none;
        border-bottom-color: #ef4444;
    }

    .products-section {
        padding: 1.5rem;
    }

    .products-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .product-image {
        height: 120px;
    }

    .product-name {
        padding: 0.75rem;
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .products-grid {
        grid-template-columns: 1fr;
    }
}
</style>