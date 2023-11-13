<script setup lang="ts">
import { User } from '@/types';
import ButtonComponent from './form/ButtonComponent.vue';

const { users } = defineProps<{ users: User[] }>()
// const users = ref(computed(() => state.connectedUsers))
const emit = defineEmits(['nextGame', 'newGame'])

function nextGame() {
  emit('nextGame')
}

function newGame() {
  emit('newGame')
}
</script>
<template>
  <div class="page">
    <h1>Puntuaciones</h1>
    <table>
      <thead>
        <tr>
          <th>Jugador</th>
          <th>Puntos</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.name">
          <td>{{ user.name }}</td>
          <td>{{ user.points }}</td>
          <td>{{ user.totalPoints }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btns">
      <ButtonComponent @click="nextGame">Siguiente Partida</ButtonComponent>
      <ButtonComponent @click="newGame">Nueva Partida</ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 50px;
}

table {
  font-size: 30px;
}

table th {
  border-bottom: 5px dotted #333;
  min-width: 90px;
}

table th:nth-child(1) {
  min-width: 150px;
}

.btns {
  margin-top: 20px;
}

.btns button {
  margin: 10px 0px;
}
</style>
