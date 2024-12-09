<script setup>
import { requiredValidator, confirmedValidator, emailValidator, passwordValidator } from '@/utils/validators';
import { ref } from 'vue';
import { supabase, formActionDefault } from '@/utils/supabase';
import AlertNotification from '../common/AlertNotification.vue';
import { useRouter } from 'vue-router';
import LandingPage from '@/views/system/LandingPage.vue';

const visible = ref(false);
const visible2 = ref(false);

const router = useRouter()

const formDataDefault = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  agreement: false,
};

const formData = ref(
  { ...formDataDefault }
)

const formAction = ref({...formActionDefault});


const refVForm = ref()


  const agreement = ref(false)
  const agreement2 =ref(false)
  const dialog = ref(false)
  const dialog2 = ref(false)


  const onSubmit = async () => {
  formAction.value.formProcess = true;
  formAction.value.formErrorMessage = ''; // Reset messages
  formAction.value.formSuccessMessage = '';

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        phone: formData.value.phone_number, // Ensure this matches
        agreement: true,
        isAdmin : false,
      }
    }
  })

  if (error) {
    console.log(error);
    formAction.value.formErrorMessage = "Registration failed. Try again later.";
    formAction.value.formStatus = error.status

  } else if (data) {
    console.log(data);
    formAction.value.formSuccessMessage = "Registered Successfully! Redirecting...";

    // Can be change to session based redirection(as on video)
    setTimeout(() => {
       router.replace('/dashboard') //change route if dashboardview is created
      }, 2000);
  }

  formAction.value.formProcess = false;
  refVForm.value?.reset()
};


const onFormSubmit = () => {
  refVForm.value?.validate().then(({valid}) => {
    if (valid) onSubmit() 
  })
}

const resetForm = () => {
  formData.value = { ...formDataDefault }; // Reset formData to default values
  formAction.value = { ...formActionDefault }; // Reset formAction as well
};
</script>

<template>
  <v-container fill-height>
      <v-row justify="center" align="center">
        <v-card
        elevation="8"
    class="mx-auto"
    style="max-width: 450px;"
  >

    <!-- Form Header -->
    <v-toolbar
      dark
      flat
    >
    <RouterLink to="/login" class="icon-link ml-2">
      <v-btn icon>
          <v-icon class="hover-icon">mdi-arrow-left</v-icon>
        </v-btn>
      </RouterLink>
      <v-card-title class="text-h6 font-weight-regular ">
        Create Your Account
      </v-card-title>
      
    </v-toolbar>

    <br>

    <!-- Alert Notification -->
    <AlertNotification 
    :success-message="formAction.formSuccessMessage" 
    :error-message="formAction.formErrorMessage"
    ></AlertNotification>

    <!-- Form Section -->
    <v-form ref="refVForm" @submit.prevent="onFormSubmit"
      
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
    <div style="display: flex; flex-direction: column; text-align: left;">
      <span>
        I agree to the&nbsp;
        <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
        &nbsp;and&nbsp;
        <a href="#" @click.stop.prevent="dialog2 = true">Privacy Policy</a>*
      </span>
    </div>
  </template>
</v-checkbox>
    
    <v-card-actions>
      <v-btn
        variant="plain"
        @click="resetForm"
        color="grey"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        :disabled="formAction.formProcess"
        :loading="formAction.formProcess"
        color="orange"
      >
        Submit
      </v-btn>
    </v-card-actions>

    

    <!-- Dialog1 -->
    <v-dialog
    v-model="dialog"
    >
      <v-sheet
    
    border="md"
    class="pa-7 text-white mx-auto"
    color="#141518"
    max-width="400"
  >
  <h4 class="text-h5 font-weight-bold mb-4">Terms of Service</h4>

<p class="mb-8">
  By using our services, you agree to the following terms. We may collect personal data, including your name, email, device information, and usage data through cookies.
</p>

<p class="mb-8">
  Your privacy is important to us. Please review our <a class="text-red-darken-2" href="#">Privacy Policy</a> to understand how we handle your information.
</p>

<p class="mb-8">
  By using our app, you acknowledge that you have read and agreed to these terms. If you have questions, feel free to contact us.
</p>

    <v-btn
      class="text-none text-black mb-4"
      color="orange-darken-2"
      size="x-large"
      variant="flat"
      @click="agreement = true, dialog = false"
      block
    >
      Accept
    </v-btn>

    <v-btn
      class="text-none text-black"
      color="orange"
      size="x-large"
      variant="outlined"
      @click="agreement = false, dialog = false"
      block
    >
      Decline
    </v-btn>
  </v-sheet>
    </v-dialog>
    <!-- End of Dialog1 -->

    <!-- Dialog 2 -->
    <v-dialog
    v-model="dialog2"
    >
      <v-sheet
    
    border="md"
    class="pa-6 text-white mx-auto"
    color="#141518"
    max-width="400"
  >
  <h4 class="text-h5 font-weight-bold mb-4">Privacy Policy</h4>

<p class="mb-8">
  We respect your privacy. This policy outlines how we collect and use your personal information with ToolBucks.
</p>

<p class="mb-8">
  We may collect data like your name, email, phone number, and device information to enhance our services. We do not share your information with third parties without your consent.
</p>

<p class="mb-8">
  By using our app, you agree to our data practices. For questions, please contact us.
</p>

    <v-btn
      class="text-none text-black mb-4"
      color="orange-darken-2"
      size="x-large"
      variant="flat"
      @click="agreement2 = true, dialog2 = false"
      block
    >
      Accept
    </v-btn>

    <v-btn
      class="text-none text-black"
      color="orange"
      size="x-large"
      variant="outlined"
      @click="agreement2 = false, dialog2 = false"
      block
    >
      Decline
    </v-btn>
  </v-sheet>
    </v-dialog>
    <!-- End of Dialog 2 -->

    </v-form>
    <!-- End of Form Section -->
  </v-card>
      </v-row>
  </v-container>
</template>

<style scoped>
.icon-link {
  display: inline-block; /* Makes the link behave like a block for hover effect */
}

.hover-icon {
  color: black; /* Default color */
  transition: color 0.3s; /* Smooth transition for color change */
}

.icon-link:hover .hover-icon {
  color: orange; /* Change color to orange on hover */
}
</style>