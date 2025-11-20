<template>
  <div>
    <!-- Your existing Header and PageHeader components -->
    <Header />
    <PageHeader :data="data" />

    <!-- ABB Company Profile Content -->
    <div class="company-profile">
      <div class="container">
        <!-- Company Info Bar -->
        <div class="company-header">
          <div class="company-info">
            <div class="logo-section">
              <img src="https://howtorobot.com/sites/default/files/association_logos/a3.png" alt="ABB Logo" class="company-logo" />
              <div class="company-details">
                <h1 class="company-name">ABB North America</h1>
                <p class="company-meta">North America · Robot OEM · 20-50 employees</p>
                <div class="contact-links">
              <a href="#" class="link-item visit-link">
                <i class="fa-solid fa-globe icon"></i>
                Visit website
              </a>
              <span class="link-item">
                <i class="fa-solid fa-phone icon"></i>
                (702) 555-0122
              </span>
              <span class="link-item">
                <i class="fa-solid fa-envelope icon"></i>
                jeram.bell@example.com
              </span>
            </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="content-grid">
          <!-- Left Column -->
          <div class="main-content">
            <!-- Robot OEM Description -->
            <section class="card">
              <h2 class="section-title">Robot OEM description</h2>
              <p class="description-text">
                ABB is one of the world's leading robotics and machine automation suppliers as well as the only 
                company with a comprehensive and integrated portfolio covering robots, AMRs and machine 
                automation solutions. Designed and orchestrated by our value-creating software, ABB Robotics 
                employs approximately 11,000 people at over 100 locations in more than 50 countries.
              </p>
            </section>

            <!-- System Integrators Map Section -->
            <section class="card">
              <h2 class="section-title">
                System integrators related to ABB North America on HowToRobot
              </h2>
              
              <!-- Map Container -->
              <div class="map-container">
                <!-- <img 
                  src="/api/placeholder/800/400" 
                  alt="Birmingham Area Map" 
                  class="map-image"
                /> -->
                <div class="map-overlay">
                  <div class="map-label">
                    <p>Birmingham, AL region</p>
                  </div>
                </div>
              </div>

              <p class="map-description">
                List of robot and automation system integrators related to ABB North America region. Click on any 
                system integrator business to read more.
              </p>
            </section>
            <Companies />
          </div>

          <!-- Right Column - Contact Person -->
          <aside class="sidebar">
            <section class="card contact-card">
              <h2 class="section-title">Contact Person</h2>
              
              <div class="contact-person">
                <div class="avatar-wrapper">
                  <div class="avatar">
                    <img 
                      src="https://howtorobot.com/sites/default/files/association_logos/a3.png" 
                      alt="Mark Handelsame" 
                      class="avatar-image"
                    />
                  </div>
                </div>
                
                <h3 class="contact-name">Mark Handelsame</h3>
                <p class="contact-title">Channel Sales Manager - Robots Division</p>
                
                <div class="contact-details">
                  <div class="contact-item">
                    <i class="fa-solid fa-phone icon"></i>
                    (702) 555-0122
                  </div>
                  <div class="contact-item">
                    <i class="fa-solid fa-envelope icon"></i>
                    jeram.bell@example.com
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = {
  "image": {
    "id": 1,
    "title": "Robotic-Arm-Manufacturing-Process-Types-and-Applications",
    "original": {
      "src": "/media/images/Robotic-Arm-Manufac.original.jpegquality-80.format-webp.webp",
      "width": 1059,
      "height": 729,
      "alt": "Robotic-Arm-Manufacturing-Process-Types-and-Applications"
    }
  }
};

const companyData = {
  name: "ABB North America",
  region: "North America",
  type: "Robot OEM",
  employees: "20-50 employees",
  website: "https://new.abb.com/products/robotics",
  phone: "(702) 555-0122",
  email: "jeram.bell@example.com",
  description: "ABB is one of the world's leading robotics and machine automation suppliers as well as the only company with a comprehensive and integrated portfolio covering robots, AMRs and machine automation solutions. Designed and orchestrated by our value-creating software, ABB Robotics employs approximately 11,000 people at over 100 locations in more than 50 countries.",
  contact: {
    name: "Mark Handelsame",
    title: "Channel Sales Manager - Robots Division",
    phone: "(702) 555-0122",
    email: "jeram.bell@example.com"
  }
};
</script>

<style scoped>
/* Company Profile Styles */
.company-profile {
  background-color: #f9fafb;
  min-height: 100vh;
  padding-bottom: 3rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Company Header */
.company-header {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 27px;
  margin-bottom: 2rem;
  border-radius: 12px;
}

.company-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-logo {
  height: 8rem;
}

.company-details {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.company-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.contact-links {
    margin-top: .5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.link-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
}

.link-item.visit-link {
  color: #dc2626;
  font-weight: 500;
  text-decoration: underline;
}

.link-item.visit-link:hover {
  color: #b91c1c;
}

.icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.375rem;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Card Styles */
.card {
  padding: 1.5rem;
}

.section-title {
  font-size: 20px;
  font-weight: 500;
  color: #101828;
  margin: 0 0 1rem;
}

.description-text {
  color: #10182899;
  line-height: 27px;
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  text-align: justify;
}

/* Map Section */
.map-container {
  position: relative;
  width: 100%;
  height: 16rem;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-label {
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-label p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.map-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .sidebar .card {
    position: sticky;
    top: 2rem;
  }
}

/* Contact Card */
.contact-card {
  background-color: #ffffff;
  border-radius: 0.7rem;
  text-align: left;
  border: 1px solid #0000001A;
}

.contact-person {
  display: flex;
  flex-direction: column;
}

.avatar-wrapper {
  margin-bottom: 1rem;
}

.avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-name {
  font-size: 24px;
  font-weight: 500;
  color: #101828;
  margin: 0 0 0.25rem;
}

.contact-title {
  font-size: 15px;
  color: #10182899;
  margin: 0 0 1rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #10182899;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .company-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .company-name {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 1.125rem;
  }
}
</style>