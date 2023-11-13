<script setup lang="ts">
import { User } from '@/types';

defineProps<{ users: User[] }>()
</script>
<template>
  <h2>Jugadores conectados</h2>
  <ul>
    <li v-for="user in users" :key="user.name">{{ user.name }} <span v-if="user.ready">ready</span></li>
  </ul>
</template>

<style scoped>
h2 {
  margin-bottom: 0px;
}

ul {
  margin: 0;
  list-style: circle;
  display: inline-block;
}

span {
  padding: 2px 5px;
  font-size: 12px;
  background-color: tomato;
  border-radius: 10px;
  color: white
}
</style>
