<script setup lang="ts">
import FormComponent from '@/components/form/FormComponent.vue'
import TimerComponent from '@/components/TimerComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import { useTimerStore } from '@/store/useTimerStore';
import { computed, ref, watch } from 'vue';
import LetterComponent from './LetterComponent.vue';
import { useSocket } from '@/composables/useSocket';
import { FormInputs } from '@/types';
import ButtonComponent from './form/ButtonComponent.vue';

const store = useTimerStore()
const { stop, state } = useSocket()

const letter = computed(() => store.getLetter)

const disabled = computed(() => state.disabled)
const userStop = computed(() => state.userStop)
const points = computed(() => state.points)
const toastNotification = ref(null)


function handleStop(formValues: FormInputs) {
  stop(formValues)
}

watch(userStop, (newValue) => {
  console.log({ newValue })
  if (toastNotification.value) {
    const msg = `${userStop.value} ha pulsado STOP`
    toastNotification.value.showToast(msg, 3000)
  }
})

</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <LetterComponent :letter="letter" />
      <TimerComponent />
    </div>
    <FormComponent @stop="handleStop" :disabled="disabled" />
    <ToastComponent ref="toastNotification" />
    <h1>{{ points }}</h1>
    <ButtonComponent>Siguiente partida</ButtonComponent>
  </div>
</template>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
