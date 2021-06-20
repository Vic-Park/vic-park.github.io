<template>
  <div class="flex flex-1 flex-row gap-x-4 justify-end">
    <NavigationHeaderLink
      class="mx-2"
      :key="tab.title"
      v-for="tab in tabs"
      :route="tab.route"
      :toId="tab.toId"
      :title="tab.title"
      :class="tab.class"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationHeaderLink from './NavigationHeaderLink.vue';

export default defineComponent({
  name: 'NavigationHeader',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  components: { NavigationHeaderLink },
});
</script>
