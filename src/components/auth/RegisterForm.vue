<script setup>
import { requiredValidator, confirmedValidator, emailValidator, passwordValidator } from '@/utils/validators';
import { ref } from 'vue';

const passwordConfirmation = ref('');
const visible = ref(false);
const visible2 = ref(false);

const formDataDefault = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  agreement: false,
};

const formData = ref({ ...formDataDefault });

const revForm = ref()


  const agreement = ref(false)
  const agreement2 =ref(false)
  const dialog = ref(false)
  const dialog2 = ref(false)
  const isValid = ref(false)
  const isLoading = ref(false)


const onSubmit = () => {
  // what should i put here to alert and test the submit
  alert(`First Name: ${formData.value.first_name}\n` +
        `Last Name: ${formData.value.last_name}\n` +
        `Phone Number: ${formData.value.phone_number}\n` +
        `Email: ${formData.value.email}\n` +
        `Password: ${formData.value.password}\n` +
        `Agreed to Terms: ${formData.value.agreement}`);
};


const onFormSubmit = () => {
  revForm.value?.validate().then(({valid}) => {
    if (valid) onSubmit() 
  })
}

const resetForm = () => {
  formData.value = { ...formDataDefault }; // Reset formData to default values
  isValid.value = false; // Optionally reset the validity state
};
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

    <!-- Form Section -->
    <v-form ref="revForm" fast-fail @submit.prevent="onFormSubmit"
      
      v-model="isValid"
      class="pa-4 pt-6"
    >
    
    <div style="display: flex; gap: 16px;"> <!-- Adjust gap as needed -->
    <v-text-field
      :rules="[requiredValidator]"
      v-model="formData.first_name"
      color="orange"
      label="First Name"
      variant="outlined"
    ></v-text-field>

    <v-text-field
      :rules="[requiredValidator]"
      v-model="formData.last_name"
      color="orange"
      label="Last Name"
      variant="outlined"
    ></v-text-field>
  </div>
      <v-text-field
        :rules="[requiredValidator]"
        v-model="formData.phone_number"
        color="orange"
        label="Phone number"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        :rules="[emailValidator,requiredValidator]"
        color="orange"
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        variant="outlined"
      ></v-text-field>
      
      <v-text-field
    v-model="formData.password"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    @click:append-inner="visible = !visible"
    :rules="[requiredValidator,passwordValidator ]"
    color="orange"
    label="Password"
    variant="outlined"
  ></v-text-field>

  <v-text-field
  :rules="[requiredValidator, confirmedValidator(formData.password, formData.password_confirmation) ]"
    v-model="formData.password_confirmation"
    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible2 ? 'text' : 'password'"
    @click:append-inner="visible2 = !visible2"
    color="orange"
    label="Password Confirmation"
    variant="outlined"
  ></v-text-field>
      <v-checkbox
        v-model="formData.agreement"
        :rules="[requiredValidator]"
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
            @click.stop.prevent="dialog2 = true"
          >Privacy Policy</a>*
        </template>
      </v-checkbox>
    
    <v-card-actions>
      <v-btn
        variant="text"
        @click="resetForm"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        :disabled="!isValid"
        :loading="isLoading"
        color="orange-accent-4"
      >
        Submit
      </v-btn>
    </v-card-actions>

    <!-- Dialog1 -->
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3">
          Terms and Conditions
        </v-card-title>
        <v-card-text>
          pre? wala pani sulod pre char2 lang sa ni. tiwas sa diha code pre hahahaha
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
    <!-- End of Dialog1 -->

    <!-- Dialog 2 -->
    <v-dialog
      v-model="dialog2"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3">
          Privacy Policy
        </v-card-title>
        <v-card-text>
          wala pa lage pre hahahahaha
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            variant="text"
            @click="agreement2 = false, dialog2 = false"
          >
            Confirm
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            variant="tonal"
            @click="agreement2 = true, dialog2 = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of Dialog 2 -->

    </v-form>
    <!-- End of Form Section -->
  </v-card>
</template>