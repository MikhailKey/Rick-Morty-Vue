<template>
  <div class="app">
    <Header />
  </div>
  <router-view />
</template>

<script>
import Header from "@/components/Header/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "~normalize.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 90%;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
  padding: 0;
}
</style>
