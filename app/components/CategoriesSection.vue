
<template>
    <section class="categories">
        <div class="categories-grid">
            <div class="category-card" v-for="(item, index) in data.categories" :key="index">
                <div class="category-card" :style="{ backgroundImage: `url(${HOST + item?.image?.original?.src})` }">
                    <div class="category-content">
                        <div class="card-content">
                            <div v-html="getLocaleField(item, 'description', $i18n.locale)"></div>
                        </div>
                    </div>
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
    }
});
</script>

<style scoped>
.categories {
    padding: 3rem 0;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
}

.category-card {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid #e5e7eb;
    height: 340px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.category-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
    transition: all 0.3s ease;
}

.category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(105, 104, 104, 0.2);
}

.category-content {
    padding: .5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.card-content {
    padding: .5rem;
    background-color: white;
    border-radius: 10px;
}
:deep(h4) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
:deep(p) {
    margin-bottom: 0.75rem !important;
    font-size: 14px !important;
    line-height: 21px !important;
    color: #737373 !important;
    font-weight: 400 !important;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 1024px) {
    .categories-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .categories {
        padding: 4rem 0;
    }
    .categories-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .categories {
        padding: 0;
    }
}
</style>