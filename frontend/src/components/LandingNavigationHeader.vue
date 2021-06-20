<template>
  <div class="absolute top-0 flex flex-row inset-x-0 justify-between p-2 bg-transparent z-50">
    <NavigationHeaderContent :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationHeaderContent from './NavigationHeaderContent.vue';

const tabs = [
  {
    title: 'announcements',
    route: '/announcements',
  },
  {
    title: 'equity',
    toId: 'equity',
  },
  {
    title: 'clubs',
    toId: 'clubs',
  },
  {
    title: 'calendar',
    route: '/events',
  },
];

export default defineComponent({
  name: 'NavigationHeader',
  components: { NavigationHeaderContent },
  setup() {
    return { tabs };
  },
});
</script>
