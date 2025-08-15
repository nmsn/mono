<template>
  <div class="module-a-page3">
    <h1>Module A - Page 3</h1>
    <p>This is the third page of Module A</p>
    <div class="stats">
      <h3>Module Statistics</h3>
      <div class="stat-item">
        <span class="label">Total Pages:</span>
        <span class="value">3</span>
      </div>
      <div class="stat-item">
        <span class="label">Components:</span>
        <span class="value">3</span>
      </div>
      <div class="stat-item">
        <span class="label">Routes:</span>
        <span class="value">3</span>
      </div>
    </div>
    <div class="actions">
      <router-link to="/module-a/page2">Back to Page 2</router-link>
      <router-link to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleAPage3'
}
</script>

<style scoped>
.module-a-page3 {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stats {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.stat-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #42b983;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.actions a {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.actions a:hover {
  background: #3aa876;
}
</style>