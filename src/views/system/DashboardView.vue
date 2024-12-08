<script setup>
import SideNavigation from '@/components/navigation/SideNavigation.vue';
import { RouterLink } from 'vue-router';


  const slides = [
  'images/slide1.png',
  'images/slide2.png',
  'images/slide3.png',
  'images/slide4.png',
  'images/slide5.png',
];


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
      <v-btn text color="white">All Tools</v-btn>
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

  <SideNavigation></SideNavigation>



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

  



