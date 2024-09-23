<template>
  <v-app>
    <Appbar></Appbar>
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
import Appbar from "@/components/Appbar.vue";
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
