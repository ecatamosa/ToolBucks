<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import RegisterForm from '@/components/auth/RegisterForm.vue';

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto text-center" elevation="20">
            <v-card-title class="text-center">
              <v-img class="mx-auto" src="/images/tblogo.png" :width="mobile ? '80%' : '50%'"></v-img>
              <h3 class="font-weight-bold">Register Form</h3>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              
              <RegisterForm></RegisterForm> 
                           
              <v-divider class="my-5"></v-divider>

              <h5 class="text-center">
                Already have an account?
                <RouterLink class="text-grey text-decoration-none" to="/login">Click here to Login</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
      </template>
  </AppLayout>
</template>
