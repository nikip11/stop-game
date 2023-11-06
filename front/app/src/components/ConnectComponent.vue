<template>
  <div class="page">
    <div v-if="!showPrepared">
      <div v-if="!showForm">
        Hola, {{ user }}
        <button @click="handleRemoveUser">no eres tu?</button>
      </div>
      <div v-else class="dflex">
        <input type="text" id="user" v-model="user">
        <Button @click="() => handleConnectToRoom()" :disabled="user === ''">Conectar</Button>
      </div>
      <ConnectedUsersComponent :users="connectedUsers" />
      <Button @click="() => handleClickReady()" v-if="!showForm && showReadyBtn">Ready?</Button>

    </div>
    <div v-else>
      <h1 v-if="count === 3">Preparados</h1>
      <h1 v-if="count === 2">Listos</h1>
      <h1 v-if="count === 1">Ya</h1>
      <h1>{{ count }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useSocket } from '@/composables/useSocket.ts'
import { useStorage } from '@/composables/useStorage'
import ConnectedUsersComponent from './ConnectedUsersComponent.vue';

import Button from '@/components/form/ButtonComponent.vue';
import { User } from '@/types';

const count = ref(4)
const showPrepared = ref(false)

const { state, connectToRoom, disconnectUser, userReady } = useSocket()

const emit = defineEmits(['click'])

const connectedUsers = computed(() => state.connectedUsers)
const user = useStorage('user')
const showForm = ref(!user.value)
const showReadyBtn = ref(true)
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
  connectToRoom(user.value, room.value)
  // emit('click')
}

function handleClickReady() {
  // hide button
  showReadyBtn.value = false
  // text when all readyp
  // emit user prepared
  userReady(user.value)

}

function startCountdown() {
  showPrepared.value = true
  const intervalId = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      clearInterval(intervalId);
      emit('click')
    }
  }, 1000)
}

watch(users, (newValue) => {
  const checkUser = newValue.find((element: User) => element.name === user.value)
  const allReady = newValue.every((element: User) => element.ready)
  console.log({ newValue, allReady })
  if (allReady && checkUser) {
    startCountdown()
  }
})

</script>

<style>
#user {
  background-color: white;
  border: 4px solid rgba(3, 3, 3, 0.6);
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
