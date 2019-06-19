<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 50px 20px;
    width: 100%;
    min-height: 100vh;
    background-color: #c4d3f6;
  }
</style>
