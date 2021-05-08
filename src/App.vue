<template>
  <NavigationHeader />
  <div class="max-w-4xl mx-auto px-8">
    <router-view />
  </div>
</template>

<script lang="ts">
import 'tailwindcss/tailwind.css';

import { defineComponent } from 'vue';

import NavigationHeader from '~/components/NavigationHeader.vue';

export default defineComponent({
  name: 'App',
  components: { NavigationHeader },
});
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
