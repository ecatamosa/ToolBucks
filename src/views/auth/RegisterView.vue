<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<template>
  <AppLayout>
    <template #content>
      <RegisterForm></RegisterForm>
    </template>
  </AppLayout>
</template>
