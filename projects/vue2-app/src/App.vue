<template>
  <div id="app">
    <!-- Element UI 组件示例 -->
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h1 style="margin: 0; color: #409EFF;">Monorepo Vue App</h1>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" icon="el-icon-user" @click="showUserInfo">用户信息</el-button>
            <el-button type="success" icon="el-icon-setting" @click="showSettings">设置</el-button>
          </el-col>
        </el-row>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            @select="handleMenuSelect">
            <el-menu-item index="/">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <i class="el-icon-info"></i>
              <span slot="title">关于</span>
            </el-menu-item>
            <el-submenu index="module-a">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>Module A</span>
              </template>
              <el-menu-item index="/module-a/page1">Page 1</el-menu-item>
              <el-menu-item index="/module-a/page2">Page 2</el-menu-item>
              <el-menu-item index="/module-a/page3">Page 3</el-menu-item>
            </el-submenu>
            <el-submenu index="module-b">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>Module B</span>
              </template>
              <el-menu-item index="/module-b/dashboard">Dashboard</el-menu-item>
              <el-menu-item index="/module-b/settings">Settings</el-menu-item>
              <el-menu-item index="/module-b/profile">Profile</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    
    <!-- 用户信息对话框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="userDialogVisible"
      width="30%">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ userInfo.name || '未登录' }}</el-descriptions-item>
        <el-descriptions-item label="权限">
          <el-tag v-for="perm in userInfo.permissions" :key="perm" style="margin-right: 5px;">
            {{ perm }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="主题">{{ currentTheme === 'dark' ? '深色' : '浅色' }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    
    <!-- 设置对话框 -->
    <el-dialog
      title="应用设置"
      :visible.sync="settingsDialogVisible"
      width="40%">
      <el-form :model="settingsForm" label-width="120px">
        <el-form-item label="API 端点">
          <el-input v-model="settingsForm.apiEndpoint" placeholder="请输入 API 端点"></el-input>
        </el-form-item>
        <el-form-item label="调试模式">
          <el-switch v-model="settingsForm.debugMode"></el-switch>
        </el-form-item>
        <el-form-item label="缓存大小 (MB)">
          <el-input-number v-model="settingsForm.cacheSize" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="主题">
          <el-radio-group v-model="settingsForm.theme">
            <el-radio label="light">浅色主题</el-radio>
            <el-radio label="dark">深色主题</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { debounce, throttle } from 'lodash-es'

export default {
  name: 'App',
  data() {
    return {
      activeMenu: '/',
      userDialogVisible: false,
      settingsDialogVisible: false,
      settingsForm: {
        apiEndpoint: '',
        debugMode: false,
        cacheSize: 0,
        theme: 'light'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      appConfig: state => state.appConfig
    }),
    ...mapGetters([
      'isLoggedIn',
      'userName',
      'userPermissions',
      'currentTheme'
    ]),
    userInfo() {
      return this.user || {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.activeMenu = route.path
      },
      immediate: true
    },
    appConfig: {
      handler(newConfig) {
        this.settingsForm = {
          apiEndpoint: newConfig.apiEndpoint || '',
          debugMode: newConfig.debugMode || false,
          cacheSize: newConfig.cacheSize || 0,
          theme: this.currentTheme
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['updateAppConfig', 'updateTheme']),
    handleMenuSelect(index) {
      this.$router.push(index)
    },
    showUserInfo() {
      this.userDialogVisible = true
    },
    showSettings() {
      this.settingsDialogVisible = true
    },
    saveSettings: debounce(function() {
      this.updateAppConfig({
        key: 'apiEndpoint',
        value: this.settingsForm.apiEndpoint
      })
      this.updateAppConfig({
        key: 'debugMode',
        value: this.settingsForm.debugMode
      })
      this.updateAppConfig({
        key: 'cacheSize',
        value: this.settingsForm.cacheSize
      })
      this.updateTheme(this.settingsForm.theme)
      this.$message.success('设置保存成功')
      this.settingsDialogVisible = false
    }, 300),
    handleResize: throttle(function() {
      console.log('Window resized:', window.innerWidth, window.innerHeight)
    }, 200)
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.el-container {
  height: 100vh;
}

.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-aside {
  background-color: #545c64;
  color: white;
  height: calc(100vh - 60px);
}

.el-menu-vertical {
  border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  background-color: #545c64;
}

.el-menu-item {
  color: #fff;
}

.el-menu-item:hover {
  background-color: #434a50;
}

.el-menu-item.is-active {
  background-color: #409EFF;
  color: #fff;
}

.el-submenu__title {
  color: #fff;
  background-color: #545c64;
}

.el-submenu__title:hover {
  background-color: #434a50;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

/* Element UI 主题覆盖 */
.el-dialog__header {
  background-color: #409EFF;
  color: white;
  padding: 20px;
}

.el-dialog__title {
  color: white;
}

.el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.el-descriptions__label {
  font-weight: bold;
  background-color: #f5f7fa;
}

.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-aside {
    width: 64px !important;
  }
  
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 64px;
  }
  
  .el-submenu__title span {
    display: none;
  }
  
  .el-menu-item span {
    display: none;
  }
  
  .el-header h1 {
    font-size: 18px;
  }
  
  .el-button {
    padding: 8px 12px;
    font-size: 12px;
  }
}

/* 深色主题支持 */
.dark-theme .el-aside {
  background-color: #2d2d2d;
}

.dark-theme .el-menu {
  background-color: #2d2d2d;
}

.dark-theme .el-menu-item:hover {
  background-color: #1a1a1a;
}

.dark-theme .el-submenu__title {
  background-color: #2d2d2d;
}

.dark-theme .el-submenu__title:hover {
  background-color: #1a1a1a;
}

.dark-theme .el-main {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-theme .el-descriptions__label {
  background-color: #2d2d2d;
  color: #ffffff;
}

.dark-theme .el-descriptions__content {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>