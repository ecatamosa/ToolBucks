<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="grey-darken-4"
        >x
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <h1>Vue Practice</h1>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <v-card class="mx-auto" prepend-icon="mdi-account" subtitle="Login Form" width="400" elevation="20">
                <template v-slot:title>
                  <span class="font-weight-black">Borrowing Tools</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Firstname" variant="outlined"></v-text-field>

                    <v-text-field label="Lastname" variant="outlined"></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Password Confirmation"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" prepend-icon="mdi-account" block>Submit</v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center">Already have an account? <RouterLink class="text-primary" to="/login">Click here to Login</RouterLink> </h5>

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer color="grey-darken-4" border app>2024 - Vue Practice</v-footer>
    </v-app>
  </v-responsive>
</template>
