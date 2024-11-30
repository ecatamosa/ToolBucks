<script setup>
import { emailValidator, requiredValidator } from '@/utils/validators'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'
const { mobile } = useDisplay()
const isPasswordvisible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onLogin = () => {
  alert(formData.value)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    //if (valid) onSubmit()
  })
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" elevation="0" max-width="600">
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

              <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
                <v-text-field
                  v-model="formData.email"
                  density="compact"
                  placeholder="Email address"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="[requiredValidator, emailValidator]"
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  :append-inner-icon="isPasswordvisible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="isPasswordvisible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Enter your password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="isPasswordvisible = !isPasswordvisible"
                  :rules="[requiredValidator]"
                ></v-text-field>

                <v-btn
                  class="mt-2"
                  type="submit"
                  prepend-icon="mdi-login"
                  block
                  color="deep-orange-darken-2"
                  variant="outlined"
                  >Login</v-btn
                >
              </v-form>
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
