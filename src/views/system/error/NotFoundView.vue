<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Oops! Page Not Found</h2>
    <p>The page you are looking for does not exist or has been moved.</p>
    <router-link class="home-link" to="/">Go back to Home</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #1a1b1b; /* Light background color */
  color: #979da2; /* Dark text color */
}

h1 {
  font-size: 6rem; /* Large font size for the 404 */
  margin: 0;
  color: orange; /* Red color for emphasis */
}

h2 {
  font-size: 2rem;
  margin: 0.5rem 0;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.home-link {
  padding: 10px 20px;
  background-color: darkorange; /* Primary button color */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: orange /* Darker shade on hover */
}
</style>