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
  <v-layout>
    <v-app-bar>
    <!-- Left: Logo -->
    <v-img
      src="images/translogotext.png"
      alt="Tool Rental Logo"
      max-height="20"
      contain
      class="ml-4"
    ></v-img>

    <!-- Spacer to push the categories to the center -->
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    
    <!-- Center: Categories -->
    <v-row class="justify-center" align="center" dense>
      <v-btn text color="white">Home</v-btn>
      <v-btn text color="white">Tools</v-btn>
      <v-btn text color="white">Rentals</v-btn>
      <v-btn text color="white">About</v-btn>
      <v-btn text color="white">Contact</v-btn>
    </v-row>

    <!-- Spacer to push the login button to the right -->
    <v-spacer></v-spacer>

    <!-- Right: Login Button -->
    
    <v-spacer></v-spacer>
    <v-btn  text color="amber-darken-3" class="mr-4" prepend-icon="mdi-account" variant="plain">Login</v-btn>
  </v-app-bar>

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
      width="250"
    >
      <v-list density="compact" nav>
        <v-menu
        min-width="200px"
        rounded
      >
        <!-- <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              color="brown"
              size="large"
            >
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
          <v-list-item-title>John Doe</v-list-item-title>
        </template> -->

        <template v-slot:activator="{ props }">
  <v-row class="align-center my-2 ms-1">
    <!-- Avatar Button -->
    <v-btn icon>
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
              <h3>{{ user.fullName }}</h3>
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
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Disconnect
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
          <v-btn color="orange-darken-3" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<style scoped>
/* Hover area for triggering drawer */
.hover-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px; /* Adjust width for sensitivity */
  height: 100vh;
  background-color: transparent; /* Make it invisible */
  z-index: 1000; /* Ensure it's above other content */
}

.v-navigation-drawer {
  transition: transform 0.3s ease-in-out;
}
</style>
