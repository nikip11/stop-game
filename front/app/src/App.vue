<template>
  <Paper>
    <!-- step 1 -->
    <WelcomeComponent v-if="step === 1" @click="() => nextStep(2)" />
    <!-- step 2 -->
    <ConnectComponent v-if="step === 2" @click="() => handleStart()" />
    <!-- step 3 -->
    <!-- <StartPageComponent @start="handleStart"/> -->
    <!-- step 4 -->
    <GameComponent v-if="step === 3" />
    <!-- pagina de revisión -->
    <!-- pagina de puntuaciones -->
  </Paper>
</template>

<script setup lang="ts">
// import StartPageComponent from './components/StartPageComponent.vue'
import GameComponent from '@/components/GameComponent.vue'
import ConnectComponent from '@/components/ConnectComponent.vue'
import Paper from '@/components/layout/PaperComponent.vue'
import WelcomeComponent from './components/WelcomeComponent.vue';
import { useSocket } from './composables/useSocket';
import { onMounted, ref, computed } from 'vue';
import { useStorage } from './composables/useStorage';

const { state, start, disconnectUser } = useSocket()
const user = useStorage('user')

const step = ref<number>(1)

function nextStep(value: number): void {
  step.value = value
}


function handleStart() {
  nextStep(3)
  start()
}

const users = ref(computed(() => state.connectedUsers))

onMounted(() => {
  checkIfUserIsConected()
})

function checkIfUserIsConected() {
  const userConected = users.value.find(u => u === user)
  if (!userConected) {
    disconnectUser(user.value)
  }
}


</script>

<style scoped></style>
