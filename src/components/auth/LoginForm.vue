<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { supabase, formActionDefault } from '@/utils/supabase';
import AlertNotification from '../common/AlertNotification.vue';

const router = useRouter();

const visible = ref(false); // Use consistent naming for password visibility
const refVForm = ref();

const formDataDefault = {
  email: '',
  password: '',
  remember: false,
};

const formAction = ref({ ...formActionDefault });
const formData = ref({ ...formDataDefault });

const onLogin = async () => {
  formAction.value.formProcess = true;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (error) {
      // Handle error (e.g., show an alert)
      console.error('Login error:', error.message);
      formAction.value.formErrorMessage = "Login failed. Check your credentials and try again.";

      // Clear the error message after 3 seconds
      setTimeout(() => {
        formAction.value.formErrorMessage = ""; // Clear the message
      }, 2000);
    } else {
      // Handle successful login (e.g., redirect to dashboard)
      console.log('Login successful:', data);
      formAction.value.formSuccessMessage = "Access granted! Redirecting now...";

      // Delay the redirect for 5 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred. Please try again.');
  }
  formAction.value.formProcess = false;
};

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin();
  });
};
</script>

<template>
  <div>
    <v-img
      class="mx-auto mb-6"
      max-width="220"
      src="/public/images/newloginlogo.png"
    ></v-img>

    <!-- Form Holder -->
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >

      <AlertNotification 
        :success-message="formAction.formSuccessMessage" 
       
