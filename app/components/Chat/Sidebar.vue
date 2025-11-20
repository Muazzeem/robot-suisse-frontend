<template>
  <div>
    <!-- Floating button (visible on mobile only) -->
    <button v-if="isMobile && !isSidebarVisible" class="floating-btn" @click="toggleSidebar">
      <img width="30" height="30" src="https://img.icons8.com/plumpy/24/select-left-column.png" alt="select-left-column"/>
    </button>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="!isMobile || isSidebarVisible"
        class="sidebar"
        :class="{ open: isSidebarVisible }"
      >
        <div class="sidebar-content">
          <div style="padding: 1rem;">
            <h2 class="sidebar-title">More Robots</h2>
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
  isSidebarVisible.value = !isMobile.value;
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
  width: 250px;
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

.sidebar-title {
  font-size: 18px;
  font-weight: 400;
  color: #10182899;
  text-transform: uppercase;
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
  background-color: #1018281A;
  border-right: 1px solid #e5e7eb;
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
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0.5rem;
  background-color: #676e7f1a;
  border: 1px solid #e5e7eb;
}

.robot-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.robot-image-wrapper {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.robot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.robot-item:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.robot-item.active {
  background-color: #FEF2F2;
  border-color: #FF0000;
}

.robot-name {
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  color: #101828;
  line-height: 1.4;
  flex: 1;
}

.robot-description {
  font-size: 14px;
  font-weight: 400;
  color: #10182899;
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
  top: 5rem;
  left: 20px;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-color: #1018281A;
  }
  .sidebar.open {
    transform: translateX(0);
    background-color: #FAFAFA;
  }
  
  .overlay {
    top: 0;
    height: 100vh;
  }
}
</style>