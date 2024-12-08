import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LandingPage from '@/views/system/LandingPage.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import { isAuthenticated } from '@/utils/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Default route
      name: 'landingpage',
      component: LandingPage,
      meta: { requiresAuth: false}
    },
    
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false}
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true}
    },
    
  ],
})



export default router
