<template>
  <div class="home">
    <h1>Welcome to Vue 2 Monorepo App</h1>
    <p>This is a Vue 2 application with dynamic module routing in a monorepo structure.</p>
    
    <div class="modules-container">
      <div class="module-card">
        <h2>Module A</h2>
        <p>Contains 3 pages with different layouts and functionality</p>
        <div class="module-links">
          <router-link to="/module-a/page1" class="module-link">Page 1</router-link>
          <router-link to="/module-a/page2" class="module-link">Page 2</router-link>
          <router-link to="/module-a/page3" class="module-link">Page 3</router-link>
        </div>
      </div>
      
      <div class="module-card">
        <h2>Module B</h2>
        <p>Contains dashboard, settings, and profile management</p>
        <div class="module-links">
          <router-link to="/module-b/dashboard" class="module-link">Dashboard</router-link>
          <router-link to="/module-b/settings" class="module-link">Settings</router-link>
          <router-link to="/module-b/profile" class="module-link">Profile</router-link>
        </div>
      </div>
    </div>
    
    <div class="features">
      <h3>Features</h3>
      <ul>
        <li>✅ Monorepo structure with pnpm workspace</li>
        <li>✅ Dynamic module loading</li>
        <li>✅ Modular architecture</li>
        <li>✅ Reusable components</li>
        <li>✅ Vue 2 with latest features</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.modules-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
}

.module-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.module-card h2 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 15px;
}

.module-card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.module-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-link {
  display: block;
  padding: 12px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s;
}

.module-link:hover {
  background: #3aa876;
}

.features {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  margin-top: 40px;
}

.features h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  color: #555;
}

.features li:last-child {
  border-bottom: none;
}
</style>