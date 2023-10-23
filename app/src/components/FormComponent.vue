<template>
    <div class="form">
        <div v-for="field in formFields" :key="field">
            <InputField :id="field" :disabled="disabled" />
        </div>
        <Button @click="stop">Stop</Button>
    </div>
</template>

<script setup lang="ts">
import { formFields } from '@/types'
import Button from './Button.vue';
import InputField from './InputField.vue';
import { ref } from 'vue';

const disabled = ref(false)
const emit = defineEmits(['stop'])

function stop() {
    disabled.value = true
    emit('stop')
}

</script>

<style>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>