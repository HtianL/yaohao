<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
h2,
p,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
}
.mu-form-item-label {
  color: #000;
  font-weight: bold;
}
::-webkit-input-placeholder {
  font-size: 14px;
}
</style>
