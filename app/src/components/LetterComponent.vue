<script setup lang="ts">
defineProps<{letter: string}>()
</script>

<template>
  <div id="letter">{{ letter }}</div>
</template>

<style scoped>
#letter {
  font-size: 7em;
    text-transform: uppercase;
    background-color: steelblue;
    color: white;
    padding: 30px;
    width: 75px;
    height: 75px;
    line-height: 52px;
    text-align: center;
    min-width: 100px;
    height: 50px;
}
</style>
