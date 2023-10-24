<template>
  <div class="page" >
    {{ connected }}
    <div id="letter">{{ letter }}</div>

    <div>Sala:</div>
    <div id="room">{{ room }}</div>

    <br>
    <div v-if="user">
      Hola, {{ user }}
    </div>
    <div v-else class="dflex">
      <input type="text" id="user" v-model="name">
      <Button @click.once="handleConnectToRoom()">Conectar</Button>
    </div>
    <ConnectedUsersComponent :users="users" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// import { socket, state } from '@/plugins/socket';
import { useSocket } from '@/composables/useSocket.ts'
import { useLocalStorage } from '@/composables/useLocalStorage'
import ConnectedUsersComponent from './ConnectedUsersComponent.vue';

const { state, connectUser, connectToRoom } = useSocket()
const { setter, getter, clear } = useLocalStorage()

const name = ref('')

const connected = computed(() => state.connected)
const letter = computed(() => state.letter)
const room = computed(() => state.room)
const users = computed(() => state.connectedUsers)
const user = computed(() => getter('user'))


const u = users.value.find((u) => u === user.value)
  if (!u) {
    clear()
  }


function handleConnectToRoom() {
  // save user on localstorage
  // save room on localstorage
  console.log({room})
  setter('user', name.value)
  setter('room', room)
  connectToRoom(name.value, room)
  connectUser(name.value)
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
