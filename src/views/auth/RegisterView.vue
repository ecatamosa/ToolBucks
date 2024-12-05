<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue';

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <RegisterForm></RegisterForm> 
      </template>
  </AppLayout>
</template>
