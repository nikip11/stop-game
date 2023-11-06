<template>
  <!-- <div id="timer" v-if="seconds"> -->
<div id="timer">
    {{ seconds }}
</div>
</template>

<script setup lang="ts">
import { useTimerStore } from '@/store/useTimerStore';
import { computed } from 'vue';

const store = useTimerStore()
const seconds = computed(() => store.getSeconds)

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
#timer {
    padding: 25px;
    background-color: var(--primary);
    color: var(--white);
    font-size: 2em;
    font-family: 'Tilt Neon', sans-serif;
    position: sticky;
    display: flex;
}

#timer span {
    font-size: 14px;
    padding-left: 5px;
}
</style>
