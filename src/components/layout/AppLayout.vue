<script setup>
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <v-responsive >
    <v-app class="pt-7 " :theme="theme">
      

      <v-main>
        
          <slot name="content"></slot>
        
      </v-main>

      
      
    </v-app>
  </v-responsive>
</template>
