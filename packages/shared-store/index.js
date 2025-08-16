// 简化的共享状态管理
// 在组件导入架构下，直接提供基础的状态管理功能

export const sharedState = {
  // 共享的应用配置
  appConfig: {
    theme: 'light',
    language: 'zh-CN',
    sidebarCollapsed: false
  },
  // 共享的用户信息
  user: {
    id: null,
    name: '',
    avatar: '',
    permissions: []
  }
}

export const sharedMutations = {
  SET_THEME(state, theme) {
    state.appConfig.theme = theme
  },
  SET_LANGUAGE(state, language) {
    state.appConfig.language = language
  },
  TOGGLE_SIDEBAR(state) {
    state.appConfig.sidebarCollapsed = !state.appConfig.sidebarCollapsed
  },
  SET_USER(state, user) {
    state.user = { ...state.user, ...user }
  },
  CLEAR_USER(state) {
    state.user = {
      id: null,
      name: '',
      avatar: '',
      permissions: []
    }
  }
}

export const sharedActions = {
  updateTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  updateLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  login({ commit }, userData) {
    commit('SET_USER', userData)
  },
  logout({ commit }) {
    commit('CLEAR_USER')
  }
}

// 导出简化的 store 模块
export default {
  namespaced: true,
  state: sharedState,
  mutations: sharedMutations,
  actions: sharedActions
}