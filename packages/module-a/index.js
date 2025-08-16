// 模块路由配置
const routes = [
  {
    path: '/module-a',
    redirect: '/module-a/page1'
  },
  {
    path: '/module-a/page1',
    name: 'ModuleAPage1',
    component: () => import('./components/Page1.vue'),
    meta: {
      title: '模块A - 页面1',
      module: 'module-a'
    }
  },
  {
    path: '/module-a/page2',
    name: 'ModuleAPage2',
    component: () => import('./components/Page2.vue'),
    meta: {
      title: '模块A - 页面2',
      module: 'module-a'
    }
  },
  {
    path: '/module-a/page3',
    name: 'ModuleAPage3',
    component: () => import('./components/Page3.vue'),
    meta: {
      title: '模块A - 页面3',
      module: 'module-a'
    }
  }
];

// 模块特定的 Vuex store 模块
const store = {
  namespaced: true,
  state: {
    moduleAData: {
      currentPage: 'page1',
      formData: {},
      tableData: [],
      loading: false
    }
  },
  getters: {
    getCurrentPage: state => state.moduleAData.currentPage,
    getFormData: state => state.moduleAData.formData,
    getTableData: state => state.moduleAData.tableData,
    isLoading: state => state.moduleAData.loading
  },
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.moduleAData.currentPage = page;
    },
    SET_FORM_DATA(state, data) {
      state.moduleAData.formData = { ...state.moduleAData.formData, ...data };
    },
    SET_TABLE_DATA(state, data) {
      state.moduleAData.tableData = data;
    },
    SET_LOADING(state, loading) {
      state.moduleAData.loading = loading;
    }
  },
  actions: {
    updateCurrentPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },
    updateFormData({ commit }, data) {
      commit('SET_FORM_DATA', data);
    },
    async fetchTableData({ commit }) {
      commit('SET_LOADING', true);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = [
          { id: 1, name: '数据1', status: '正常' },
          { id: 2, name: '数据2', status: '异常' }
        ];
        commit('SET_TABLE_DATA', mockData);
      } catch (error) {
        console.error('Failed to fetch table data:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};

// 模块配置
const config = {
  name: 'module-a',
  version: '1.0.0',
  description: '模块A - 业务模块示例',
  dependencies: ['shared-store'],
  permissions: ['module-a:read', 'module-a:write']
};

// CommonJS 导出
module.exports = {
  routes,
  store,
  config
};