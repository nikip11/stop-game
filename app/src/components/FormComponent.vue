<template>
  <div class="form">
    <form @submit.prevent="submitForm">
    <InputField :id="field" :disabled="disabled" v-for="field in formFields" :key="field" v-model="inputValues[field]"/>
    <div style="margin-top: 20px">
      <Button type="submit" :disabled="disabled">Stop</Button>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { formFields } from '@/types'
import Button from './ButtonComponent.vue';
import InputField from './InputField.vue';
import { Ref, ref } from 'vue';

const { disabled } = defineProps<{disabled: boolean}>()

const emit = defineEmits(['stop'])
const inputValues: Ref<{ [key: string]: any }> = ref({});

function submitForm() {
  console.log(inputValues.value)
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
