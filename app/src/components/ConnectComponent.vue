<template>
  <div class="page" >
    {{ connected }}
    <div id="letter">{{ letter }}</div>

    <div>Sala:</div>
    <div id="room">{{ room }}</div>

    <br>
    <div v-if="!showForm">
      Hola, {{ user }}
      <button @click="handleRemoveUser">no eres tu?</button>
    </div>
    <div v-else class="dflex">
      <input type="text" id="user" v-model="user">
      <Button @click.once="handleConnectToRoom()">Conectar</Button>
    </div>
    <ConnectedUsersComponent :users="users" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSocket } from '@/composables/useSocket.ts'
import { useStorage } from '@/composables/useStorage'
import ConnectedUsersComponent from './ConnectedUsersComponent.vue';

const { state, connectUser, connectToRoom, disconnectUser } = useSocket()

const user = useStorage('user')

const showForm = ref(!user.value)

const connected = computed(() => state.connected)
const letter = computed(() => state.letter)
const room = computed(() => state.room)
const users = computed(() => state.connectedUsers)

function handleRemoveUser() {
  disconnectUser(user.value)
  showForm.value = true
  user.value = ''
}

function handleConnectToRoom() {
  showForm.value = false
  connectToRoom(user.value, room)
}

</script>

<style>
#user {
  background-color: white;
  border: 4px solid rgba(3,3,3,0.6);
  display: block;
  width: 250px;
  margin-bottom: 15px;
  padding: 5px 10px;
  color: black;
  font-size: 2.5em;
  border-radius: 4px;
}
#room {
  font-size: 4em;
  font-weight: bold;
  line-height: 40px;
}
#letter {
  font-size: 7em;
    text-transform: uppercase;
    background-color: steelblue;
    color: white;
    padding: 30px;
    width: 75px;
    height: 75px;
    line-height: 52px;
    text-align: center;
    margin: 25px 0px;
}
.dflex {
  text-align: center;
}
</style>
