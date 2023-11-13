<template>
  <Paper>
    <!-- step 1 -->
    <WelcomeComponent v-if="step === 1" @click="() => nextStep(2)" />
    <!-- step 2 -->
    <ConnectComponent v-if="step === 2" @click="() => handleStart()" />
    <!-- step 3 -->
    <!-- <StartPageComponent @start="handleStart"/> -->
    <!-- step 4 -->
    <GameComponent v-if="step === 3" @stop="() => nextStep(4)" />
    <!-- pagina de revisión -->
    <!-- pagina de puntuaciones -->
    <TotalPageComponent @newGame="nextStep(2)" v-if="step === 4" :users="users" />
  </Paper>
</template>

<script setup lang="ts">
// import StartPageComponent from './components/StartPageComponent.vue'
import GameComponent from '@/components/GameComponent.vue'
import ConnectComponent from '@/components/ConnectPage.vue'
import Paper from '@/components/layout/PaperComponent.vue'
import WelcomeComponent from './components/WelcomePage.vue';
import { useSocket } from './composables/useSocket';
import { computed, onMounted, ref } from 'vue';
import { useStorage } from './composables/useStorage';
import TotalPageComponent from './components/TotalPageComponent.vue';

const { state, start, disconnectUser } = useSocket()
const user = useStorage('user')

const users = ref(computed(() => state.connectedUsers))

const step = ref<number>(1)

function nextStep(value: number): void {
  step.value = value
}


function handleStart() {
  nextStep(3)
  start()
}

function handleNewGame() {
  // clear totalPoints
}
function handleNextGame() {
  // clear Ready
}

onMounted(() => {
  checkIfUserIsConected()
})

function checkIfUserIsConected() {
  if (user.value) {
    disconnectUser(user.value)
    user.value = ''
  }
}


</script>

<style scoped></style>
