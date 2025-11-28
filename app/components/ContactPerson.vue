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
                    <img :src="member?.image" :alt="member?.title" />
                  </div>
                  <div class="card-content">
                    <p class="name">{{ getStremleField(member?.name, $i18n.locale) }}</p>
                    <div>
                      <div class="custom-block" v-html="getStremleField(member?.description, $i18n.locale)"></div>
                    </div>
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
const props = defineProps({
  data: null
})

const config = useRuntimeConfig()
const HOST = computed(() => config.public.baseURL)

const currentSlide = ref(0)
const membersPerSlide = ref(4) 

const members = computed(() => props.data || [])

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


<style lang="css" scoped>

.team-section {
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

/* TEAM CARD */
.team-card {
  padding-top: 1rem;
  width: 100%;
  max-width: 280px;
  border-radius: 1rem;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-4px);
}

/* FIXED IMAGE SIZE */
.card-image {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 1rem;
  background: #e5e7eb;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease;
}

.team-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1rem;
  text-align: left;
}
.name {
  font-size: 1.25rem;
  font-weight: 500;
  color: #101828;
}

:deep(.custom-block) p {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 27px;
  text-align: left;
  font-weight: 500;
}
:deep(.custom-block) h4 {
  color: #4b5563;
  font-size: 0.95rem;
  font-weight: 400;
  text-align: left;
}
/* NAVIGATION */
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
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
}

.nav-button:hover:not(:disabled) {
  background: #f9fafb;
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* DOTS */
.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  transition: 0.3s;
}

.dot.active {
  background: #ef4444;
  width: 24px;
  border-radius: 4px;
}


/* RESPONSIVE GRID */
@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .card-image {
    width: 200px;
    height: 200px;
  }
}

</style>