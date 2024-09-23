<script setup>
import { ref } from 'vue'
import axiosInstance from "@/helpers/axiosInstance";
import store from "@/helpers/store";
import router from "@/router";

const pseudo = ref('')
const password = ref('')

const passwordRules = ref([
  value => {
    if (/[^0-9]/.test(value)) return true

    return 'Last name can not contain digits.'
  },
])
const firstNameRules = ref([
  value => {
    if (value?.length >= 3) return true

    return 'First name must be at least 3 characters.'
  },
])

const login = async () => {
  await axiosInstance.post('http://localhost:4000/auth/login', { pseudo : pseudo.value, password: password.value }).then((res)=> {
    store.commit('setJwt', res.data.user.jwt)
    router.push('/')
  })
}
</script>

<template>
  <v-sheet class="mx-auto" width="400" style="border-radius: 0.5rem">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="pseudo"
        :rules="firstNameRules"
        label="Pseudo"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block v-on:click="login">Login</v-btn>
    </v-form>
  </v-sheet>
</template>

