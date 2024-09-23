<script setup>
import { ref } from 'vue'
import axios from 'axios'
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

const register = async () => {
  await axios.post('http://localhost:4000/auth/register', { pseudo : pseudo.value, password: password.value }).then((res)=> {
    router.push('/login')
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

        <v-btn class="mt-2" type="submit" block v-on:click="register">Register</v-btn>
      </v-form>
    </v-sheet>
</template>

