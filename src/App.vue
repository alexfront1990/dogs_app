<template>
  <div id="app" class="app">
    <div class="overlay" :class="IS_OVERLAY ? 'overlay--active' : ''"></div>
    <Header />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/Header/Header";
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {
    Header,
  },
  computed: {
    ...mapGetters(["IS_OVERLAY"]),
  },
};
</script>

<style lang="scss">
html {
  background: linear-gradient(180deg, #1b1a1f 0%, #111013 99.09%);
   color: #626262;
}
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}


button {
  cursor: pointer;
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
  background: linear-gradient(180deg, #1b1a1f 0%, #111013 99.09%);
}

.container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 0px 20px;
}

.cards-wrap {
  display: flex;
  margin: 0px -8px;
  flex-wrap: wrap;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: transparent;
  top: 0px;
  left: 0px;
  z-index: 0;
  opacity: 0;
  &--active {
    z-index: 3;
    background: rgba(21, 20, 25, 0.7);
    opacity: 1;
    overflow: hidden;
    transition: 0.3s;
    cursor: pointer;
  }
}

//styles compoentns

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

//loader
</style>
