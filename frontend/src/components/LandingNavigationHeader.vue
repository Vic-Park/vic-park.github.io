<template>
  <div class="absolute top-0 flex flex-row inset-x-0 justify-between p-2 bg-transparent z-50">
    <NavigationHeaderContent :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tab } from '~/types/tab';

import NavigationHeaderContent from './NavigationHeaderContent.vue';

const tabs: Tab[] = [
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
    route: '/clubs',
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
