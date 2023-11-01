<template>
  <Paper>
    <!-- step 1 -->
    <WelcomeComponent v-if="step === 1" @click="() => nextStep(2)"/>
    <!-- step 2 -->
    <ConnectComponent @click="() => nextStep(3)"/>
    <!-- step 3 -->
    <StartPageComponent @start="handleStart"/>
    <!-- step 4 -->
    <GameComponent v-if="step === 4" />
    <!-- pagina de revisión -->
    <!-- pagina de puntuaciones -->
  </Paper>
</template>

<script setup lang="ts">
import StartPageComponent from './components/StartPageComponent.vue'
import GameComponent from '@/components/GameComponent.vue'
import ConnectComponent from '@/components/ConnectComponent.vue'
import Paper from '@/components/PaperComponent.vue'
import WelcomeComponent from './components/WelcomeComponent.vue';
import { useSocket } from './composables/useSocket';
import { ref } from 'vue';

const { start } = useSocket()

const step = ref<number>(1)

function nextStep(value: number): void {
  step.value = value
}


// const disabled = ref(false)


// const steps = 


function handleStart() {
  nextStep(4)
  start()
}



</script>

<style scoped>
</style>
