<template>
    <Button @click="pickLetter">Empezar</Button>
    <h1>{{ letter }}</h1>
    <h1>{{ time }}</h1>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import { letters, selectRandomLetter } from '@/types'

const letter = ref<string | null>(null)
const time = ref<string | null>(null)

const emit = defineEmits(['start'])

function pickLetter() {
    letter.value = selectRandomLetter(letters)
    emit('start')
}

// function setTime() {
//     const t = setInterval(() => {

//     }, 1000)
// }


</script>

<style>
h1 {
    text-transform: uppercase;
}
</style>