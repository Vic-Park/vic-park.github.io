<template>
  <NavigationHeader />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationHeader from '~/components/NavigationHeader.vue';
import Footer from '~/components/Footer.vue';

export default defineComponent({
  components: { NavigationHeader, Footer },
});
</script>
