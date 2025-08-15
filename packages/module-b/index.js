import Dashboard from './components/Dashboard.vue';
import Settings from './components/Settings.vue';
import Profile from './components/Profile.vue';

export const routes = [
  {
    path: '/module-b/dashboard',
    name: 'ModuleBDashboard',
    component: Dashboard
  },
  {
    path: '/module-b/settings',
    name: 'ModuleBSettings',
    component: Settings
  },
  {
    path: '/module-b/profile',
    name: 'ModuleBProfile',
    component: Profile
  }
];

export default {
  name: 'ModuleB',
  routes
};