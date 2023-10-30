<template>
  <div class="form page">
    <form @submit.prevent="submitForm">
    <InputField :id="field" :disabled="disabled" v-for="field in formFields" :key="field"/>
    <div style="margin-top: 20px">
      <Button type="submit">Stop</Button>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { formFields } from '@/types'
import Button from './ButtonComponent.vue';
import InputField from './InputField.vue';

const { disabled } = defineProps<{disabled: boolean}>()

const emit = defineEmits(['stop'])

function submitForm() {
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
