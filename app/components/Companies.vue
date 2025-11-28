<template>
  <div class="">
    <div class="grid">
      <!-- Skeleton Loader -->
      <div v-if="loading" v-for="n in pageSize" :key="`skeleton-${n}`" class="card skeleton-card">
        <div class="logo-container skeleton skeleton-logo"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>

      <!-- Actual Content -->
      <div v-else v-for="org in organizations" :key="org.id" class="card" @click="navigateToOrganization(org.slug)">
        <div class="logo-container">
          <div v-if="org.logo_image">
            <img :src="HOST + org.logo_image.original.src" :alt="org.name.en" class="logo" />
          </div>
          <div v-else>
            <img :src="org.logo" :alt="org.name.en" class="logo" />
          </div>
        </div>
        <h2 class="org-name">{{ getStremleField(org.name, $i18n.locale) }}</h2>
        <p class="description">{{ getStremleField(org.description, $i18n.locale) }}</p>
      </div>
    </div>

    <!-- Enhanced Pagination controls -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        @click="fetchCompanies(1)" 
        :disabled="currentPage === 1"
        class="pagination-btn"
        title="First page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
      </button>

      <button 
        @click="fetchCompanies(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-btn"
        title="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Dynamic page numbers -->
      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="page !== '...' && fetchCompanies(page)"
          :class="['page-number', { active: page === currentPage, dots: page === '...' }]"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>

      <button 
        @click="fetchCompanies(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
        title="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <button 
        @click="fetchCompanies(totalPages)" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
        title="Last page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const config = useRuntimeConfig()

const router = useRouter();

const HOST = computed(() => {
	return config.public.baseURL;
});


const organizations = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(0);
const pageSize = ref(6);
const loading = ref(true);

// Calculate visible page numbers dynamically
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
});

// Fetch companies from Wagtail API
const fetchCompanies = async (page = 1) => {
  loading.value = true;

  const offset = (page - 1) * pageSize.value;

  try {
    const data = await $fetch(PAGE_API_ROOT, {
      method: "GET",
      query: {
        type: "home.CompanyDetailPage",
        fields: "company_name,short_description,logo,banner,cover_image,logo_image,slug",
        limit: pageSize.value,
        offset: offset,
      },
    });

    // Convert Wagtail API response
    organizations.value = data.items.map((item) => ({
      id: item.id,
      name: item.company_name,
      description: item.short_description,
      logo: item.logo,
      logo_image: item.logo_image,
      slug: item.meta.slug,
    }));

    currentPage.value = page;
    totalItems.value = data.meta.total_count;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);

  } catch (error) {
    console.error("Error fetching companies:", error);
  } finally {
    loading.value = false;
  }
};

// Navigate to company details page
const navigateToOrganization = (slug) => {
  router.push(`/companies/${slug}`);
};

onMounted(() => {
  fetchCompanies();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 20px;
  border: 1.5px solid #1018281A;
  padding: 32px 26px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo-container {
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.org-name {
  font-size: 24px;
  color: #2d3748;
  font-weight: 500;
  margin-bottom: 12px;
}

.description {
  color: #4a5568;
  line-height: 1.6;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(1.6em * 3);
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 16px;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4a5568;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
  background-color: #f7fafc;
}

.page-numbers {
  display: flex;
  gap: 4px;
  align-items: center;
}

.page-number {
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.page-number:hover:not(.active):not(.dots) {
  background-color: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.page-number.active {
  background: #FF0000;
  border-color: #FF0000;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.page-number.dots {
  border: none;
  background: transparent;
  cursor: default;
  pointer-events: none;
}

.pagination-info {
  text-align: center;
  color: #718096;
  font-size: 14px;
  margin-bottom: 24px;
}

/* Mobile */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 28px 22px;
  }

  .org-name {
    font-size: 1.25rem;
  }

  .pagination {
    gap: 6px;
    margin: 32px 0 12px;
  }

  .pagination-btn,
  .page-number {
    min-width: 36px;
    height: 36px;
    font-size: 13px;
  }

  .page-numbers {
    gap: 3px;
  }

  .pagination-info {
    font-size: 13px;
  }
}

/* Skeleton Loader Styles */
.skeleton-card {
  pointer-events: none;
  cursor: default;
}

.skeleton-card:hover {
  transform: none;
  box-shadow: none;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

.skeleton-logo {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.skeleton-title {
  height: 28px;
  width: 70%;
  margin-bottom: 12px;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: 8px;
}

.skeleton-text.short {
  width: 85%;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>