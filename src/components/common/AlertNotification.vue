<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  successMessage: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
});
</script>


<template>
    <div>
      <v-alert 
        v-if="successMessage" 
        title="Success!" 
        type="success" 
        variant="tonal" 
        density="compact" 
        border="top" 
        closable
      >
        {{ successMessage }}
      </v-alert>
  
      <v-alert 
        v-if="errorMessage" 
        title="Ooops!" 
        type="error" 
        variant="tonal" 
        density="compact" 
        border="top" 
        closable
      >
        {{ errorMessage }}
      </v-alert>
    </div>
  </template>