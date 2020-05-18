<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
* {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#main {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: auto;
  width: 100vw;
}

#wrapper {
  border: 1px solid black;
  width: 300px;
  height: 300px;
}

.joystick {
  background-color: blue;
  border-radius: 100%;
  cursor: pointer;
  height: 100%;
  user-select: none;
  width: 100%;
}
</style>