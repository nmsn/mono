<template>
  <div class="module-a-page2">
    <h1>Module A - Page 2</h1>
    <p>This is the second page of Module A</p>
    <div class="card">
      <h3>Module Information</h3>
      <p><strong>Module Name:</strong> Module A</p>
      <p><strong>Version:</strong> 1.0.0</p>
      <p><strong>Type:</strong> Dynamic Route Module</p>
    </div>
    <div class="navigation">
      <router-link to="/module-a/page1">Previous Page</router-link>
      <router-link to="/module-a/page3">Next Page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleAPage2'
}
</script>

<style scoped>
.module-a-page2 {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.navigation a {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.navigation a:hover {
  background: #3aa876;
}
</style>