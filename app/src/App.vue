<template>
  <Paper>
    <!-- step 1 -->
    {{ connected }}
    <WelcomeComponent />
    <!-- step 2 -->
    <ConnectComponent />
    <StartPageComponent @start="handleStart"/>
    <!-- step 3 -->
    <GameComponent  />
    <!-- step 4 -->
    <FormComponent @stop="handleStop" :disabled="disabled" />
    <!-- step 5 -->
    <h1>{{ points }}</h1>
    <div v-if="showForm">
      <TestComponent />
    </div>
  </Paper>
</template>

<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import StartPageComponent from './components/StartPageComponent.vue'
import GameComponent from '@/components/GameComponent.vue'
import TestComponent from '@/components/TestComponent.vue'
import { computed, ref } from 'vue';
import ConnectComponent from '@/components/ConnectComponent.vue'
import Paper from '@/components/PaperComponent.vue'
import WelcomeComponent from './components/WelcomeComponent.vue';
import { useSocket } from './composables/useSocket';

const { stop, start, state } = useSocket()

const disabled = ref(false)
const connected = computed(() => state.connected)

const showForm = ref(false)

const points = ref(0)

function handleStart() {
  disabled.value = false
  start()
}

function handleStop() {
  disabled.value = true
  stop()
  calculateResult()
}

function calculateResult() {

}


</script>

<style scoped>
</style>
