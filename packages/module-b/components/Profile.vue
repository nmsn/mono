<template>
  <div class="module-b-profile">
    <h1>Module B - Profile</h1>
    <p>Manage your profile information</p>
    <div class="profile-card">
      <div class="avatar">
        <div class="avatar-placeholder">👤</div>
        <button class="change-avatar">Change Avatar</button>
      </div>
      <div class="profile-info">
        <div class="info-group">
          <label>Username:</label>
          <input type="text" v-model="profile.username" placeholder="Enter username">
        </div>
        <div class="info-group">
          <label>Email:</label>
          <input type="email" v-model="profile.email" placeholder="Enter email">
        </div>
        <div class="info-group">
          <label>Full Name:</label>
          <input type="text" v-model="profile.fullName" placeholder="Enter full name">
        </div>
        <div class="info-group">
          <label>Bio:</label>
          <textarea v-model="profile.bio" placeholder="Tell us about yourself" rows="4"></textarea>
        </div>
        <button @click="saveProfile" class="save-btn">Save Profile</button>
      </div>
    </div>
    <div class="navigation">
      <router-link to="/module-b/dashboard">Back to Dashboard</router-link>
      <router-link to="/module-b/settings">Settings</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBProfile',
  data() {
    return {
      profile: {
        username: '',
        email: '',
        fullName: '',
        bio: ''
      }
    }
  },
  methods: {
    saveProfile() {
      alert('Profile saved successfully!');
      console.log('Profile:', this.profile);
    }
  }
}
</script>

<style scoped>
.module-b-profile {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.profile-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
}

.avatar {
  text-align: center;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto 20px;
}

.change-avatar {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.change-avatar:hover {
  background: #3aa876;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.info-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.save-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
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