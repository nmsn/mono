<template>
  <div class="module-b-dashboard" :class="{ 'dark-theme': currentTheme === 'dark' }">
    <h1>Module B - Dashboard</h1>
    <p>Welcome to Module B Dashboard</p>
    
    <!-- 用户信息区域 -->
    <div class="user-info" v-if="isLoggedIn">
      <h3>当前用户</h3>
      <p>姓名: {{ userName }}</p>
      <p>权限: {{ userPermissions.join(', ') }}</p>
      <button @click="logout" class="btn btn-danger">退出登录</button>
    </div>
    
    <!-- 应用配置 -->
    <div class="app-config">
      <h3>应用配置</h3>
      <div class="config-item">
        <label>API 端点:</label>
        <input v-model="apiEndpoint" @change="updateApiConfig" class="input" />
      </div>
      <div class="config-item">
        <label>调试模式:</label>
        <input type="checkbox" v-model="debugMode" @change="updateDebugConfig" class="checkbox" />
        <span>{{ debugMode ? '开启' : '关闭' }}</span>
      </div>
      <div class="config-item">
        <label>缓存大小:</label>
        <input v-model.number="cacheSize" @change="updateCacheConfig" type="number" class="input number-input" />
        <span>MB</span>
      </div>
    </div>
    
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
    
    <!-- 模块数据展示 -->
    <div class="shared-data">
      <h3>模块数据</h3>
      <div class="data-section">
        <h4>Module B 数据</h4>
        <input v-model="moduleBDataInput" placeholder="输入 Module B 数据" class="input" />
        <button @click="updateModuleBData" class="btn btn-primary">更新数据</button>
        <p>用户资料: {{ moduleBData.userProfile ? moduleBData.userProfile.name : '未设置' }}</p>
        <p>主题设置: {{ moduleBData.settings ? moduleBData.settings.theme : '默认' }}</p>
      </div>
      
      <div class="data-section">
        <h4>应用配置</h4>
        <p>应用标题: {{ appConfig.title }}</p>
        <p>版本: {{ appConfig.version }}</p>
        <p>主题: {{ appConfig.theme }}</p>
      </div>
    </div>
    
    <div class="navigation">
      <router-link to="/module-b/settings" class="nav-link">Settings</router-link>
      <router-link to="/module-b/profile" class="nav-link">Profile</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModuleBDashboard',
  data() {
    return {
      apiEndpoint: '',
      debugMode: false,
      cacheSize: 0,
      moduleBDataInput: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      appConfig: state => state.appConfig,
      moduleBData: state => state.moduleB ? state.moduleB.moduleBData : {}
    }),
    isLoggedIn() {
      return this.user.name !== ''
    },
    userName() {
      return this.user.name
    },
    userPermissions() {
      return this.user.permissions || []
    },
    currentTheme() {
      return this.appConfig.theme
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUser', { name: '', permissions: [] })
    },
    updateModuleBData() {
      if (this.moduleBDataInput) {
        this.$store.commit('moduleB/SET_USER_PROFILE', { 
          name: this.moduleBDataInput 
        })
        this.moduleBDataInput = ''
      }
    },
    updateApiConfig() {
      this.$store.commit('setAppConfig', {
        apiEndpoint: this.apiEndpoint
      })
    },
    updateDebugConfig() {
      this.$store.commit('setAppConfig', {
        debugMode: this.debugMode
      })
    },
    updateCacheConfig() {
      this.$store.commit('setAppConfig', {
        cacheSize: this.cacheSize
      })
    }
  },
  watch: {
    appConfig: {
      handler(newConfig) {
        this.apiEndpoint = newConfig.apiEndpoint || ''
        this.debugMode = newConfig.debugMode || false
        this.cacheSize = newConfig.cacheSize || 0
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.module-b-dashboard {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  transition: background-color 0.3s, color 0.3s;
}

.module-b-dashboard.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}

.user-info,
.app-config,
.shared-data {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.dark-theme .user-info,
.dark-theme .app-config,
.dark-theme .shared-data {
  background: #2d2d2d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.dark-theme h3 {
  color: #ffffff;
  border-bottom-color: #4dabf7;
}

h4 {
  color: #555;
  margin-top: 15px;
}

.dark-theme h4 {
  color: #cccccc;
}

.config-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.config-item label {
  min-width: 100px;
  margin-right: 10px;
  font-weight: bold;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  color: #333;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

.dark-theme .input {
  border-color: #555;
  background: #1a1a1a;
  color: #ffffff;
}

.input:focus {
  outline: none;
  border-color: #42b983;
}

.number-input {
  max-width: 100px;
}

.checkbox {
  margin-right: 8px;
  transform: scale(1.2);
}

.btn {
  padding: 8px 16px;
  margin: 5px 5px 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.1s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover {
  background: #3aa876;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
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
  transition: background-color 0.3s, border-color 0.3s;
}

.dark-theme .card {
  background: #2d2d2d;
  border-color: #555;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  transition: border-color 0.3s;
}

.dark-theme .stat {
  border-bottom-color: #555;
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

.dark-theme .text {
  color: #cccccc;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  transition: border-color 0.3s;
}

.dark-theme ul li {
  border-bottom-color: #555;
}

ul li:last-child {
  border-bottom: none;
}

.data-section {
  margin: 15px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.dark-theme .data-section {
  background: #1a1a1a;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  transition: background-color 0.3s;
}

.dark-theme pre {
  background: #2d2d2d;
  color: #ffffff;
}

.navigation {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.nav-link {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background: #3aa876;
}
</style>