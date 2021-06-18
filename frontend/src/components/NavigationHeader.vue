<template>
  <div class="absolute top-0 flex flex-row inset-x-0 justify-between p-2 bg-transparent z-50">
    <div class="flex flex-1 flex-row gap-x-4 justify-end">
      <NavigationHeaderLink
        class="mx-2"
        :key="title"
        v-for="{ title, route, toId } in tabs"
        :route="route"
        :toId="toId"
        :title="title"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import NavigationHeaderLink from './NavigationHeaderLink.vue';

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
      tabs,
    };
  },
});
</script>

<style scoped></style>
