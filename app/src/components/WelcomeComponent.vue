<template>
  {{ connected }}
    <div class="welcome page">
      <h1 id="logo">STOP</h1>
      <h1>Bienvenidos</h1>
      <Button @click="() => $emit('click')">Comenzamos</Button>
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/ButtonComponent.vue';
import { useSocket } from '@/composables/useSocket';
import { computed } from '@vue/reactivity';

const {state} = useSocket()
const connected = computed(() => state.connected)
</script>
<style>
#logo {
  font-size: 5em;
}
.welcome h1 {
    font-size: 3.5em;
}
</style>
