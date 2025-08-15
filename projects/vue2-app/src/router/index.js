import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

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

// 动态加载模块路由
const loadModuleRoutes = async () => {
  try {
    const moduleARoutes = (await import('@mono/module-a')).default.routes || [];
    const moduleBRoutes = (await import('@mono/module-b')).default.routes || [];
    return [...moduleARoutes, ...moduleBRoutes];
  } catch (error) {
    console.error('Failed to load module routes:', error);
    return [];
  }
};

// 初始路由（仅包含基础路由）
let routes = [...baseRoutes];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 在应用启动时动态加载模块路由
loadModuleRoutes().then(moduleRoutes => {
  if (moduleRoutes.length > 0) {
    routes = [...baseRoutes, ...moduleRoutes];
    router.addRoutes(moduleRoutes);
  }
});

export default router