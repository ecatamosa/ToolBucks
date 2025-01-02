<template>
    <v-container>
      <v-row>
        <v-col>
            <RouterLink to="/"><v-btn class="mb-4" variant="plain" color="amber-darken-3"><v-icon class="hover-icon">mdi-arrow-left</v-icon> Back to Dashboard</v-btn></RouterLink>
          <h1 class="text-center">Edit Profile</h1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="updatedUser.name"
              :rules="[rules.required]"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="updatedUser.email"
              :rules="[rules.required, rules.email]"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="updatedUser.password"
              :rules="[rules.minLength]"
              label="New Password"
              type="password"
              hint="Leave blank to keep current password."
            ></v-text-field>
            <v-file-input
              v-model="profilePicture"
              label="Profile Picture"
              accept="image/*"
              @change="previewImage"
            ></v-file-input>
            <v-img v-if="imagePreview" :src="imagePreview" class="mb-4" height="200" />
            <v-btn @click="updateProfile" color="orange darken-3">Update Profile</v-btn>
            <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
            <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { supabase } from '@/utils/supabase'
  
  export default {
    name: 'EditProfile',
    data() {
      return {
        valid: false,
        updatedUser: {
          name: '',
          email: '',
          password: '',
        },
        profilePicture: null,
        imagePreview: null,
        errorMessage: '',
        successMessage: '',
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^[^@]+@[^@]+\.[^@]+$/
            return pattern.test(value) || 'Must be a valid email.'
          },
          minLength: value => (value && value.length >= 8) || 'Password must be at least 8 characters.',
        }
      }
    },
    created() {
      this.fetchUser(); // Fetch user data on component creation
    },
    methods: {
      async fetchUser() {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
          return
        }
        this.updatedUser.name = user.user_metadata.full_name || ''
        this.updatedUser.email = user.email || ''
      },
      previewImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      async updateProfile() {
        this.errorMessage = ''; // Reset error message
        this.successMessage = ''; // Reset success message
  
        if (this.$refs.form.validate()) {
          const updates = {
            data: {
              full_name: this.updatedUser.name,
            },
          };
  
          // Update email if changed
          if (this.updatedUser.email !== this.$user.email) {
            updates.email = this.updatedUser.email;
          }
  
          // Update password if provided
          if (this.updatedUser.password) {
            updates.password = this.updatedUser.password;
          }
  
          const { error } = await supabase.auth.update(updates);
  
          if (error) {
            this.errorMessage = error.message; // Display error message
          } else {
            this.successMessage = 'Profile updated successfully!';
            
            // Handle image upload if a new profile picture is selected
            if (this.profilePicture) {
              const { error: uploadError } = await supabase.storage
                .from('profile-pictures')
                .upload(`public/${this.$user.id}/profile.jpg`, this.profilePicture);
  
              if (uploadError) {
                this.errorMessage = uploadError.message;
              } else {
                // Optionally, you can update the user's metadata with the new picture URL
              }
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>