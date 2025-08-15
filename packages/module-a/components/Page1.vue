<template>
  <div class="module-a-page1">
    <h1>Module A - Page 1</h1>
    <p>This is the first page of Module A</p>
    <div class="content">
      <h2>Features</h2>
      <ul>
        <li>Dynamic routing</li>
        <li>Modular architecture</li>
        <li>Reusable components</li>
      </ul>
    </div>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'ModuleAPage1'
}
</script>

<style scoped>
.module-a-page1 {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.content {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

ul {
  text-align: left;
}
</style>