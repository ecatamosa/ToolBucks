<script setup>
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDrawerOpen = ref(false)

// Functions to handle mouse events
const handleMouseEnter = () => {
  isDrawerOpen.value = true
}

const handleMouseLeave = () => {
  isDrawerOpen.value = false
}

const user = ref()
const error = ref()

const getInitials = (userData) => {
  if (!userData) return ''
  const firstName = userData.first_name || ''
  const lastName = userData.last_name || ''
  return (firstName[0] + (lastName[0] || '')).toUpperCase() // Combine first initials
}

const getFullName = (userData) => {
  if (!userData) return 'Guest'
  return `${userData.first_name || ''} ${userData.last_name || ''}`.trim()
}

onMounted(async () => {
  // Retrieve the session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()
  console.log(session)
  if (sessionError) {
    error.value = sessionError.message
    return
  }

  // If a session exists, retrieve the user
  if (session) {
    const {
      data: { user: loggedInUser },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      error.value = userError.message
    } else {
      user.value = loggedInUser // Store user details
    }
  }
})

// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }

  formAction.value.formProcess = false
  // Redirect to homepage
  router.replace('/login')
}
</script>

<template>
  <!-- Hover area on the left -->
  <div class="hover-area" @mouseenter="handleMouseEnter"></div>

  <!-- Navigation Drawer -->
  <v-navigation-drawer
    class="surface-variant"
    theme="dark"
    temporary
    v-model="isDrawerOpen"
    @mouseleave="handleMouseLeave"
    width="230"
  >
    <!-- Side Navigation Avatar and Lists -->
    <v-list density="compact" nav>
      <v-menu rounded>
        <!-- Avatar Button -->
        <template v-slot:activator="{ props }">
          <v-row class="align-center my-2 ms-1">
            <v-btn icon v-bind="props">
              <v-avatar color="brown" size="large">
                <span class="text-h5">{{ user ? getInitials(user.user_metadata) : '' }}</span>
              </v-avatar>
            </v-btn>

            <v-list-item-title class="ml-2 text-white">
              {{ user ? getFullName(user.user_metadata) : 'Guest' }}
            </v-list-item-title>
          </v-row>
        </template>

        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user ? getInitials(user.user_metadata) : '' }}</span>
              </v-avatar>
              <p class="text-caption mt-1">
                {{ user ? user.email : 'No email available' }}
              </p>
              <v-divider class="my-3"></v-divider>
              <RouterLink class="text-grey" to="/editprofile"><v-btn variant="text" rounded> Edit Account </v-btn></RouterLink>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

      <v-divider class="mt-3"></v-divider>

      <v-list-item
        class="mt-2"
        prepend-icon="mdi-account"
        title="My Account"
        value="account"
        @click="$router.push('/my-account')"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-hand-coin"
        title="My Rentals"
        value="users"
        @click="$router.push('/rentals')"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          color="orange-darken-3"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          block
          >Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style scoped>
/* Hover area for triggering drawer */
.hover-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 100vh;
  background-color: transparent;
  z-index: 1000;
}

.v-navigation-drawer {
  transition: transform 0.3s ease-in-out;
}
</style>
