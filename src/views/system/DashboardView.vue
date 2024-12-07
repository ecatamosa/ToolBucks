<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useTheme } from 'vuetify';

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
  
  const colors = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
  ]
  const slides = [
  'images/slide1.png',
  'images/slide2.png',
  'images/slide3.png',
  'images/slide4.png',
  'images/slide5.png',
];
const activeSlide = ref(0);

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
      <v-btn text color="white">
        Category   
    <v-btn variant="plain">
      <v-icon icon="mdi-chevron-down"></v-icon>

      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="i in 5" :key="i" link>
            <v-list-item-title>Item {{ i }}</v-list-item-title>
            <template v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
              <v-list>
                <v-list-item v-for="j in 5" :key="j" link>
                  <v-list-item-title>Item {{ i }} - {{ j }}</v-list-item-title>
                  <template v-slot:append>
                    <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                  </template>

                  <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                    <v-list>
                      <v-list-item v-for="k in 5" :key="k" link>
                        <v-list-item-title>Item {{ i }} - {{ j }} - {{ k }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  
      </v-btn>
      <v-btn text color="white">Tools</v-btn>
      <v-btn text color="white">Rentals</v-btn>
      <v-btn text color="white">About</v-btn>
      <v-btn text color="white">Contact</v-btn>
    </v-row>

    <!-- Spacer to push the login button to the right -->
    <v-spacer></v-spacer>

    <!-- Right: Login Button -->
    
    <v-spacer></v-spacer>
    
      <RouterLink class="text-decoration-none text-orange" to="/login"><v-btn  text color="amber-darken-3" class="mr-4" prepend-icon="mdi-account" variant="plain">Login</v-btn></RouterLink>
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
          <v-btn color="orange-darken-3" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>



      <!-- Main Content -->
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">

      <v-carousel
    height="637"
    :show-arrows="false"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item v-for="(slide, index) in slides" :key="index">
        <v-img :src="slide" alt="Slide Image" cover></v-img>
      </v-carousel-item>
  </v-carousel>


    </v-main>



  </v-layout>
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
