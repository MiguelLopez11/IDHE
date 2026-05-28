import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../components/PublicLayout.vue'
import AppLayout from '../components/AppLayout.vue'

import Landing from '../components/LadingPage.vue'
import Login from '../components/Login.vue'
import path from 'path'

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
      { path: '/Login', component: () => import('../components/Login.vue') },
      { path: '/Register', component: () => import('../components/Register.vue') },
    ],
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '/Students', component: () => import('../Views/Students/StudentList.vue') },
      { path: '/Home', component: () => import('../Views/Home/Home.vue') },
      { path: '/Teachers', component: () => import('../Views/Teachers/TeachersList.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router