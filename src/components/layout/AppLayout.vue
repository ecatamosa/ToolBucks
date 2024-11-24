<script setup>
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <v-responsive class="rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="grey-darken-4">
        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          thick
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        
          <slot name="content"></slot>
        
      </v-main>

      <v-footer class="font-weight-black" color="grey-darken-4" border app
        >© 2024 - ToolBucks</v-footer
      >
    </v-app>
  </v-responsive>
</template>
