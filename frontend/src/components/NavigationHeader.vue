<template>
  <div class="row justify-between p-2 bg-red-dark" :class="headerClass">
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
  props: {
    headerClass: {
      type: String,
      default: '',
    },
  },
  setup() {
    return { tabs };
  },
});
</script>
