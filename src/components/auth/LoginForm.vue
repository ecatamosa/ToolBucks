<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase'
import AlertNotification from '../common/AlertNotification.vue'
import { onMounted } from 'vue'

const router = useRouter()

const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
  remember: false,
}

const formAction = ref({ ...formActionDefault })

const formData = ref({ ...formDataDefault })

const onLogin = async () => {
  formAction.value.formProcess = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      // Handle error (e.g., show an alert)
      console.error('Login error:', error.message)
      formAction.value.formErrorMessage = 'Login failed. Check your credentials and try again.'

      // Clear the error message after 3 seconds
      setTimeout(() => {
        formAction.value.formErrorMessage = '' // Clear the message
      }, 2000)
    } else {
      console.log('ID:', data.user.id)
      localStorage.setItem('user_id', data.user.id)
      // Handle successful login (e.g., redirect to dashboard)
      console.log('Login successful:', data)
      formAction.value.formSuccessMessage = 'Access granted! Redirecting now...'

      // Save email and password if "Remember Password" is checked
      if (formData.value.remember) {
        localStorage.setItem('rememberedEmail', formData.value.email)
        localStorage.setItem('rememberedPassword', formData.value.password)
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      // Delay the redirect for 5 seconds
      setTimeout(() => {
        router.replace('/dashboard') //change route if dashboardview is created
      }, 2000) // 5000 milliseconds = 5 seconds
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('An unexpected error occurred. Please try again.')
  }
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}

// Load saved email and password on mount
onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  const savedPassword = localStorage.getItem('rememberedPassword')

  if (savedEmail) {
    formData.value.email = savedEmail
  }
  if (savedPassword) {
    formData.value.password = savedPassword // Be cautious with this
    formData.value.remember = true // Check the remember checkbox by default
  }
})

const onForgotPassword = async () => {
  formAction.value.forgotPasswordLoading = true // Set loading state
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.value.email)
    if (error) {
      console.error('Error sending reset password email:', error.message)
      formAction.value.formErrorMessage =
        'Failed to send password reset email. Please check your email.'
      setTimeout(() => {
        formAction.value.formErrorMessage = '' // Clear the message after 2 seconds
      }, 2000)
    } else {
      formAction.value.formSuccessMessage = 'Password reset email sent! Please check your inbox.'
      setTimeout(() => {
        formAction.value.formSuccessMessage = '' // Clear the message after 5 seconds
      }, 5000)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('An unexpected error occurred. Please try again.')
  } finally {
    formAction.value.forgotPasswordLoading = false // Reset loading state
  }
}
</script>

<template>
  <div>
    <RouterLink to="/">
      <v-img class="mx-auto my-6" max-width="220" src="images/newloginlogo2.png"></v-img>
    </RouterLink>

    <!-- Form Holder -->
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <AlertNotification
        :success-message="formAction.formSuccessMessage"
        :error-message="formAction.formErrorMessage"
      ></AlertNotification>

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <!--Login Form Section -->
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
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

          <div class="text-caption text-decoration-none text-orange">
            <a
              href="#"
              type="button"
              class="text-decoration-none"
              rel="noopener noreferrer"
              @click.prevent="onForgotPassword"
              :disabled="formAction.forgotPasswordLoading"
              :style="{
                pointerEvents: formAction.forgotPasswordLoading ? 'none' : 'auto',
                color: formAction.forgotPasswordLoading ? '#aaa' : '#ff9800',
              }"
            >
              Forgot password?
              <span v-if="formAction.forgotPasswordLoading" class="loader"></span>
              <!-- Loading animation -->
            </a>
          </div>
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

        <v-checkbox
          v-model="formData.remember"
          label="Remember password"
          color="orange"
        ></v-checkbox>

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

<style scoped>
.loader {
  border: 2px solid #ff9800; /* Orange border */
  border-top: 2px solid transparent; /* Transparent on top */
  border-radius: 50%;
  width: 12px; /* Adjust size as needed */
  height: 12px; /* Adjust size as needed */
  animation: spin 0.6s linear infinite; /* Spin animation */
  display: inline-block; /* Inline for proper alignment */
  margin-left: 5px; /* Space between text and spinner */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
