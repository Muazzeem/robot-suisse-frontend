<template>
    <article class="blog-card">
        <div class="blog-image">
            <img :src="HOST + data?.thumbnail?.original?.src" :alt="data?.title" />
        </div>
        <div class="blog-content">
            <time class="blog-date">{{ dayjs(data.last_published_at).format('DD MMM, YYYY') }}</time>
            <h3 class="blog-title">{{ truncateText(data?.title, 150) }}</h3>

            <p class="blog-excerpt">{{ truncateText(getStremleField(data?.short_description, $i18n.locale), 150) }}</p>
        </div>
    </article>
</template>

<script setup>
import dayjs from 'dayjs'
const config = useRuntimeConfig();
const HOST = computed(() => {
	return config.public.baseURL;
});

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
})
</script>

<style scoped>
.blog-card {
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.blog-card:hover {
    transform: translateY(-4px);
}

.blog-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #f5f5f5;
    border-radius: 24px;
}

.blog-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
    transform: scale(1.05);
}

.blog-content {
    padding: 1.5rem 0rem;
}

.blog-date {
    display: block;
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.75rem;
}

.blog-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.4;
    margin-bottom: 0.75rem;
}

.blog-excerpt {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .blog-image {
        height: 200px;
    }
    .blog-content {
        padding: 1.25rem;
    }
    .blog-title {
        font-size: 1.125rem;
    }
}
</style>