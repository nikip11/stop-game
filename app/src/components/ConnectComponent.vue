<template>
  <div class="page" >
    <!-- <LetterComponent :letter="letter" v-if="letter" /> -->

    <!-- <div>Sala:</div>
    <div id="room">{{ room }}</div> <br>-->


    <div v-if="!showForm">
      Hola, {{ user }}
      <button @click="handleRemoveUser">no eres tu?</button>
    </div>
    <div v-else class="dflex">
      <input type="text" id="user" v-model="user">
      <Button @click.once="handleConnectToRoom()">Conectar</Button>
    </div>
    <ConnectedUsersComponent :users="connectedUsers" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { useSocket } from '@/composables/useSocket.ts'
import { useStorage } from '@/composables/useStorage'
import ConnectedUsersComponent from './ConnectedUsersComponent.vue';

import Button from '@/components/ButtonComponent.vue';

const { state, connectToRoom, disconnectUser } = useSocket()


const connectedUsers = computed(() => state.connectedUsers)
// const { connectedUsers } = toRefs(state)

const user = useStorage('user')

const showForm = ref(!user.value)

// const connected = computed(() => state.connected)
// const letter = computed(() => state.letter)
const room = computed(() => state.room)
const users = ref(computed(() => state.connectedUsers))

onMounted(() => {
  checkIfUserIsConected()
})

function checkIfUserIsConected() {
  const userConected = users.value.find(u => u === user)
  if (!userConected) {
    handleRemoveUser()
  }
}

function handleRemoveUser() {
  disconnectUser(user.value)
  showForm.value = true
  user.value = ''
}

function handleConnectToRoom() {
  showForm.value = false
  connectToRoom(user.value, room)
}

// TODO
// valid input form

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
.dflex {
  text-align: center;
}
</style>
