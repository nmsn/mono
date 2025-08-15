<template>
  <div class="module-b-dashboard">
    <h1>Module B - Dashboard</h1>
    <p>Welcome to Module B Dashboard</p>
    <div class="dashboard-grid">
      <div class="card">
        <h3>Quick Stats</h3>
        <div class="stat">
          <span class="number">42</span>
          <span class="text">Active Users</span>
        </div>
        <div class="stat">
          <span class="number">128</span>
          <span class="text">Total Projects</span>
        </div>
      </div>
      <div class="card">
        <h3>Recent Activity</h3>
        <ul>
          <li>User logged in</li>
          <li>New project created</li>
          <li>Settings updated</li>
        </ul>
      </div>
    </div>
    <div class="navigation">
      <router-link to="/module-b/settings">Settings</router-link>
      <router-link to="/module-b/profile">Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBDashboard'
}
</script>

<style scoped>
.module-b-dashboard {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.stat:last-child {
  border-bottom: none;
}

.number {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
}

.text {
  color: #666;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

ul li:last-child {
  border-bottom: none;
}

.navigation {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.navigation a {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.navigation a:hover {
  background: #3aa876;
}
</style>