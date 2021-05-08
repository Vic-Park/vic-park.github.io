<template>
  <NavigationHeader />
  <router-view />
</template>

<script lang="ts">
import "tailwindcss/tailwind.css";
import { defineComponent } from "vue";
import NavigationHeader from "~/components/NavigationHeader.vue";

export default defineComponent({
  components: { NavigationHeader },
});
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
