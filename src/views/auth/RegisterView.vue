<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()
const visible = ref(false)
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
              <v-form fast-fail @submit.prevent>
                <v-text-field
                  density="compact"
                  placeholder="Firstname"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  density="compact"
                  placeholder="Lastname"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  density="compact"
                  placeholder="Email address"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Enter your password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Confirm your password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn
                  class="mt-2 color-primary"
                  type="submit"
                  prepend-icon="mdi-account-plus"
                  block
                  color="deep-orange-darken-2"
                  variant="outlined"
                  >Register</v-btn
                >
              </v-form>

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
