<script setup lang="ts">
import TimerComponent from '@/components/TimerComponent.vue'
import { useTimerStore } from '@/store/useTimerStore';
import { computed } from 'vue';
import LetterComponent from './LetterComponent.vue';

const store = useTimerStore()

const letter = computed(() => store.getLetter)


</script>

<template>
  <div>
    <!-- <h1>{{ letter }}</h1> -->
    <LetterComponent :letter="letter" />
    <TimerComponent/>
  </div>
</template>

<style scoped></style>
