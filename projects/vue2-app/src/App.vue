<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <span class="nav-section">Module A:</span>
      <router-link to="/module-a/page1">Page 1</router-link> |
      <router-link to="/module-a/page2">Page 2</router-link> |
      <router-link to="/module-a/page3">Page 3</router-link> |
      <span class="nav-section">Module B:</span>
      <router-link to="/module-b/dashboard">Dashboard</router-link> |
      <router-link to="/module-b/settings">Settings</router-link> |
      <router-link to="/module-b/profile">Profile</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #f0f0f0;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: #f0fff4;
}

.nav-section {
  font-weight: bold;
  color: #666;
  margin: 0 8px;
  font-size: 14px;
}
</style>