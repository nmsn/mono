import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块的 store
let moduleAStore = null
let moduleBStore = null

try {
  const moduleA = require('@mono/module-a')
  moduleAStore = moduleA.store
} catch (error) {
  console.warn('Failed to load module-a store:', error)
}

try {
  const moduleB = require('@mono/module-b')
  moduleBStore = moduleB.store
} catch (error) {
  console.warn('Failed to load module-b store:', error)
}

const store = new Vuex.Store({
  state: {
    // 主应用状态
    user: {
      name: 'Admin',
      role: 'administrator'
    },
    appConfig: {
      title: 'Vue2 Monorepo App',
      version: '1.0.0',
      theme: 'light'
    }
  },
  getters: {
    getUser: state => state.user,
    getAppConfig: state => state.appConfig
  },
  mutations: {
    setUser(state, user) {
      state.user = { ...state.user, ...user }
    },
    setAppConfig(state, config) {
      state.appConfig = { ...state.appConfig, ...config }
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user)
    },
    updateAppConfig({ commit }, config) {
      commit('setAppConfig', config)
    }
  },
  modules: {
    ...(moduleAStore && { 'moduleA': moduleAStore }),
    ...(moduleBStore && { 'moduleB': moduleBStore })
  }
})

export default store