<template>
  <div class="module-a-page1" :class="{ 'dark-theme': currentTheme === 'dark' }">
    <h1>Module A - Page 1 🚀 (热更新测试)</h1>
    <p>This is the first page of Module A - 热更新功能正常工作！111</p>
    
    <!-- 用户信息区域 -->
    <div class="user-info" v-if="isLoggedIn">
      <h3>用户信息</h3>
      <p>姓名: {{ userName }}</p>
      <p>权限: {{ userPermissions.join(', ') }}</p>
      <button @click="logout" class="btn btn-danger">退出登录</button>
    </div>
    
    <!-- 登录表单 -->
    <div class="login-form" v-else>
      <h3>用户登录</h3>
      <input v-model="loginForm.name" placeholder="用户名" class="input" />
      <input v-model="loginForm.permissions" placeholder="权限 (逗号分隔)" class="input" />
      <button @click="handleLogin" class="btn btn-primary">登录</button>
    </div>
    
    <!-- 主题切换 -->
    <div class="theme-switcher">
      <h3>主题设置</h3>
      <button @click="updateTheme('light')" :class="{ active: currentTheme === 'light' }">浅色主题</button>
      <button @click="updateTheme('dark')" :class="{ active: currentTheme === 'dark' }">深色主题</button>
    </div>
    
    <!-- 模块数据展示 -->
    <div class="shared-data">
      <h3>模块数据</h3>
      <div class="data-section">
        <h4>Module A 数据</h4>
        <input v-model="moduleADataInput" placeholder="输入 Module A 数据" class="input" />
        <button @click="updateModuleAData" class="btn btn-primary">更新数据</button>
        <p>当前页面: {{ moduleAData.currentPage }}</p>
        <p>计数器: {{ moduleAData.counter }}</p>
      </div>
      
      <div class="data-section">
        <h4>应用配置</h4>
        <p>应用标题: {{ appConfig.title }}</p>
        <p>版本: {{ appConfig.version }}</p>
        <p>主题: {{ appConfig.theme }}</p>
      </div>
    </div>
    
    <div class="content">
      <h2>Features</h2>
      <ul>
        <li>Dynamic routing</li>
        <li>Modular architecture</li>
        <li>Reusable components</li>
        <li>Shared Vuex store</li>
        <li>Cross-module data sharing</li>
      </ul>
    </div>
    
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModuleAPage1',
  data() {
    return {
      loginForm: {
        name: '',
        permissions: ''
      },
      moduleADataInput: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      appConfig: state => state.appConfig,
      moduleAData: state => state.moduleA ? state.moduleA.moduleAData : {}
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
    handleLogin() {
      const permissions = this.loginForm.permissions.split(',').map(p => p.trim()).filter(p => p)
      this.$store.commit('setUser', {
        name: this.loginForm.name,
        permissions
      })
      this.loginForm = { name: '', permissions: '' }
    },
    logout() {
      this.$store.commit('setUser', { name: '', permissions: [] })
    },
    updateTheme(theme) {
      this.$store.commit('setAppConfig', { theme })
    },
    updateModuleAData() {
      if (this.moduleADataInput) {
        this.$store.commit('moduleA/SET_FORM_DATA', { 
          customData: this.moduleADataInput 
        })
        this.moduleADataInput = ''
      }
    }
  }
}
</script>

<style scoped>
.module-a-page1 {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  transition: background-color 0.3s, color 0.3s;
}

.module-a-page1.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}

.content {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  transition: background-color 0.3s;
}

.dark-theme .content {
  background: #2d2d2d;
}

ul {
  text-align: left;
}

.user-info,
.login-form,
.theme-switcher,
.shared-data {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.dark-theme .user-info,
.dark-theme .login-form,
.dark-theme .theme-switcher,
.dark-theme .shared-data {
  background: #2d2d2d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
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

.input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
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
  border-color: #007bff;
}

.btn {
  padding: 10px 20px;
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
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.theme-switcher button {
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.dark-theme .theme-switcher button {
  border-color: #555;
  background: #2d2d2d;
  color: #ffffff;
}

.theme-switcher button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
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

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background: #5a6268;
  color: white;
}
</style>