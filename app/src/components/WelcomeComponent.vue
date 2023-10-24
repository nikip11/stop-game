<template>
    <div class="welcome page">
      <h1 id="logo">STOP</h1>
      <h1>Bienvenidos</h1>
      <Button>Comenzamos</Button>
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/ButtonComponent.vue';
</script>
<style>
#logo {
  font-size: 5em;
}
.welcome h1 {
    font-size: 3.5em;
}
</style>
