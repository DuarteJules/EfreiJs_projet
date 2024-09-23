<script setup>
import { onMounted, ref } from 'vue'
import axiosInstance from "@/helpers/axiosInstance";

const data1 = ref([])
const name = ref()
const description = ref()
const date = ref()

const getData = async () => {
  await axiosInstance.get('http://localhost:4000/task/getTask').then((res) => {
    data1.value = JSON.parse(res.data.data);
  })
}

const createTask = async () => {
  await axiosInstance.post("http://localhost:4000/task/createTask",{
    nom: name.value,
    description: description.value,
    creator:'moi',
    date: date.value,
  }).then(async (res) => {
    await getData()
  })
}
onMounted(async()=> {
  await getData()
})
defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="container">
    <div v-for="item in data1" class="items">
      <span>{{item.name}}</span>
      <span>{{item.description}}</span>
      <span>{{item.endDate}}</span>
    </div>
  </div>
  <div class="card">
    <span>Ajouter nouvelle tâche</span>
    <div class="input_group">
      <input type="text" class="input" placeholder="Nom" v-model="name" />
      <input type="text" class="input" placeholder="Description" v-model="description" />
      <input type="date" class="input" placeholder="Date" v-model="date"/>
    </div>
    <div class="input_group">
      <button class="input" v-on:click="createTask">Créer</button>
    </div>
  </div>
</template>

<style scoped>

.container{
  height: 50%;
  width: 100%;
  margin-top: 30px ;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  overflow-y: scroll;
}
.items{
  width: 100%;
  height: 10%;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #505059;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 30%;
}
.input{
  width: 30%;
  height: 100%;
  padding: 0 1rem;
  background-color: #505059;
}
.input_group{
  margin-top:10px;
  display: flex;
  height: 23%;
  width: 100%;
  justify-content: space-around;
}
</style>
