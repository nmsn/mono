import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

// 动态导入模块路由
const loadModuleRoutes = () => {
  try {
    // 直接从源码导入模块路由配置
    const moduleARoutes = require('@mono/module-a').routes || []
    const moduleBRoutes = require('@mono/module-b').routes || []
    
    return [...moduleARoutes, ...moduleBRoutes]
  } catch (error) {
    console.error('Failed to load module routes:', error)
    return []
  }
}

// 基础路由
const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

// 加载模块路由
const moduleRoutes = loadModuleRoutes()

// 合并所有路由
const routes = [...baseRoutes, ...moduleRoutes]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决 Vue Router 重复导航警告
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}

export default router
