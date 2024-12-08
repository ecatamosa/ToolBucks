<script setup>
import { ref } from 'vue';


const isDrawerOpen = ref(false);

// Functions to handle mouse events
const handleMouseEnter = () => {
  isDrawerOpen.value = true;
};

const handleMouseLeave = () => {
  isDrawerOpen.value = false;
};

// dummy User 
const user = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
  }
</script>

<template>

    <!-- Hover area on the left -->
    <div 
      class="hover-area" 
      @mouseenter="handleMouseEnter"
    ></div>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      class="surface-variant"
      theme="dark"
      temporary
      v-model="isDrawerOpen"
      @mouseleave="handleMouseLeave"
      width="230"
    >
      <v-list density="compact" nav>
        <v-menu
        rounded
      >

        <!-- Avatar Button -->
        <template v-slot:activator="{ props }">
        <v-row class="align-center my-2 ms-1">
         <v-btn icon v-bind="props">
           <v-avatar
           color="brown"
           size="large"
            >
          <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>

    <!-- Name to the right of the avatar -->
    <v-list-item-title class="ml-2 text-white">
      {{ user.fullName }}
    </v-list-item-title>
  </v-row>
</template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Edit Account
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
        
      <v-divider class="mt-3"></v-divider>

        <v-list-item class="mt-2" prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
        <v-list-item prepend-icon="mdi-hand-coin" title="My Rentals" value="users"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <RouterLink class="text-decoration-none" to="/login">
            <v-btn color="orange-darken-3" block>Logout</v-btn>
          </RouterLink>
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