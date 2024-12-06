<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" elevation="20" max-width="600">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/images/tblogo.png"
                :width="mobile ? '85%' : '75%'"
              ></v-img>
              <h2 class="font-weight-bold">Login</h2>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider></v-divider>

              <LoginForm></LoginForm>

              <v-divider class="my-4"></v-divider>
              <h4 class="text-center">
                Don't have an account?
                <RouterLink class="text-deep-orange-darken-2" to="/register"
                  >Click here to Register!</RouterLink
                >
              </h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
