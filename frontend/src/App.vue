<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <router-view />
    </div>
    <div class="flex-none">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from '~/components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
  },
});
</script>

<style lang="postcss">
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
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

@font-face {
  font-family: 'Glacial Indifference';
  src: url('/fonts/GlacialIndifference-Regular.otf');
}

@font-face {
  font-family: 'Glacial Indifference';
  font-weight: bold;
  src: url('/fonts/GlacialIndifference-Bold.otf');
}
</style>
