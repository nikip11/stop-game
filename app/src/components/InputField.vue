<template>
    <div class="form-field">
        <label>{{id}}</label>
        <input type="text" :id="id" :name="id" @change="$emit('change')" :disabled="disabled" />
    </div>
</template>
<script setup lang="ts">
defineProps<{id: string, disabled: boolean}>()
</script>
<style>
.form-field {
    margin-bottom: 10px;
}
.form-field label {
    display: inline-block;
    width: 100px;
}
.form-field input {
    padding: 5px 10px;
    border-radius: 15px;
    background-color: var(--white);
    border: 1px solid rgba(3, 3, 3, 0.7);
    color: var(--black);
}

.form-field input:disabled {
    background-color: cadetblue;
    
}
</style>