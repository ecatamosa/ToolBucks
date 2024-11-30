<script setup>
import { requiredValidator, emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault ={
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

const isPasswordVisible = ref(false)
const isPasswordConfrimVisible = ref(false)
const refVForm = ref()


const onRegister = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
  if (valid) 
  onRegister()
  })
}
</script>

<template>
  <v-form ref="refVForm"  @submit.prevent="onFormSubmit">
    <v-text-field v-model="formData.firstname" density="compact" placeholder="Firstname" variant="outlined" :rules="[requiredValidator]"></v-text-field>

    <v-text-field  v-model="formData.lastname" density="compact" placeholder="Lastname" variant="outlined" :rules="[requiredValidator]"></v-text-field>

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
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordVisible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :rules="[requiredValidator, passwordValidator]"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-text-field
     v-model="formData.password_confirmation"
      :append-inner-icon="isPasswordConfrimVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordConfrimVisible ? 'text' : 'password'"
      density="compact"
      placeholder="Confirm your password"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[requiredValidator, confirmedValidator(formData.password_confirmation, formData.password )]"
      variant="outlined"
      @click:append-inner="isPasswordConfrimVisible = !isPasswordConfrimVisible"
    ></v-text-field>

    <v-btn
      class="mt-2"
      type="submit"
      prepend-icon="mdi-account-plus"
      block
      color="deep-orange-darken-2"
      variant="outlined"
      >Register</v-btn
    >
  </v-form>
</template>
