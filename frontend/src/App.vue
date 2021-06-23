<template>
  <router-view />
</template>

<script lang="ts">
import 'tailwindcss/tailwind.css';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: 'Kollektif';
  src: url('/fonts/Kollektif.ttf');
}

@font-face {
  font-family: 'Kollektif';
  font-weight: bold;
  src: url('/fonts/Kollektif-Bold.ttf');
}
</style>
