<template>
  <div class="page">
    <div v-if="!showPrepared">
      <h1>¿Estás preparado?</h1>
      <!-- <button @click="startCounter">si</button> -->
      <!-- <ButtonComponent @click.once="startCountdown">Empezar</ButtonComponent> -->
      <ConnectedUsersComponent :users="connectedUsers" />
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
import { computed, ref, watch } from 'vue'
import ConnectedUsersComponent from './ConnectedUsersComponent.vue';
import { useSocket } from '@/composables/useSocket';
import { User } from '@/types';

const { state } = useSocket()

const connectedUsers = computed(() => state.connectedUsers)

const props = defineProps<{ show: boolean }>()

const showPrepared = ref(false)

const emit = defineEmits(['start'])
const count = ref(4)

watch(props, (newValue) => {
  if (newValue) {
    count.value = 4;
    showPrepared.value = false
  }
})

function startCountdown() {
  showPrepared.value = true
  const intervalId = setInterval(() => {
    count.value--;
    if (count.value === 0) {
      clearInterval(intervalId);
      emit('start')
    }
  }, 1000)
}

watch(connectedUsers.value, (newValue) => {
  const allUserReady = newValue.every((element: User) => element.ready)
  console.log({ allUserReady })
  if (allUserReady) {
    startCountdown()
  }
})

</script>
<style scoped>
button {
  margin-right: 20px;
}
</style>
