<template>
  <header class="header">
    <NuxtLink to="/" style="text-decoration: none;">
      <div class="logo">
        <div class="logo-icon bg-red"></div>
        <span class="logo-text">RobotSuisse</span>
      </div>
    </NuxtLink>

    <!-- Desktop Navigation -->
    <nav class="nav desktop-nav">
      <NuxtLink to="/" class="nav-link">{{ $t('menu.home') }}</NuxtLink>
      <NuxtLink to="/about-us" class="nav-link">{{ $t('menu.about') }}</NuxtLink>
      <ProductMenu :menu-color="'white'" :title="$t('menu.products')" />
      <NuxtLink to="/blogs" class="nav-link">{{ $t('menu.blogs') }}</NuxtLink>
    </nav>

    <div class="header-actions">
      <LanguagesButton />
      <NuxtLink to="/contact-us">
        <button class="contact-btn desktop-contact bg-red">{{ $t('menu.contact-us') }}</button>
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleSidebar" aria-label="Toggle menu">
        <span class="hamburger" :class="{ active: sidebarOpen }"></span>
      </button>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <transition name="overlay">
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
    </transition>

    <!-- Mobile Sidebar -->
    <transition name="sidebar">
      <aside v-if="sidebarOpen" class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <div class="logo-icon bg-red"></div>
            <span class="logo-text">RobotSuisse</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <NuxtLink to="/" class="sidebar-link" @click="toggleSidebar">
            {{ $t('menu.home') }}
          </NuxtLink>
          <NuxtLink to="/about-us" class="sidebar-link" @click="toggleSidebar">
            {{ $t('menu.about') }}
          </NuxtLink>
          <NuxtLink to="/products" class="sidebar-link" @click="toggleSidebar">
            {{ $t('menu.products') }}
          </NuxtLink>
          <NuxtLink to="/blogs" class="sidebar-link" @click="toggleSidebar">
            {{ $t('menu.blogs') }}
          </NuxtLink>
        </nav>

        <div class="sidebar-footer">
          <button class="contact-btn mobile-contact bg-red" @click="toggleSidebar">
            {{ $t('menu.contact-us') }}
          </button>
        </div>
      </aside>
    </transition>
  </header>
</template>

<script setup>
const { locale } = useI18n()

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value

  if (sidebarOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

onBeforeRouteUpdate(() => {
  sidebarOpen.value = false
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 101;
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  position: relative;
  flex-shrink: 0;
}

.logo-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 2px;
}

.logo-text {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  transition: opacity 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  opacity: 0.8;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-btn {
  background: transparent;
  border: 0px;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.globe-icon {
  font-size: 1rem;
}

.contact-btn {
  border: none;
  color: white;
  padding: 0.625rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.contact-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
}

.hamburger {
  width: 24px;
  height: 2px;
  background: white;
  display: block;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Sidebar Styles */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 98;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #1a1a1a;
  z-index: 99;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 0.7;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  margin-left: .5rem;
}

.sidebar-link {
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-link:hover,
.sidebar-link.router-link-active {
  background: rgba(239, 68, 68, 0.1);
  border-radius: 15px;
  margin-left: .5rem;
}

.sidebar-footer {
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-contact {
  width: 100%;
}

/* Transitions */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .header {
    padding: 1.25rem 1.5rem;
  }

  .nav {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem 1.25rem;
  }

  .desktop-nav {
    display: none;
  }

  .desktop-contact {
    display: none;
  }
.mobile-menu-btn {
  display: block;
}

.lang-btn {
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
}

.globe-icon {
  font-size: 0.9rem;
}
}

@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .logo-icon::after {
    width: 10px;
    height: 10px;
  }

  .sidebar {
    width: 100%;
    max-width: 280px;
  }
}
</style>