<template>
  <section class="what-defines-section">
    <div class="container">
      <div class="video-container">
        <!-- Show thumbnail until video is loaded -->
        <img
          v-if="!isVideoLoaded"
          :src="youtubeThumbnail"
          alt="Video thumbnail"
          class="video-thumbnail"
        />
        
        <!-- YouTube iframe - lazy loaded -->
        <iframe
          v-if="isVideoLoaded"
          :src="youtubeEmbedUrl"
          class="video-player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <!-- Play button - hide when video is loaded -->
        <button 
          v-if="!isVideoLoaded"
          class="play-button" 
          aria-label="Play video"
          @click="loadVideo"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Refs
const isVideoLoaded = ref(false)

// Extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

// Computed properties
const videoId = computed(() => getYoutubeVideoId(props.data.video_url))

const youtubeEmbedUrl = computed(() => {
  if (!videoId.value) return ''
  return `https://www.youtube.com/embed/${videoId.value}?autoplay=1`
})

const youtubeThumbnail = computed(() => {
  if (!videoId.value) return 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1200'
  // Use maxresdefault for best quality, fallback to hqdefault
  return `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg`
})

// Methods
const loadVideo = () => {
  isVideoLoaded.value = true
}
</script>

<style scoped>
.what-defines-section {
  padding: 2rem 0rem;
  background: white;
}

.video-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 4rem;
  background: #e5e7eb;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-player {
  width: 100%;
  height: 100%;
  border: none;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.play-button svg {
  color: #ef4444;
  margin-left: 4px;
}

@media (max-width: 768px) {
  .what-defines-section {
    padding: 1rem 0 1rem;
  }

  .video-container {
    height: 280px;
    margin-bottom: 3rem;
  }

  .play-button {
    width: 64px;
    height: 64px;
  }
}
</style>