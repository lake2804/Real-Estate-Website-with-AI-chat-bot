import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Products from '../pages/products/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('@/pages/buy.vue'), // Trang mua nhà
  },
  {
    path: '/rent',
    name: 'Rent',
    component: () => import('@/pages/rent.vue'), // Trang thuê nhà
  },
  {
    path: '/buy/:id',
    name: 'BuyDetail',
    component: () => import('@/pages/buy/[id].vue'), // Chi tiết mua nhà
  },
  {
    path: '/rent/:id',
    name: 'RentDetail',
    component: () => import('@/pages/rent/[id].vue'), // Chi tiết thuê nhà
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;