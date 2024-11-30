<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { useDisplay } from 'vuetify'


const { mobile } = useDisplay()

</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto text-center" elevation="20">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/images/tblogo.png"
                :width="mobile ? '85%' : '75%'"
              ></v-img>
              <h2 class="font-weight-black">Register</h2>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
             <RegisterForm></RegisterForm>

              <v-divider class="my-5"></v-divider>

              <h5 class="text-center">
                Already have an account?
                <RouterLink class="text-deep-orange-darken-2" to="/login"
                  >Click here to Login</RouterLink
                >
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row></template
    >
  </AppLayout>
</template>
