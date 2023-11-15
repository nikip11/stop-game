<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false)
const message = ref('')

const showToast = (newMessage: string, duration: number = 3000) => {
  show.value = true
  message.value = newMessage
  console.log(newMessage)

  setTimeout(() => {
    show.value = false
  }, duration)
}

defineExpose({
  showToast
})

</script>
<template>
  <div v-if="show" class="toast-notification">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  /* border-radius: 4px; */
}
</style>
