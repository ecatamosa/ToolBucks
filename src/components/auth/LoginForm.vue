<template>
    <v-form fast-fail @submit.prevent>
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                <v-checkbox class="py-0" label="Remember password"
                color="orange-darken-1"></v-checkbox>

                <v-btn
                  type="submit"
                  prepend-icon="mdi-login"
                  block
                  variant="outlined"
                  color="orange"
                  height="48"
                  >Login</v-btn
                >
              </v-form>
</template>