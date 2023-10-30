<template>
    <div class="form-field">
        <label>{{id}}</label>
        <input type="text" :id="id" :v-model="id" :disabled="disabled" />
    </div>
</template>
<script setup lang="ts">
defineProps<{id: string, disabled: boolean}>()
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Bangers);
/* .form-field {
    margin-bottom: 10px;
} */

.form-field {
  display: flex;
  align-items: center;
}

.form-field label {
    display: inline-block;
    width: 100px;
    font-size: 20px;
    text-transform: capitalize;
    line-height: 16px;
}
.form-field input {
  margin: 10px 0px;
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
