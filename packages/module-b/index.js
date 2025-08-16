// 模块路由配置
const routes = [
  {
    path: '/module-b',
    redirect: '/module-b/dashboard'
  },
  {
    path: '/module-b/dashboard',
    name: 'ModuleBDashboard',
    component: () => import('./components/Dashboard.vue'),
    meta: {
      title: '模块B - 仪表板',
      module: 'module-b'
    }
  },
  {
    path: '/module-b/profile',
    name: 'ModuleBProfile',
    component: () => import('./components/Profile.vue'),
    meta: {
      title: '模块B - 个人资料',
      module: 'module-b'
    }
  },
  {
    path: '/module-b/settings',
    name: 'ModuleBSettings',
    component: () => import('./components/Settings.vue'),
    meta: {
      title: '模块B - 设置',
      module: 'module-b'
    }
  }
];

// 模块特定的 Vuex store 模块
const store = {
  namespaced: true,
  state: {
    moduleBData: {
      userProfile: {
        name: '',
        email: '',
        avatar: ''
      },
      settings: {
        theme: 'light',
        language: 'zh-CN',
        notifications: true
      },
      dashboardData: {
        stats: [],
        charts: [],
        loading: false
      }
    }
  },
  getters: {
    getUserProfile: state => state.moduleBData.userProfile,
    getSettings: state => state.moduleBData.settings,
    getDashboardData: state => state.moduleBData.dashboardData,
    isDashboardLoading: state => state.moduleBData.dashboardData.loading
  },
  mutations: {
    SET_USER_PROFILE(state, profile) {
      state.moduleBData.userProfile = { ...state.moduleBData.userProfile, ...profile };
    },
    SET_SETTINGS(state, settings) {
      state.moduleBData.settings = { ...state.moduleBData.settings, ...settings };
    },
    SET_DASHBOARD_DATA(state, data) {
      state.moduleBData.dashboardData = { ...state.moduleBData.dashboardData, ...data };
    },
    SET_DASHBOARD_LOADING(state, loading) {
      state.moduleBData.dashboardData.loading = loading;
    }
  },
  actions: {
    updateUserProfile({ commit }, profile) {
      commit('SET_USER_PROFILE', profile);
    },
    updateSettings({ commit }, settings) {
      commit('SET_SETTINGS', settings);
    },
    async fetchDashboardData({ commit }) {
      commit('SET_DASHBOARD_LOADING', true);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
          stats: [
            { label: '总用户', value: 1234 },
            { label: '活跃用户', value: 567 },
            { label: '新增用户', value: 89 }
          ],
          charts: [
            { name: '用户增长', data: [10, 20, 30, 40, 50] },
            { name: '活跃度', data: [5, 15, 25, 35, 45] }
          ]
        };
        commit('SET_DASHBOARD_DATA', mockData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        commit('SET_DASHBOARD_LOADING', false);
      }
    }
  }
};

// 模块配置
const config = {
  name: 'module-b',
  version: '1.0.0',
  description: '模块B - 用户管理模块',
  dependencies: ['shared-store'],
  permissions: ['module-b:read', 'module-b:write']
};

// CommonJS 导出
module.exports = {
  routes,
  store,
  config
};