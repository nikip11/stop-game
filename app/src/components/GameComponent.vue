<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import TimerComponent from '@/components/TimerComponent.vue'
import { useTimerStore } from '@/store/useTimerStore';
import { computed, ref } from 'vue';
import LetterComponent from './LetterComponent.vue';
import { useSocket } from '@/composables/useSocket';

const store = useTimerStore()
const { stop, state } = useSocket()

const letter = computed(() => store.getLetter)

const disabled = computed(() => state.disabled)

const points = ref(0)
function handleStop() {
  stop()
  calculateResult()
}

function calculateResult() {

}

</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <LetterComponent :letter="letter" />
      <TimerComponent/>
    </div>
    <FormComponent @stop="handleStop" :disabled="disabled" />
    <h1>{{ points }}</h1>
  </div>
</template>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
