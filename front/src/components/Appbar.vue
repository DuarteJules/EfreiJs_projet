<script setup>
import { ref } from 'vue'

const items = ref([
  { title: 'Inscription', link:"register" },
  { title: 'Connexion', link:"login" },
])
</script>

<template>
  <v-app-bar :elevation="6" rounded>
    <Router-link to="/" style="text-decoration: none; color: white; margin-left: 15px; cursor: pointer;">
      <v-app-bar-title>Tâches</v-app-bar-title>
    </Router-link>

    <template v-slot:append  style="cursor: pointer">
      <v-btn icon="mdi-dots-vertical">
        <v-icon>mdi-account</v-icon>
        <v-menu activator="parent" location="bottom">
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              :to="item.link"
            >
              <RouterLink :to="item.link" style="text-decoration: none; color: white">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </RouterLink>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

