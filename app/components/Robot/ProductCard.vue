<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="HOST + product?.thumbnail?.original?.src" :alt="product.title_en" class="image" />
      <span class="product-badge">{{ getStremleField(product.fetch_parent.title.title, $i18n.locale) }}</span>
    </div>

    <div class="product-content">
      <h3 class="product-name">{{ getLocaleField(product, 'title', $i18n.locale) }}</h3>
      <div class="product-specs">
       <div class="spec-item">
          <span class="spec-label">
            {{ getStremleField(product.short_description, $i18n.locale) }}
          </span>
        </div>
      </div>
    </div>

    <div class="product-actions">
      <button class="btn-details" @click="$emit('open-modal', product)">
        Details
      </button>
      <nuxt-link to="/contact-us">
        <button class="btn-quote bg-red">Quote</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const HOST = computed(() => {
	return config.public.baseURL;
});


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
defineEmits(['open-modal'])
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #1018281A;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #1a1a1a 0%, #4b5563 100%);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.product-image .image {
  width: 100%;
  height: 100%;
  object-position: center;
}

.product-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  color: #1a1a1a;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #FF0000;
  border-color: #FF0000;
  font-weight: 600;
}

.product-content {
  padding: 1rem;
  flex: 1;
  padding-bottom: 5rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.product-specs {
  display: flex;
  flex-direction: column;
  margin-bottom: .5rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
}

.spec-item {
  justify-content: space-between;
  font-size: 0.875rem;
}

.spec-label {
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spec-value {
  color: #1a1a1a;
  font-weight: 500;
}

.product-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e5e7eb;
}

.btn-details,
.btn-quote {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  width: 100%;
}

.btn-details {
  background: white;
  border: 1px solid #1018281A;
  color: #1a1a1a;
}

.btn-details:hover {
  background: #1a1a1a;
  color: white;
}

.btn-quote {
  color: white;
}

.btn-quote:hover {
  transform: translateY(-1px);
}
</style>