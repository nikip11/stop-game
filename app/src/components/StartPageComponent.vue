<template>
  <div class="page">
    <h1>Preparados</h1>
    <Button @click.once="pickLetter">Empezar</Button>
  </div>
</template>

<script setup lang="ts">
import Button from './ButtonComponent.vue';
const emit = defineEmits(['start'])

function pickLetter() {
    emit('start')
}

</script>

<style>
h1 {
    text-transform: uppercase;
}
</style>
