<script setup>
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

</script>

<template>
  <v-responsive >
    <v-app class="pt-7" >
      

      <v-main>
        
          <slot name="content"></slot>
        
      </v-main>

      
      
    </v-app>
  </v-responsive>
</template>
