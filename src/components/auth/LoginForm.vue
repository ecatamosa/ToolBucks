<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const isPasswordVisible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onLogin = () => {
  //alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
  if (valid) 
  onLogin()
  })
}
</script>

<template>
  <v-form ref="refVForm"  @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      label="Email"
      
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordVisible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      label="Password"
      
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
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
</template>
