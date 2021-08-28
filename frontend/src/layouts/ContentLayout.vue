<template>
  <div class="flex flex-col w-full h-full">
    <NavigationHeader
      v-if="route.meta.hideNavigationHeader !== true"
      :headerClass="route.meta.navigationHeaderClass"
    />
    <div class="flex-grow">
      <router-view />
    </div>
    <WebsiteFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import NavigationHeader from '~/components/NavigationHeader.vue';
import WebsiteFooter from '~/components/WebsiteFooter.vue';

export default defineComponent({
  components: { NavigationHeader, WebsiteFooter },
  setup() {
    const route = useRoute();

    return { route };
  },
});
</script>
