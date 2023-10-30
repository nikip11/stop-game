<script setup lang="ts">
defineProps<{users: []}>()
</script>
<template>
  <h2>Jugadores conectados</h2>
  <ul>
    <li v-for="user in users" :key="user">{{ user }} <span>ok</span></li>
  </ul>
</template>

<style scoped>
h2 {
  margin-bottom: 0px;
}
ul {
  margin: 0;
}
span {
  padding: 2px 5px;
  font-size: 12px;
  background-color: tomato;
  border-radius: 10px;
  color: white
}
</style>
