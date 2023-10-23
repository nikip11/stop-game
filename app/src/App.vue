<template>
  <div>
    {{ connected }} - {{ room }} - {{ letter }}
    <br>
    <ul>
      <li v-for="user in users" :key="user">{{ user }}</li>
    </ul>
    <input type="text" v-model="name">
    <Button @click.once="connectToRoom()">Conectar</Button>
  </div>
  <div>
    <TimerComponent :start="startTime" :stop="stopTime" />
    <StartPageComponent @start="start"/>
    <FormComponent @stop="stop" />
  </div>
</template>

<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import StartPageComponent from './components/StartPageComponent.vue'
import TimerComponent from './components/TimerComponent.vue';
import { computed, ref } from 'vue';
import { socket, state } from '@/plugins/socket'
import Button from '@/components/Button.vue'

const startTime = ref(false)
const stopTime = ref(false)

const name = ref('')

socket.connect();

const connected = computed(() => state.connected)
const letter = computed(() => state.letter)
const room = computed(() => state.room)
const users = computed(() => state.users)

function start() {
  startTime.value = true
}

function stop() {
  stopTime.value = true
}

function connectToRoom() {
  socket.emit('connectToRoom', name.value)
}

</script>

<style scoped>

</style>
