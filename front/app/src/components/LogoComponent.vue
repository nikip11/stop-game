<template>
  <h1 id="logo">
    <span>S</span>
    <span>T</span>
    <span>O</span>
    <span>P</span>
    <span>!</span>
  </h1>
  <!-- <div class="logo-container">
    <div class="img-tape ">
      <h1 id="logo">STOP!</h1>
    </div>
  </div> -->
</template>
<style>
#logo {
  transform: rotate(-10deg);
  font-family: 'HandWrite';
}

.img-tape {
  position: relative;
  text-align: center;
  display: inline-block;
  /* margin: 20px auto 10px; */
  width: 270px;
  height: 270px;
  background-color: #c1121f;
  color: #fdf0d5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 25px solid #669bbc;
  border-radius: 5px;
}

.img-tape:before,
.img-tape:after {
  background: rgba(255, 255, 235, .6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
  content: "";
  display: block;
  height: 30px;
  position: absolute;
  margin: auto;
  width: 100px;
}

.img-tape:before {
  left: -55px;
  top: -20px;
  transform: rotate(-45deg);
}

.img-tape:after {
  bottom: -20px;
  right: -55px;
  transform: rotate(-35deg);
}
</style>
