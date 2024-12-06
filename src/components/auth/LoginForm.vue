<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators';
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase';
import AlertNotification from '../common/AlertNotification.vue';

const router = useRouter()

const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
  remember: false
}

const formAction = ref({...formActionDefault})

const formData = ref({...formDataDefault})

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
      }, 3000); // 5000 milliseconds = 5 seconds

      
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred. Please try again.');
  }
  formAction.value.formProcess = false;
};


const onFormSubmit = () => {
  refVForm.value?.validate().then(({valid}) => {
    if (valid) onLogin() 
  })
}


</script>
  <template>
  <div>
    <v-img
      class="mx-auto mb-6"
      max-width="220"
      src="/images/newloginlogo.png"
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
      :error-message="formAction.formErrorMessage"
      ></AlertNotification>

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <!--Login Form Section -->
      <v-form ref="refVForm" @submit.prevent="onFormSubmit" >
      <v-text-field
        v-model="formData.email"
        :rules="[requiredValidator, emailValidator]"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        color="orange"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-orange"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        v-model="formData.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        color="orange"
        :rules="[requiredValidator]"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-checkbox v-model="formData.remember" label="Remember password"
      color="orange"></v-checkbox>

      <v-btn
        type="submit"
        class="mb-8 flex-grow-1"
        color="orange"
        size="large"
        variant="tonal"
        :disabled="formAction.formProcess"
        :loading="formAction.formProcess"

        block
      >
        Log In
      </v-btn>
    </v-form>
    <!-- End of Login Form Section -->

    <!-- Sign Up Link -->
      <v-card-text class="text-center">
        <RouterLink to="/register" class="text-orange text-decoration-none">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </RouterLink>
      </v-card-text>
      
    </v-card>
  </div>
</template>