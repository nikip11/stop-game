<template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <InputField :id="field" :disabled="disabled" v-for="field in formFields" :key="field" v-model="inputValues[field]"
        :result="result ? result[field] : ''" />
      <div class="submit-btn">
        <Button type="submit" :disabled="disabled">Stop</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { formFields } from '@/helper.js'
import Button from './ButtonComponent.vue';
import InputField from './InputField.vue';
import { ref, watch } from 'vue';
import { useFormStore } from '@/store/useFormStore';

defineProps<{ disabled: boolean, result: { [key: string]: { points?: number } } }>()

const emit = defineEmits(['stop'])
const inputValues = ref<{ [key: string]: string }>({});

const fields = useFormStore()

function submitForm() {
  emit('stop')
}
watch(inputValues.value, (fieldsValue) => {
  fields.setFields(fieldsValue)
})

</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
}

.submit-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
