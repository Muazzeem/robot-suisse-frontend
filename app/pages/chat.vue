<template>
    <Header />
    <div class="chat-layout">
      <ChatSidebar 
        :selected-robot="selectedRobot" 
        @select="handleRobotSelect"
        @toggle="handleSidebarToggle"
      />
      <div class="chat-main" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
        <ChatPage :data="pageData" :selected-robot-name="selectedRobot" />
      </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'chat' })

const selectedRobot = ref(null)
const pageData = ref({})
const isSidebarOpen = ref(true)

const handleRobotSelect = (robotTitle) => {
  selectedRobot.value = robotTitle
  // You can add additional logic here when a robot is selected
}

const handleSidebarToggle = (isOpen) => {
  isSidebarOpen.value = isOpen
}

// Fetch robots on mount
const utilityStore = useUtilityStore()

onMounted(async () => {
  if (!utilityStore.getRobots || utilityStore.getRobots.length === 0) {
    await utilityStore.fetchRobots()
  }
})
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: calc(100vh - 4.3rem);
  background-color: #f7f7f8;
  overflow: hidden;
  margin-top: 4.3rem;
  position: relative;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
  overflow: hidden;
  transition: margin-left 0.3s ease-in-out;
}

.chat-main.sidebar-collapsed {
  margin-left: 0;
}

@media (max-width: 768px) {
  .chat-main {
    margin-left: 0;
  }
  
  .chat-main.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>  