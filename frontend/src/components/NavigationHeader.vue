<template>
  <div class="sticky top-0 flex flex-row justify-between p-4 bg-gray-100 z-50">
    <router-link to="/" active-class="text-blue-400" class="p-4">
      <span class="text-lg font-bold hover:text-blue-400">VPCI Clubs</span>
    </router-link>
    <div class="absolute left-1/2">
      <div style="margin-left: -50%">
        <img
          class="border-2 border-gray-300 rounded-full transition-height"
          :class="[isLargeLogo ? 'h-16 sm:h-28 shadow-lg' : 'h-16']"
          src="/img/vic-park-logo.png"
        />
      </div>
    </div>
    <div class="flex flex-row gap-x-4 p-4">
      <NavigationHeaderLink to="/clubs" title="Club List" />
      <NavigationHeaderLink to="/events" title="Events" />
    </div>
  </div>
  <div class="p-5 sm:p-12"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import NavigationHeaderLink from './NavigationHeaderLink.vue';

export default defineComponent({
  name: 'NavigationHeader',
  components: { NavigationHeaderLink },
  setup() {
    const isLargeLogo = ref(true);

    function onScroll() {
      if (window.top.scrollY > 0) {
        isLargeLogo.value = false;
      } else {
        isLargeLogo.value = true;
      }
    }

    onMounted(() => {
      onScroll();
      window.addEventListener('scroll', onScroll);
    });

    return {
      isLargeLogo,
    };
  },
});
</script>
