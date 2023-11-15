<template>
  <div class="form-field type-2">
    <label>{{ id }}</label>
    <input type="text" :id="id" :disabled="disabled" :value="modelValue" @input="updateValue" />

    <div v-if="result" class="fields-points">{{ result.points }}</div>
    <!-- <div v-if="result" class="fields-reason">{{ result.reason }}</div> -->
  </div>
</template>
<script setup lang="ts">

type ResultInput = {
  value: string
  points: number
  reason: string
}
defineProps<{
  id: string,
  disabled: boolean,
  type?: { type: string, default: 'text' },
  modelValue: unknown,
  result: ResultInput | null
}>()

const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  emit('update:modelValue', inputValue);
}
</script>
<style>
.form {
  margin-top: 20px;
  width: 90%;
}

.form-field {
  position: relative;
}

.form-field.type-2 {
  display: flex;
  align-items: center;
  border-top: 4px dotted #333;
  padding: 0px 5px;
  width: 100%;
}

.form-field.type-2 label {
  display: inline-block;
  width: 115px;
  font-size: 24px;
  text-transform: capitalize;
  line-height: 16px;
}

.form-field.type-2 input {
  text-transform: uppercase;
  background-color: white;
  /* background-color: transparent; */
  color: var(--blue);
  font-weight: bold;
  font-family: 'Patrick hand';
  border: none;
  border-left: #333 dotted 4px;
  padding-left: 10px;
  font-size: 32px;
  width: 205px;
}

.form-field.type-2 input:disabled {
  background-color: transparent;
}

/* ============================================= */

.form-field.type-1 {
  display: flex;
  align-items: center;
  margin: 10px 0px 0px;
}

.form-field.type-1 label {
  display: inline-block;
  width: 115px;
  font-size: 24px;
  text-transform: capitalize;
  line-height: 16px;
}

.form-field.type-1 input {
  background: lavenderblush;
  border: solid #545454;
  border-color: #545454;
  color: #545454;
  text-transform: uppercase;
  border-width: 3px 4px 3px 5px;
  border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
  padding: 5px 10px;
  font-size: 0.8em;
  font-weight: bold;
  font-family: 'Patrick hand';
}

.form-field.type-1 input:disabled {
  background-color: transparent;
}

*:focus {
  outline: none;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@900&display=swap');

.fields-points {
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  color: var(--blue);
  position: absolute;
  right: 0px;
  bottom: 3px;
  padding: 2px;
  border-radius: 4px;
}
</style>
