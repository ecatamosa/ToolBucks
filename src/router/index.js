import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LandingPage from '@/views/system/LandingPage.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import { isAuthenticated } from '@/utils/supabase'
import NotFoundView from '@/views/system/error/NotFoundView.vue'
import Cart from '@/views/system/Cart.vue'
import Rentals from '@/views/system/Rentals.vue'
import MyAccount from '@/views/system/MyAccount.vue'
import EditprofileView from '@/views/system/EditprofileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Default route

      name: 'landingpage',
      component: LandingPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: Rentals,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      meta: { requiresAuth: true },
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditprofileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

// Navigation Guard
router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated() // Check login status once

  // If user is logged in, prevent access to login and register pages
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    return { name: 'dashboard' } // Redirect to the dashboard
  }

  // Allow logged-in users to access the home page
  if (to.name === 'landingpage' && isLoggedIn) {
    return { name: 'dashboard' } // Redirect to the dashboard if logged in
  }

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' } // If not logged in, redirect to the login page
  }
})

export default router
