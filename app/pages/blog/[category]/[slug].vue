<template>
  <Header />
  <div class="blog-detail-page">
    <div class="container">
      <article class="blog-article">
        <NuxtLink to="/blogs" class="back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
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
              <span v-for="(tag, index) in parsedTags" :key="index" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="share-section">
            <div class="share-buttons">
             <SocialShare
                v-for="network in ['facebook', 'x', 'linkedin']"
                :key="network"
                :network="network"
                :styled="true"
              />
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
                  <Richtext v-if="item?.type == 'richtext'" :data="item?.value" />
                </div>
                <div>
                  <BlogBanner v-if="item?.type == 'banner_image'" :data="item?.value" />
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

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl)
    alert('🔗 Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link', err)
  }
}

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
  gap: .5rem;
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

:deep(.social-share-button){
  gap: 4px;
  padding: 2px 5px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
  text-transform: capitalize;
}
</style>
