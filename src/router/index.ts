import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/users/create',
      name: 'create-user',
      component: () => import('@/pages/CreateUserPage.vue'),
    },
  ],
})

export default router
