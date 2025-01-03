<template>
    <v-container fluid>
      <v-row class="mt-5">
        <v-col cols="12">
          <h1 class="text-h3 text-center">Contact Us</h1>
          <v-divider></v-divider>
          <p class="text-center">
            We’d love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.
          </p>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12" md="6" class="mx-auto">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
            <v-textarea
              v-model="message"
              label="Message"
              :rules="[rules.required]"
              required
            ></v-textarea>
            <v-btn color="primary" @click="submit" :disabled="!valid">Send Message</v-btn>
          </v-form>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12" md="6">
          <h2 class="text-h4">Our Contact Information</h2>
          <ul>
            <li>Email: support@toolrental.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Tool Lane, City, State, ZIP</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const valid = ref(false)
  const name = ref('')
  const email = ref('')
  const message = ref('')
  
  const rules = {
    required: value => !!value || 'Required.',
    email: value => {
      const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
      return pattern.test(value) || 'E-mail must be valid.'
    },
  }
  
  const submit = () => {
    // Here you would typically handle form submission, e.g., send the data to your backend
    console.log('Form submitted with:', { name: name.value, email: email.value, message: message.value });
    // Reset form fields
    name.value = ''
    email.value = ''
    message.value = ''
  }
  </script>
  
  <style scoped>
  h1, h2 {
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 15px;
  }
  </style>