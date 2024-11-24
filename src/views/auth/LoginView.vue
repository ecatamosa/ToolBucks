<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue';

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" elevation="0" max-width="600">
            <v-card-title class="text-center">
              <v-img class="mx-auto" src="/images/tblogo.png" :width="mobile ? '80%' : '50%'"></v-img>
              <h3 class="font-weight-bold">Login Form</h3>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider></v-divider>

              <LoginForm></LoginForm>
              
              <v-divider class="my-4"></v-divider>
              <h5 class="text-center">
                Don't have an account?
                <RouterLink class="text-grey text-decoration-none" to="/register">Click here to Register!</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
