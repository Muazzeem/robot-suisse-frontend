<template>
  <div class="team-section">
    <div class="container">
      <div class="carousel-wrapper">
        <div class="carousel-container">
          <div 
            class="carousel-track"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(slide, slideIndex) in totalSlides" 
              :key="slideIndex"
              class="carousel-slide"
            >
              <div class="team-grid">
                <div
                  v-for="(member, index) in getSlideMembers(slideIndex)"
                  :key="index"
                  class="team-card"
                >
                  <div class="card-image">
                    <img :src="getFullImageUrl(member?.image?.original?.src)" :alt="member?.title" />
                  </div>
                  <div class="card-content">
                    <div class="card-description" v-html="getLocaleField(member, 'description', $i18n.locale)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="navigation">
          <button 
            @click="prevSlide" 
            class="nav-button"
            :disabled="currentSlide === 0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="dots">
            <button
              v-for="(slide, index) in totalSlides"
              :key="index"
              @click="goToSlide(index)"
              class="dot"
              :class="{ active: currentSlide === index }"
            ></button>
          </div>

          <button 
            @click="nextSlide" 
            class="nav-button"
            :disabled="currentSlide === totalSlides - 1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  data: null
})

const config = useRuntimeConfig()
const HOST = computed(() => config.public.baseURL)

const currentSlide = ref(0)
const membersPerSlide = ref(4) 

const members = computed(() => props?.data?.team?.categories || [])

const totalSlides = computed(() =>
  Math.ceil(members.value.length / membersPerSlide.value)
)

const getSlideMembers = (slideIndex) => {
  const start = slideIndex * membersPerSlide.value
  return members.value.slice(start, start + membersPerSlide.value)
}

const updateMembersPerSlide = () => {
  const width = window.innerWidth
  if (width >= 1024) membersPerSlide.value = 4
  else if (width >= 768) membersPerSlide.value = 3
  else if (width >= 640) membersPerSlide.value = 2
  else membersPerSlide.value = 1
}

onMounted(() => {
  updateMembersPerSlide()
  window.addEventListener('resize', updateMembersPerSlide)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMembersPerSlide)
})

const getFullImageUrl = (url) => `${HOST.value}${url}`

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) currentSlide.value++
}
const prevSlide = () => {
  if (currentSlide.value > 0) currentSlide.value--
}
const goToSlide = (index) => {
  currentSlide.value = index
}

watch(membersPerSlide, () => {
  currentSlide.value = 0
})

</script>


<style scoped>
.team-section {
  background-color: #FFFFFF;  
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  max-width: 42rem;
  margin: 0 auto;
}

.carousel-wrapper {
  position: relative;
}

.carousel-container {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.team-card {
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-color: #f3f4f6;
  border-radius: 1.5rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  text-align: center;
  background-color: transparent;
}

h2, h3, h4, h5, h6 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  color: #1a1a1a !important;
  margin-bottom: 1rem !important;
}

p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #050505;
  white-space: pre-line;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.nav-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
}

.nav-button:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d1d5db;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background-color: #ef4444;
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .title {
    font-size: 2.5rem;
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 1024px) {
  .team-section {
    padding: 1rem 0;
  }
}
</style>