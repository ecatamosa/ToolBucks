<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <h1>Vue Practice</h1>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto"   image="/images/bg-card.jpg" elevation="20 ">
            <v-card-title class="text-center pt-5 justify-center" >
              <v-img src="/images/logo.jpg" :width="mobile ? '75%' :'25%'"></v-img>
              <h2 class="font-weight-black">Login</h2>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider></v-divider>
              <v-form fast-fail @submit.prevent>
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                <v-btn
                  class="mt-2"
                  type="submit"
                  prepend-icon="mdi-login"
                  block
                  color="grey-darken-4"
                  >Login</v-btn
                >
              </v-form>
              <v-divider class="my-4"></v-divider>
              <h4 class="text-center">
                Don't have an account?
                <RouterLink class="text-primary" to="/register">Click here to Register!</RouterLink>
              </h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
