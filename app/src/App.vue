<template>
  <Paper>
    <WelcomeComponent v-if="showForm"/>
    <ConnectComponent />

    <div v-if="showForm">
      <TimerComponent :start="startTime" :stop="stopTime" />
      <StartPageComponent @start="start"/>
      <FormComponent @stop="stop" />
    </div>
  </Paper>
</template>

<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import StartPageComponent from './components/StartPageComponent.vue'
import TimerComponent from './components/TimerComponent.vue';
import { ref } from 'vue';
import ConnectComponent from '@/components/ConnectComponent.vue'
import Paper from '@/components/PaperComponent.vue'
import WelcomeComponent from './components/WelcomeComponent.vue';

const startTime = ref(false)
const stopTime = ref(false)

const showForm = ref(false)


function start() {
  startTime.value = true
}

function stop() {
  stopTime.value = true
}


</script>

<style scoped>
</style>
