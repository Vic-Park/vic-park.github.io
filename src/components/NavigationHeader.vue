<template>
  <div class="sticky top-0 flex flex-row justify-between p-4 bg-gray-100">
    <router-link to="/" active-class="text-blue-400">
      <span class="text-lg font-bold hover:text-blue-400">VPCI Clubs</span>
    </router-link>
    <div class="absolute left-1/2">
      <div style="margin-left: -50%">
        <img
          class="h-16 sm:h-28 border-2 border-gray-300 rounded-full shadow-lg"
          src="/img/vic-park-logo.png"
        />
      </div>
    </div>
    <div class="flex flex-row gap-x-4">
      <NavigationHeaderLink to="/clubs" title="Club List" />
      <NavigationHeaderLink to="/events" title="Events" />
    </div>
  </div>
  <div class="p-5 sm:p-12"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationHeaderLink from './NavigationHeaderLink.vue';

export default defineComponent({
  name: 'NavigationHeader',
  components: { NavigationHeaderLink },
});
</script>
