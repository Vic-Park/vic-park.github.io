<template>
  <div class="flex flex-1 flex-row gap-x-4 justify-end">
    <NavigationHeaderLink
      class="mx-2"
      v-for="tab in tabs"
      :key="tab.title"
      :route="tab.route"
      :toId="tab.toId"
      :title="tab.title"
      :class="tab.class"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Tab } from '~/types/tab';

import NavigationHeaderLink from './NavigationHeaderLink.vue';

export default defineComponent({
  name: 'NavigationHeader',
  props: {
    tabs: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
  },
  components: { NavigationHeaderLink },
});
</script>
