
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/Alumnos',
        name: 'Alumnos',
        component: () => import('../views/Alumnos/ListaAlumnos.vue')
    }
],

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router