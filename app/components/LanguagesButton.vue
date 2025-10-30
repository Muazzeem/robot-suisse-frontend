<template>
    <div class="language-selector" ref="dropdownRef">
        <button class="lang-btn" @click="toggleDropdown">
            <div class="lang-name" :style="{ color: textColor }">
                {{ selectedLanguage.code }}
            </div>
            <span class="arrow-icon" :class="{ 'rotate': isOpen }" :style="{ color: textColor }">
                <svg class="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
            </span>
        </button>
        
        <transition name="dropdown">
            <div v-if="isOpen" class="lang-dropdown">
                <button 
                    v-for="lang in languages" 
                    :key="lang.code"
                    class="lang-option"
                    :class="{ 'active': lang.code === selectedLanguage.code }"
                    @click="selectLanguage(lang)"
                >
                    <span class="flag">{{ lang.flag }}</span>
                    <span class="lang-name">{{ lang.name }}</span>
                    <span v-if="lang.code === selectedLanguage.code" class="check-icon">✓</span>
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref(null)

const props = defineProps({
  textColor: {
    type: String,
    default: 'white'
  }
})

const languages = ref([
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "DECH", name: "Deutsch (CH)", flag: "🇨🇭" },
  { code: "FRCH", name: "Français (CH)", flag: "🇨🇭" },
  { code: "ITCH", name: "Italiano (CH)", flag: "🇨🇭" },
])

const findLang = (code) =>
  languages.value.find(lang => lang.code.toUpperCase() === code?.toUpperCase())

const queryLang = route.query.lang
const selectedLanguage = ref(findLang(queryLang) || languages.value[0])

locale.value = selectedLanguage.value.code.toLowerCase()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  isOpen.value = false
  locale.value = lang.code.toLowerCase()
  router.replace({ query: { ...route.query, lang: lang.code.toLowerCase() } })
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-selector {
    position: relative;
    display: inline-block;
}

.lang-btn {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.2rem 1rem;
    background: transparent;
    border: 0px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    transition: all 0.2s ease;
}
.globe-icon {
    font-size: 1.1rem;
}

.arrow-icon {
    font-size: 0.7rem;
    transition: transform 0.3s ease;
}

.arrow-icon.rotate {
    transform: rotate(180deg);
}

.lang-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 180px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 1000;
}

.lang-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: white;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: #374151;
    transition: background 0.2s ease;
    text-align: left;
}

.lang-option:hover {
    background: #f9fafb;
}

.lang-option.active {
    background: #fef2f2;
    color: #ef4444;
}

.flag {
    font-size: 1.25rem;
}

.lang-name {
    flex: 1;
    font-weight: 500;
}

.check-icon {
    color: #ef4444;
    font-weight: bold;
    font-size: 1rem;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease;
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
