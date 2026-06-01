import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('../components/AppLayout.vue'), // ← Tu layout principal
    meta: { requiresAuth: true },
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('../Views/Home/Home.vue')
      },
      {
        path: '/teachers',
        name: 'Teachers',
        component: () => import('../Views/Teachers/TeachersList.vue')
      },
      {
        path: '/subjects',
        name: 'Materias',
        component: () => import('../Views/Subjects/SubjectList.vue')
      },
      {
        path: '/tests',
        name: 'Examenes',
        component: () => import('../Views/Results/ResultsList.vue')
      },
      {
        path: '/evaluations',
        name: 'Evaluaciones',
        component: () => import('../Views/Evaluations/EvaluationsList.vue')
      },
      {
        path: '/games',
        name: 'Games',
        component: () => import('../Views/Games/GamesList.vue')
      },
      {
        path: '/game/:id',
        name: 'GamePlayer',
        component: () => import('../Views/Games/GamePlayer.vue')
      },
      {
        path: '/profiles',
        name: 'Profiles',
        component: () => import('../Views/Profiles/ProfileList.vue')
      },
      {
        path: '/profiles/:id',
        name: 'StudentProfile',
        component: () =>
          import('../Views/Profiles/StudentProfile.vue')
      },
      {
        path: '/Students',
        name: 'Students',
        component: () => import('../Views/Students/StudentList.vue')
      },
      {
        path: '/achievements',
        name: 'Achievements',
        component: () => import('../Views/Achievements/AchievementsList.vue')
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: () =>
          import('../Views/Ranking/RankingList.vue')
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../Views/Dashboard/Dashboard.vue')
      },
      {
        path: '/analytics',
        name: 'Analytics',
        component: () => import('../Views/Analytics/AnalyticsDashboard.vue')
      },
      {
        path: '/talent-map',
        name: 'TalentMap',
        component: () => import('../Views/Talent/TalentMap.vue')
      },
      {
        path: '/recommendations',
        name: 'Recommendations',
        component: () =>
          import('../Views/Recommendations/RecommendationsList.vue')
      },
      {
        path: '/badges',
        name: 'Badges',
        component: () =>
          import('../Views/Badges/BadgesList.vue')
      },
      {
        path: '/missions',
        name: 'Missions',
        component: () =>
          import('../Views/Missions/MissionsList.vue')
      },
      {
        path: '/seasons',
        name: 'Seasons',
        component: () =>
          import('../Views/Seasons/SeasonsList.vue')
      },
      {
        path: '/report/student',
        name: 'StudentReport',
        component: () => import('../Views/Reports/StudentReport.vue')
      },
      {
        path: '/report/group',
        name: 'GroupReport',
        component: () => import('../Views/Reports/GroupReport.vue')
      },
      {
        path: '/report/competencies',
        name: 'CompetencyReport',
        component: () => import('../Views/Reports/CompetencyReport.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ==================== GUARD DE SEGURIDAD ====================
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Cargar usuario si existe (persistencia)
  if (!authStore.isAuthenticated) {
    authStore.loadUser()
  }

  const isAuth = authStore.isAuthenticated

  // Si la ruta requiere autenticación y no está logueado → redirigir a login
  if (to.meta.requiresAuth && !isAuth) {
    next('/login')
    return
  }

  // Si ya está logueado y va a /login → redirigir al dashboard
  if (to.path === '/login' && isAuth) {
    next('/')
    return
  }

  next()
})

export default router