<script setup>
import HomeLayout from '@/components/layout/HomeLayout.vue';
</script>


<!-- content must be from homelayout with sidenav(profile) but has no login-->
<template>
    <HomeLayout :show-Login-Button="false">
        <template #default>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <router-link to="/my-account">Go to My Account</router-link>
            <!-- Add more dashboard-related content here -->
        </template>
    </HomeLayout>

</template>
