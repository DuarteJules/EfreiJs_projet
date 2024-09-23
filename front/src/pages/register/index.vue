<script setup>

import RegisterForm from "@/components/RegisterForm.vue";
</script>

<template>
  <v-card variant="tonal" class="card">
    <RegisterForm />
  </v-card>

</template>

<style scoped>
.card {
  width: 50%;
  margin-top: 20%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
}
</style>
