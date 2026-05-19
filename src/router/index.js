import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../components/PublicLayout.vue'
import AppLayout from '../components/AppLayout.vue'

import Landing from '../components/LadingPage.vue'
import Login from '../components/Login.vue'
import path from 'path'
// import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: Landing,
      },
    ],
  },
  { path: '/Login', component: () => import('../components/Login.vue') },
  { path: '/Register', component: () => import('../components/Register.vue') },
  { path: '/Students', component: () => import('../Views/Students/StudentList.vue') },
  {
    path: '/app',
    component: AppLayout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router