<template>
  <div>
    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="(!isMobile && isSidebarOpen) || (isMobile && localSidebarVisible) || isSidebarOpen"
        class="sidebar"
        :class="{ open: localSidebarVisible || isSidebarOpen }"
      >
        <div class="sidebar-content">
          <div style="padding: 1rem;">
            <h2 class="sidebar-title">ROBOT MODELS</h2>
          </div>
          <div
            v-for="(robot, index) in getRobots"
            :key="index"
            class="robot-item"
            :class="{ active: selectedRobot === getLocaleField(robot, 'title', $i18n.locale) }"
            @click="handleRobotClick(robot)"
          >
            <div class="robot-header">
              <div class="robot-image-wrapper">
                <img
                  class="robot-image"
                  :src="HOST + robot.thumbnail?.original?.src || robot.image"
                  :alt="getLocaleField(robot, 'title', $i18n.locale)"
                />
              </div>
              <div>
                <p class="robot-name">
                {{ getStremleField(robot.robot_title, $i18n.locale) }}
                </p>
                <p class="robot-description">
                  {{ truncateText(getStremleField(robot?.short_description, $i18n.locale), 13) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <!-- Overlay (for mobile only) -->
    <div
      v-if="isMobile && localSidebarVisible"
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
  isSidebarOpen: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["select", "toggle"]);

const localSidebarVisible = ref(true);
const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768;
  localSidebarVisible.value = !isMobile.value;
};

const toggleSidebar = () => {
  localSidebarVisible.value = !localSidebarVisible.value;
  emit('toggle', localSidebarVisible.value);
};

const { locale } = useI18n()

const handleRobotClick = (robot) => {
  const robotName = getLocaleField(robot, 'title', locale.value);
  emit('select', robotName);
  
  // Close sidebar on mobile after selection
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Watch for external sidebar toggle
watch(() => props.isSidebarOpen, (newVal) => {
  if (!isMobile.value) {
    localSidebarVisible.value = newVal;
  }
});

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
  emit('toggle', localSidebarVisible.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style scoped>
/* ===== Sidebar Container ===== */
.sidebar {
  width: 250px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: auto;
  left: 0;
  height: calc(100vh - 4.3rem);
  z-index: 1100;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  background-color: #ffffff;
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

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ===== Scrollable Content ===== */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
}

.sidebar-content::-webkit-scrollbar {
  width: 6px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

/* ===== Robot Items ===== */
.robot-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid transparent;
  border-radius: 0.75rem;
}

.robot-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.robot-image-wrapper {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

.robot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.robot-item:hover {
  background-color: #ffffff;
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.robot-item.active {
  background-color: #FEF2F2;
  border-color: #FF0000;
  box-shadow: 0 2px 8px rgba(255, 0, 0, 0.1);
}

.robot-name {
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  color: #101828;
  line-height: 1.4;
  flex: 1;
  margin: 0 0 0.25rem 0;
}

.robot-description {
  font-size: 13px;
  font-weight: 400;
  color: #6b7280;
  margin: 0;
  line-height: 1.3;
}

/* ===== Overlay for mobile ===== */
.overlay {
  position: fixed;
  top: 4.3rem;
  left: 0;
  width: 100%;
  height: calc(100vh - 4.3rem);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

/* ===== Floating Button (Mobile Only) ===== */
.floating-btn {
  position: fixed;
  top: 5rem;
  left: 20px;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.floating-btn:hover {
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    height: 100vh;
    top: auto;
    border-right: none;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .overlay {
    top: 0;
    height: 100vh;
  }
}
</style>