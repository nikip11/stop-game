<template>
    <div class="form-field">
        <label>{{id}}</label>
        <input type="text" :id="id" :disabled="disabled" :value="modelValue" @input="updateValue"/>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    id: string, 
    disabled: boolean, 
    type?: { type: string, default: 'text'},
    modelValue: unknown
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
}
.form-field {
  display: flex;
  align-items: center;
  margin: 10px 0px 0px;
}

.form-field label {
    display: inline-block;
    width: 115px;
    font-size: 24px;
    text-transform: capitalize;
    line-height: 16px;
}
.form-field input {
  background:lavenderblush;
  border: solid #545454;
  border-color: #545454;
  color: #545454;
  text-transform: uppercase;
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  padding: 5px 10px;
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Patrick hand';
}

.form-field input:disabled {
    background-color: cadetblue;

}
*:focus {
    outline: none;
}

</style>
