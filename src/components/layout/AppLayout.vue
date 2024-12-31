<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { isAuthenticated } from '@/utils/supabase';

const theme = ref(localStorage.getItem('theme') ?? 'light')

// Load Variables
const isLoggedIn = ref(false)

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()

 
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
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
