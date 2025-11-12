<template>
  <div>
    <!-- Floating button (visible on mobile only) -->
    <button v-if="isMobile && !isSidebarVisible" class="floating-btn" @click="toggleSidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    </button>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="!isMobile || isSidebarVisible"
        class="sidebar"
        :class="{ open: isSidebarVisible }"
      >
        <div class="sidebar-header">
          <h2 class="sidebar-title">Robots</h2>
          <button v-if="isMobile" class="collapse-btn" @click="toggleSidebar" :title="isSidebarVisible ? 'Collapse sidebar' : 'Expand sidebar'">
            <i :class="isSidebarVisible ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right'"></i>
          </button>
        </div>

        <div class="sidebar-content">
          <div
            v-for="(robot, index) in getRobots"
            :key="index"
            class="robot-item"
            :class="{ active: selectedRobot === getLocaleField(robot, 'title', $i18n.locale) }"
            @click="handleRobotClick(robot)"
          >
            <div class="robot-image-wrapper">
              <img
                class="robot-image"
                :src="HOST + robot.thumbnail?.original?.src || robot.image"
                :alt="getLocaleField(robot, 'title', $i18n.locale)"
              />
            </div>
            <div class="robot-name">
              {{ getLocaleField(robot, 'title', $i18n.locale) }}
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Overlay (for mobile only) -->
    <div
      v-if="isMobile && isSidebarVisible"
      class="overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const HOST = computed(() => config.public.baseURL);

const utilityStore = useUtilityStore();
const { getRobots } = storeToRefs(utilityStore);

const props = defineProps({
  selectedRobot: String,
});
const emit = defineEmits(["select", "toggle"]);

const isSidebarVisible = ref(true);
const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768;
  isSidebarVisible.value = !isMobile.value; // Sidebar visible on desktop, hidden by default on mobile
};

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
  emit('toggle', isSidebarVisible.value);
};

const { locale } = useI18n()

const handleRobotClick = (robot) => {
  const robotName = getLocaleField(robot, 'title', locale.value);
  emit('select', robotName);
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
  // Emit initial state
  emit('toggle', isSidebarVisible.value);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style scoped>
/* ===== Sidebar Container ===== */
.sidebar {
  width: 200px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 4.3rem; /* below fixed header */
  left: 0;
  height: calc(100vh - 4.3rem);
  z-index: 1100;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

/* Slide transition for sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* ===== Header ===== */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
}
.sidebar-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}
.collapse-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.1rem;
}

/* ===== Scrollable Content ===== */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #9ca3af #f3f4f6;
}
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 3px;
}

/* ===== Robot Items ===== */
.robot-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
}
.robot-image-wrapper {
  width: 150px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.robot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.robot-item:hover {
  background-color: #f3f4f6;
}
/* .robot-item.active {
  background-color: #FF0000;
  color: white;
} */
/* .robot-item.active .robot-name {
  color: white;
} */
.robot-name {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  color: #374151;
  line-height: 1.4;
}

/* ===== Overlay for mobile ===== */
.overlay {
  position: fixed;
  top: 4.3rem; /* below header */
  left: 0;
  width: 100%;
  height: calc(100vh - 4.3rem);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

/* ===== Floating Button (Mobile Only) ===== */
.floating-btn {
  position: fixed;
  top: 4rem;
  left: 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
  z-index: 1200;
}
.floating-btn:hover {
  background-color: #d40000;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    height: 100vh;
    top: 0;
    border-right: none;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
