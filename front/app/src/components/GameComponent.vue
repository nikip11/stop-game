<script setup lang="ts">
import FormComponent from '@/components/form/FormComponent.vue'
import TimerComponent from '@/components/TimerComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import { useTimerStore } from '@/store/useTimerStore';
import { computed, ref, watch } from 'vue';
import LetterComponent from './LetterComponent.vue';
import { useSocket } from '@/composables/useSocket';
import ButtonComponent from './form/ButtonComponent.vue';
import { useFormStore } from '@/store/useFormStore';

const store = useTimerStore()
const { stop, state, sendAnswers } = useSocket()

const emit = defineEmits(['stop'])

const letter = computed(() => store.getLetter)

const disabled = computed(() => {
  console.log({ state })
  return state.disabled
})
// const result = computed(() => state.connectedUsers)
const userStop = computed(() => state.userStop)
const toastNotification = ref(null)

const fields = useFormStore()


function handleStop() {
  stop()
}

watch(userStop, () => {
  if (toastNotification.value) {
    const msg = `${userStop.value} ha pulsado STOP`
    toastNotification.value.showToast(msg, 3000)

    sendAnswers(fields.getFields)
  }
})

function handleClick() {
  emit('stop')
}

</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <LetterComponent :letter="letter" />
      <TimerComponent />
    </div>
    <FormComponent @stop="handleStop" :disabled="disabled" />
    <ButtonComponent @click="handleClick" v-if="disabled">Ver puntuaciones</ButtonComponent>
    <ToastComponent ref="toastNotification" />
  </div>
</template>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
