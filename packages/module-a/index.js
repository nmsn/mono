import Page1 from './components/Page1.vue';
import Page2 from './components/Page2.vue';
import Page3 from './components/Page3.vue';

export const routes = [
  {
    path: '/module-a/page1',
    name: 'ModuleAPage1',
    component: Page1
  },
  {
    path: '/module-a/page2',
    name: 'ModuleAPage2',
    component: Page2
  },
  {
    path: '/module-a/page3',
    name: 'ModuleAPage3',
    component: Page3
  }
];

export default {
  name: 'ModuleA',
  routes
};