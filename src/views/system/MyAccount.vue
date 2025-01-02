<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">My Account</h1>
        <v-btn @click="goHome" class="mb-4 me-3" color="amber-darken-3" variant="plain"><v-icon class="hover-icon">mdi-arrow-left</v-icon>Back to Dashboard</v-btn>
        <v-spacer></v-spacer><br><br>


        <!-- Rental Records Section -->
        <v-card class="mb-4">
          <v-card-title>
            <v-icon left>mdi-format-list-bulleted</v-icon>
            Rental Records
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="rental in rentals" :key="rental.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ rental.tool_name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Status: {{ rental.status }}<br />
                      Rented On: {{ rental.rented_on }}<br />
                      Due Date: {{ rental.due_date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-alert v-if="!rentals.length"><v-icon>mdi-alert-circle</v-icon> No rentals found.</v-alert>
          </v-card-text>
        </v-card>

        <!-- Help & Support Section -->
        <v-card class="mb-4">
          <v-card-title>
            <v-icon left>mdi-help-circle</v-icon>
            Help & Support
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>FAQs</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-btn text @click="window.open('/faqs', '_blank')">Visit our FAQs</v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Contact Support</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-btn text @click="window.location.href='mailto:support@example.com'">Email Support</v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Security Settings Section -->
        <v-card class="mb-4">
          <v-card-title>
            <v-icon left>mdi-lock</v-icon>
            Security Settings
          </v-card-title>
          <v-card-text>
            <v-form ref="securityForm" v-model="valid" lazy-validation>
              <v-checkbox
                v-model="security.twoFactor"
                label="Enable Two-Factor Authentication"
              ></v-checkbox>
              <v-btn color="amber-darken-3" @click="updateSecurity">Save Security Settings</v-btn>
              <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
              <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Reviews and Feedback Section -->
        <v-card>
          <v-card-title>
            <v-icon left>mdi-comment-text-outline</v-icon>
            Reviews and Feedback
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="review in reviews" :key="review.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ review.tool_name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Rating: {{ review.rating }}<br />
                      Comment: {{ review.comment }}<br />
                      Date: {{ new Date(review.created_at).toLocaleDateString() }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-alert v-if="!reviews.length" ><v-icon>mdi-alert-circle</v-icon> No reviews found.</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from '@/utils/supabase'

export default {
  name: 'MyAccount',
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
      rentals: [],
      security: {
        twoFactor: false,
      },
      reviews: [],
      successMessage: '',
      errorMessage: '',
    }
  },
  created() {
    this.fetchUser();
    this.fetchRentals();
    this.fetchReviews(); // Fetch user reviews
    this.fetchSecuritySettings(); // Fetch user security settings
  },
  methods: {
    async fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        return
      }
      this.user.name = user.user_metadata.full_name || ''
      this.user.email = user.email || ''
    },
    
    async fetchRentals() {
      const userId = this.user.id;
      const { data: rentals, error } = await supabase
        .from('rentals')
        .select('*, tools(name)')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching rentals:', error)
        return;
      }

      this.rentals = rentals.map(rental => ({
        id: rental.id,
        tool_name: rental.tools.name,
        status: rental.status,
        rented_on: new Date(rental.rented_on).toLocaleDateString(),
        due_date: new Date(rental.due_date).toLocaleDateString(),
      }));
    },

    async fetchReviews() {
      const userId = this.user.id; // Get the user ID
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching reviews:', error)
        return;
      }

      this.reviews = reviews.map(review => ({
        id: review.id,
        tool_name: review.tool_name,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
      }));
    },

    async fetchSecuritySettings() {
      // Fetch user security settings from your database
      // Example: Set this.security.twoFactor based on fetched data
    },

    async updateSecurity() {
      // Update security settings in your database
      // Show success or error messages based on the operation
      this.successMessage = 'Security settings updated successfully!';
      this.errorMessage = ''; // Reset error message
    },

    goHome() {
      this.$router.push('/'); // Navigate to the home page
    },
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.v-card {
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>