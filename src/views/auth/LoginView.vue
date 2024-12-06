<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<template>
  <AppLayout>
    <template #content>
      <LoginForm></LoginForm>      
    </template>
  </AppLayout>
</template>
