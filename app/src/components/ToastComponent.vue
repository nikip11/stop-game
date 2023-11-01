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
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 4px;
}
</style>