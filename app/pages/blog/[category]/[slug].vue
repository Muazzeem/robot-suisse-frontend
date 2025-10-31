<template>
  <Header />
  <div class="blog-detail-page">
      <div class="container">
        <article class="blog-article">
          <NuxtLink to="/blogs" class="back-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to blog
          </NuxtLink>

          <header class="article-header">
            <div class="header-content">
              <time class="article-date">
                {{ dayjs(data.currentPage?.last_published_at).format('DD MMM, YYYY') }}
              </time>
              <h1 class="article-title">
                {{ data?.currentPage?.title }}
              </h1>
              <div class="article-tags">
                <span
                  v-for="(tag, index) in parsedTags"
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="share-section">
              <span class="share-label">Share:</span>
              <div class="share-buttons">
                <button class="share-btn" aria-label="Share on Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button class="share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="share-btn" aria-label="Share on Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </button>
                <button class="share-btn" aria-label="Copy link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </header>
          <div v-if="pending">
          </div>
          <div v-else-if="error">Failed to load: {{ error?.message || error }}</div>
          <div v-else>
            <div class="article-content">
              <div v-if="data?.currentPage?.body">
                <div v-for="(item, idx) in data?.currentPage?.body" :key="'p_idx_' + idx">
                  <div>
                    <Richtext v-if="item?.type=='richtext'" :data="item?.value" />
                  </div>
                  <div>
                    <BlogBanner v-if="item?.type=='banner_image'" :data="item?.value" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
</template>

<script setup>
import dayjs from 'dayjs'

const nuxtApp = useNuxtApp();
const commonStore = useCommonPageStore();
const route = useRoute();

const { data, error } = await useAsyncData("pageData5", async () => {
	let currentPage = null;

	await nuxtApp.runWithContext(async () => {
		await commonStore
			.fetchPage({ html_path: route.path })
			.then((d) => {
				currentPage = d;
			})
			.catch((e) => {
				console.log(e);
			});
	});

	return {
		currentPage,
	};
});

const parsedTags = computed(() => {
  return []
})

</script>

<style scoped>
.blog-detail-page {
  min-height: 100vh;
  background: #FFFFFF0A;
  padding-top: 4rem;
}

.blog-article {
  max-width: 80%;
  padding: 3rem 0 5rem;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 3rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #1a1a1a;
}

.back-link svg {
  transition: transform 0.2s;
}

.back-link:hover svg {
  transform: translateX(-4px);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;
}

.header-content {
  flex: 1;
  max-width: 900px;
}

.article-date {
  display: block;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.25rem;
}

.article-title {
  font-size: 3rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.article-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.2rem 1rem;
    /* background: #f5f5f5; */
    border-radius: 20px;
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 500;
  border: 1px solid #e5e5e5;
}

.share-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-label {
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #e5e5e5;
  color: #1a1a1a;
}

.article-content {
  margin: 0 auto;
}

.article-image {
  margin: 0 0 2.5rem 0;
  border-radius: 16px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
}

.content-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #333;
}

.content-text p {
  margin-bottom: 1.75rem;
}

.content-text h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 3rem 0 1.5rem;
  line-height: 1.3;
}

.content-text ul {
  margin: 2rem 0;
  padding-left: 1.5rem;
}

.content-text li {
  margin-bottom: 0.875rem;
  color: #333;
}

.content-text a {
  color: #ef4444;
  text-decoration: underline;
}

.content-text a:hover {
  color: #dc2626;
}

@media (max-width: 1024px) {
  .article-header {
    flex-direction: column;
    gap: 2rem;
  }

  .article-title {
    font-size: 2.25rem;
  }

  .share-section {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .blog-article {
    padding: 2rem 0 3rem;
  }

  .back-link {
    margin-bottom: 2rem;
  }

  .article-title {
    font-size: 1.875rem;
  }

  .content-text {
    font-size: 1rem;
  }

  .content-text h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  .share-buttons {
    flex-wrap: wrap;
  }

  .share-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
