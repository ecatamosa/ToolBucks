<script setup>
import { ref } from 'vue';

const passwordConfirmation = ref('');
const visible = ref(false);
const visible2 = ref(false);

const rules = {
  email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
  length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
  password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
  required: v => !!v || 'This field is required',
};

  const form = ref()

  const agreement = ref(false)
  const dialog = ref(false)
  const email = ref()
  const isValid = ref(false)
  const isLoading = ref(false)
  const password = ref()
  const first_name = ref()
  const last_name = ref()
  const phone_number = ref()
</script>

<template>
  <v-card
    class="mx-auto mt-16 mb-10"
    style="max-width: 450px;"
  >
    <v-toolbar
      color="orange"
      cards
      dark
      flat
    >
      <v-btn icon>
        <RouterLink to="/">
          <v-icon color="black">mdi-arrow-left</v-icon>
        </RouterLink>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        Sign up
      </v-card-title>
      
    </v-toolbar>
    <v-form
      ref="form"
      v-model="isValid"
      class="pa-4 pt-6"
    >
    
    <div style="display: flex; gap: 16px;"> <!-- Adjust gap as needed -->
    <v-text-field
      v-model="first_name"
      color="orange"
      label="First Name"
      variant="outlined"
    ></v-text-field>

    <v-text-field
      v-model="last_name"
      color="orange"
      label="Last Name"
      variant="outlined"
    ></v-text-field>
  </div>
      <v-text-field
        v-model="phone_number"
        color="orange"
        label="Phone number"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        color="orange"
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        variant="outlined"
      ></v-text-field>
      
      <v-text-field
    v-model="password"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    @click:append-inner="visible = !visible"
    :rules="[rules.password, rules.length(12)]"
    color="orange"
    counter="12"
    label="Password"
    variant="outlined"
  ></v-text-field>

  <v-text-field
    v-model="passwordConfirmation"
    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible2 ? 'text' : 'password'"
    @click:append-inner="visible2 = !visible2"
    color="orange"
    label="Password Confirmation"
    variant="outlined"
  ></v-text-field>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="orange"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Terms of Service</a>
          &nbsp;and&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Privacy Policy</a>*
        </template>
      </v-checkbox>
    </v-form>
    <v-card-actions>
      <v-btn
        variant="text"
        @click="form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isValid"
        :loading="isLoading"
        color="orange-accent-4"
      >
        Submit
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3">
          Legal
        </v-card-title>
        <v-card-text>
          Oh ngano gipindot man nimo ni? wa pani sulod oy! pagkakutihan ba lang gyud. pag code na diha aron mahuman natang tanan tsk2
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            variant="text"
            @click="agreement = false, dialog = false"
          >
            Confirm
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            variant="tonal"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>