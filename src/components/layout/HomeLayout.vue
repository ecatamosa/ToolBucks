<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import SideNavigation from './navigation/SideNavigation.vue';
const props = defineProps({
  showLoginButton: {
    type: Boolean,
    default: true,
  },
  showSideNavigation: {
    type: Boolean,
    default: true,
  },
  showSearchBar: {
    type: Boolean,
    default: true,
  },

});


const slides = [
'images/slide1.png',
'images/slide2.png',
'images/slide3.png',
'images/slide4.png',
'images/slide5.png',
]


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
        
    <v-btn variant="plain">
      Category
      <v-icon class="ml-2" icon="mdi-chevron-down"></v-icon>

      <v-menu open-on-hover activator="parent">
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
  
      
      <v-btn text variant="plain">All Tools</v-btn>
      <v-btn text variant="plain">Rentals</v-btn>
      <v-btn text variant="plain">About</v-btn>
      <v-btn text variant="plain">Contact</v-btn>
    </v-row>

    <!-- Spacer to push the login button to the right -->
    <v-spacer></v-spacer>

    <!-- Right: Login Button -->
    
    <v-spacer></v-spacer>
    
      <RouterLink v-if="showLoginButton" class="text-decoration-none text-orange" to="/login"><v-btn  text color="amber-darken-3" class="mr-4" prepend-icon="mdi-account" variant="plain">Login</v-btn></RouterLink>
      <RouterLink v-if="showSearchBar" class="text-decoration-none text-orange" to=""><v-btn icon="mdi-magnify"  text color="amber-darken-3" class="mr-4"  variant="plain"></v-btn></RouterLink>
      <RouterLink v-if="showSearchBar" class="text-decoration-none text-orange" to=""><v-btn icon="mdi-cart"  text color="amber-darken-3" class="mr-4"   variant="plain"></v-btn></RouterLink>
  </v-app-bar>

  <!-- Side Navigation -->
  <SideNavigation v-if="showSideNavigation" ></SideNavigation>


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

  <v-layout>
    <v-main >
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1>Popular Tools</h1>
          </v-col> 
        </v-row>
      </v-container>
    </v-main>
    </v-layout>
</template>