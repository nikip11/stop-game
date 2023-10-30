<template>
    <button @click="handleClick">
      <span><slot></slot></span>
    </button>
</template>
<script setup lang="ts">

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<style scoped>
/* button {
  background-color: var(--primary);
  color: var(--white);
  fill: var(--white);
  border: 0;
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 1.5em;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 5px 7px 0px 3px var(--secundary);
  transition: all 200ms linear;
  cursor: pointer;
  border: 5px solid var(--primary);
  font-weight: bold;
}
button:hover {
  background-color: var(--white);
  color: var(--primary);
} */

@import url("https://fonts.googleapis.com/css?family=Patrick+Hand");

button span {
  background: #FFF;
  display: block;
  padding: 5px 15px;
  border-radius: 5px;
  border: 2px solid #000;
  color: #000;
}
button:hover {
  box-shadow: 0 2px 0 #000, 0 4px 0px 2px #f03755;
}
button:active {
  top: 4px;
  padding-bottom: 0px;
  box-shadow: 0 1px 0 #000;
}
button {
  font: normal 30px/45px "Patrick Hand", sans-serif;
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  padding: 0px 0px 5px 0px;
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
  transition: padding 0.1s, box-shadow 0.1s, top 0.1s;
  border: 0;
  background-image: url('data:image/gif;base64,R0lGODlhBAAEAIABAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUY1OENCRDdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUY1OENCRTdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RjU4Q0JCN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RjU4Q0JDN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAQABAAAAgYEEpdoeQUAOw==');
}
</style>
