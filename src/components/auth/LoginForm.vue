<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators';
import { ref } from 'vue'

const visible = ref(false)
const revForm = ref()

const formDataDefault = {
  email: '',
  password: '',
  remember: false
}

const formData = ref({...formDataDefault})

const onSubmit = () => {
  alert(`Email: ${formData.value.email}\nPassword: ${formData.value.password}\nRemember: ${formData.value.remember}`);
}

const onFormSubmit = () => {
  revForm.value?.validate().then(({valid}) => {
    if (valid) onSubmit() 
  })
}

// for testing of submit btn (Define the onSubmit function to display an alert)
// const onSubmit = () => {
//   alert(`Email: ${formData.value.email}\nPassword: ${formData.value.password}\nRemember: ${formData.value.remember}`);
// };

</script>
  <template>
  <div>
    <v-img
      class="mx-auto mb-6"
      max-width="220"
      src="/public/images/newloginlogo.png"
    ></v-img>

    <!-- Form Holder Card -->
      <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <!--Login Form Section -->
      <v-form ref="revForm" @submit.prevent="onFormSubmit" >
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
        class="mb-8"
        color="orange"
        size="large"
        variant="tonal"
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