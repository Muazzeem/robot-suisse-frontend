<template>
    <div class="blog-page">
        <div class="container">
            <!-- Loading State -->
            <div v-if="loading" class="loading-state">
                <p>Loading blog posts...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="error-state">
                <p>{{ error }}</p>
            </div>

            <template v-else>
                <!-- Featured Post Section -->
                <section v-if="featuredPost" class="hero-section">
                    <NuxtLink :to="`/blog/${featuredPost.fetch_parent.slug}/${featuredPost.meta.slug}`" class="featured-post">
                        <div class="featured-image">
                            <img :src="HOST + featuredPost?.thumbnail?.original?.src"
                                :alt="getLocaleField(featuredPost, 'title', $i18n.locale)" />
                        </div>
                        <div class="featured-content">
                            <time class="featured-date">{{ formatDate(featuredPost.last_published_at) }}</time>
                            <h1 class="featured-title">
                                {{ getLocaleField(featuredPost, 'title', $i18n.locale) }}
                            </h1>
                            <p class="featured-excerpt">
                                {{ truncateText(getStremleField(featuredPost.short_description, $i18n.locale), 300) }}
                            </p>
                           
                        </div>
                    </NuxtLink>
                </section>

                <section v-if="regularPosts.length" class="blog-grid">
                    <NuxtLink v-for="post in regularPosts" :key="post.id" :to="`/blog/${post.fetch_parent.slug}/${post.meta.slug}`"
                        class="blog-link">
                        <BlogCard :data="post" />
                    </NuxtLink>
                </section>

                <!-- Load More Button -->
                <div v-if="hasMore" class="load-more">
                    <button @click="loadMore" :disabled="loadingMore" class="load-more-btn">
                        {{ loadingMore ? 'Loading...' : 'Load More' }}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const allPosts = ref([])
const nextPageUrl = ref(null)

const config = useRuntimeConfig();
const HOST = computed(() => {
	return config.public.baseURL;
});

const featuredPost = computed(() => {
    return allPosts.value.find(post => post.is_featured === true) || null
})

const regularPosts = computed(() => {
    return allPosts.value.filter(post => post.is_featured !== true)
})

const hasMore = computed(() => !!nextPageUrl.value)

const fetchBlogPosts = async (url = null) => {
    try {
        const apiUrl = `${url || HOST.value + '/api/v2/pages/?type=home.BlogDetailPage&fields=title,short_description,thumbnail,author,tags,fetch_parent,last_published_at,body,is_featured,slug'}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return {
            items: data.items || data.results || [],
            next: data.meta?.next_url || data.next || null
        }
    } catch (err) {
        throw new Error(`Failed to fetch blog posts: ${err.message}`)
    }
}

const loadInitialPosts = async () => {
    try {
        loading.value = true
        error.value = null
        
        const { items, next } = await fetchBlogPosts()
        
        allPosts.value = items
        nextPageUrl.value = next
    } catch (err) {
        error.value = err.message
        console.error('Error loading blog posts:', err)
    } finally {
        loading.value = false
    }
}

// Load more posts
const loadMore = async () => {
    if (!nextPageUrl.value || loadingMore.value) return
    
    try {
        loadingMore.value = true
        
        const { items, next } = await fetchBlogPosts(nextPageUrl.value)
        
        allPosts.value = [...allPosts.value, ...items]
        nextPageUrl.value = next
    } catch (err) {
        error.value = err.message
        console.error('Error loading more posts:', err)
    } finally {
        loadingMore.value = false
    }
}

// Format date
const formatDate = (dateString) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    
    return date.toLocaleDateString('en-GB', options)
}

// Load posts on mount
onMounted(() => {
    loadInitialPosts()
})
</script>

<style scoped>
.blog-page {
    min-height: 100vh;
    background: white;
}

.loading-state,
.error-state {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    color: #666;
}

.error-state {
    color: #ef4444;
}

.hero-section {
    padding: 3rem 0 4rem;
}

.featured-post {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s ease;
}

.featured-post:hover {
    transform: translateY(-4px);
}

.featured-image {
    width: 100%;
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
    background: #f5f5f5;
}

.featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.featured-content {
    padding-right: 2rem;
}

.featured-date {
    display: block;
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1rem;
}

.featured-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.3;
    margin-bottom: 1.25rem;
}

.featured-excerpt {
    font-size: 1.125rem;
    color: #666;
    line-height: 1.7;
    margin: 0 0 1rem 0;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.tag {
    background: #fef2f2;
    color: #ef4444;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem 0 4rem;
}

.blog-link {
    text-decoration: none;
    transition: transform 0.3s ease;
}

.blog-link:hover {
    transform: translateY(-4px);
}

.load-more {
    display: flex;
    justify-content: center;
    padding: 2rem 0 4rem;
}

.load-more-btn {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
}

.load-more-btn:hover:not(:disabled) {
    background: #ef4444;
    color: white;
    transform: translateY(-2px);
}

.load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.load-more-btn svg {
    transition: transform 0.2s;
}

.load-more-btn:hover:not(:disabled) svg {
    transform: translateX(4px);
}

@media (max-width: 1024px) {
    .blog-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .featured-post {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .featured-content {
        padding-right: 0;
    }

    .featured-title {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .hero-section {
        padding: 2rem 0 3rem;
    }

    .featured-image {
        height: 280px;
    }

    .featured-title {
        font-size: 1.75rem;
    }

    .featured-excerpt {
        font-size: 1rem;
    }
}
</style>