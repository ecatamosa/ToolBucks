<template>
    <v-container fluid class="about-us-container pa-4">
      <v-row class="mt-5">
        <v-col cols="12">
          <v-card class="pa-4" flat>
            <h1 class="text-h3 text-center amber-text">About Us</h1>
            <v-divider class="my-4 amber-divider"></v-divider>
            <p class="text-center text--light">
              Welcome to our Tool Rental service! We provide a wide range of high-quality tools for rent, catering to both DIY enthusiasts and professional contractors. Our mission is to make tool rental easy and affordable, ensuring that you have the right tools to get the job done.
            </p>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined>
            <h2 class="text-h5 amber-text">Our Team</h2>
            <p class="text--light">
              Our team is composed of experienced professionals who are passionate about tools and helping customers succeed in their projects. We are here to provide expert advice and support, ensuring you choose the right tools for your needs.
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-4" outlined>
            <h2 class="text-h5 amber-text">Contact Us</h2>
            <p class="text--light">
              If you have any questions or need assistance, feel free to reach out to us:
            </p>
            <ul class="text--light">
              <li>Email: <a href="mailto:support@toolrental.com" class="amber-text">support@toolrental.com</a></li>
              <li>Phone: <a href="tel:1234567890" class="amber-text">(123) 456-7890</a></li>
              <li>Address: 123 Tool Lane, City, State, ZIP</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12">
          <v-card class="pa-4" flat>
            <h2 class="text-h5 text-center amber-text">Our Commitment</h2>
            <v-divider class="my-4 amber-divider"></v-divider>
            <p class="text-center text--light">
              We are committed to providing you with the best tools and customer service. Our rental process is straightforward, and we strive to ensure that your experience with us is seamless and enjoyable.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  // You can add any additional logic or imports here if needed
  </script>
  
  <style>
  /* Global styles for the About page */
  .about-us-container {
    background-color: #121212; /* Dark background for the container */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
  }
  
  h1, h2 {
    margin-bottom: 20px; /* Spacing below headers */
  }
  
  p, ul {
    margin-bottom: 15px; /* Spacing below paragraphs and lists */
  }
  
  .text--light {
    color: #f5f5f5; /* Light text for contrast */
  }
  
  .amber-text {
    color: #ffb300; /* Amber color for text */
  }
  
  .amber-divider {
    background-color: #ffb300; /* Amber color for the divider */
  }
  
  .pa-4 {
    padding: 20px; /* General padding for the container */
  }
  </style>