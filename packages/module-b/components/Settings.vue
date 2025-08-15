<template>
  <div class="module-b-settings">
    <h1>Module B - Settings</h1>
    <p>Configure your Module B preferences</p>
    <div class="settings-form">
      <div class="form-group">
        <label for="theme">Theme</label>
        <select id="theme" v-model="settings.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div class="form-group">
        <label for="language">Language</label>
        <select id="language" v-model="settings.language">
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="settings.notifications">
          Enable Notifications
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="settings.autoSave">
          Auto Save
        </label>
      </div>
      <button @click="saveSettings" class="save-btn">Save Settings</button>
    </div>
    <div class="navigation">
      <router-link to="/module-b/dashboard">Back to Dashboard</router-link>
      <router-link to="/module-b/profile">Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBSettings',
  data() {
    return {
      settings: {
        theme: 'light',
        language: 'en',
        notifications: true,
        autoSave: false
      }
    }
  },
  methods: {
    saveSettings() {
      alert('Settings saved successfully!');
      console.log('Settings:', this.settings);
    }
  }
}
</script>

<style scoped>
.module-b-settings {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-form {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.save-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.save-btn:hover {
  background: #3aa876;
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