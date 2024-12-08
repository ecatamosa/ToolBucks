<script setup>
import HomeLayout from '@/components/layout/HomeLayout.vue';




</script>


<!-- content must be from homelayout without sidenav(profile) but has login-->
<template>
  <HomeLayout 
  :show-side-navigation="false"
  :show-search-bar="false" 
  ></HomeLayout>
</template>

  



