<script setup>
import HomeLayout from '@/components/layout/HomeLayout.vue';
import SideNavigation from '@/components/navigation/SideNavigation.vue';


</script>


<!-- content must be from homelayout with sidenav(profile) but has no login-->
<template>
    <HomeLayout :show-Login-Button="false"></HomeLayout>

</template>