<template>
    <button @click="$emit('click')"><slot></slot></button>
</template>

<style>
button {
  background-color: var(--primary);
  color: var(--white);
  fill: var(--white);
  border: 0;
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 1.5em;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  /* -webkit-box-shadow: 5px 7px 0px 3px var(--secundary);
  box-shadow: 5px 7px 0px 3px var(--secundary); */
  transition: all 200ms linear;
  cursor: pointer;
  border: 5px solid var(--primary);
  font-weight: bold;
}
button:hover {
  background-color: var(--white);
  color: var(--primary);
}
</style>