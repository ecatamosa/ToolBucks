<template>
    <v-form fast-fail @submit.prevent>
                <v-text-field label="Firstname" variant="outlined"></v-text-field>

                <v-text-field label="Lastname" variant="outlined"></v-text-field>

                <v-text-field label="Email address" type="email" variant="outlined"></v-text-field>

                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password Confirmation"
                  type="password"
                  variant="outlined"
                ></v-text-field>

                <v-btn
                  class="mt-2"
                  height="48"
                  type="submit"
                  prepend-icon="mdi-account-plus"
                  block
                  color="orange"
                  variant="outlined"
                  >Register</v-btn
                >
              </v-form>
</template>