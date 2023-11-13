<template>
  <div class="connected">{{ connected }}</div>
  <div class="welcome page">
    <h1 id="logo">STOP</h1>
    <h1>Bienvenidos</h1>
    <Button @click="handleClick" v-if="connected">Comenzamos</Button>
    <div v-else>Hay algún problema con el servidor</div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/form/ButtonComponent.vue';
import { useSocket } from '@/composables/useSocket';
import { computed } from 'vue';

const { state } = useSocket()
const connected = computed(() => state.connected)
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>
<style>
#logo {
  font-size: 5em;
  line-height: 30px;
}


.connected {
  position: absolute;
  top: 30px;
  right: 20px;
}
</style>
