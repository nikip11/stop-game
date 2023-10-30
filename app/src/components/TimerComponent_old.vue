<template>
<div id="timer" v-if="show">
    {{ seconds }}<span>seg</span>
</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{start: boolean, stop: boolean}>()

const seconds = ref(0)
const show = ref(false)
const timer = ref<ReturnType<typeof setInterval> | null>(null)

const startTimer = () => {
  if (timer.value === null) {
    show.value = true
    timer.value = setInterval(() => {
        seconds.value++;
    }, 1000);
  }
}

watch(() => props.start, (newValue) => {
    if (newValue) {
        startTimer()
    }
})
watch(() => props.stop, (newValue) => {
    if (newValue) {
        stopTimer()
    }
})

const stopTimer = () => {
    clearInterval(timer.value)
}

// clearInterval

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
#timer {
    position: absolute;
    top: 0;
    right: 0;
    padding: 25px;
    background-color: var(--primary);
    color: var(--white);
    font-size: 2em;
    font-family: 'Tilt Neon', sans-serif;
}

#timer span {
    font-size: 14px;
    padding-left: 5px;
}
</style>