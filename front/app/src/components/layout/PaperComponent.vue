<template>
  <div id="paper">
    <div id="paper-grid">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
#paper {
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 0 #00486B;
  background-image:
    linear-gradient(90deg,
      #fff 12px, 0,
      #00486B 15px, 0,
      #1373A9 20px, 0,
      #fff 100%),
    radial-gradient(circle closest-side,
      rgba(255, 255, 255, 0) 88%,
      #fff 100%),
    radial-gradient(circle at 22px 8px,
      #1373A9 40%,
      #00486B 40%,
      #00486B 100%);
  background-size: 32px 8px, 32px 16px, 32px 16px;
  background-repeat: space no-repeat;
  background-position: center top, center 6px, center 6px;
  min-width: 375px;
  padding: 40px 20px 20px;
}

#paper-grid {
  background-size: 41.5px 41.5px;
  background-image:
    linear-gradient(to right, rgb(174, 179, 255) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(174, 179, 255) 1px, transparent 1px);
}
</style>
