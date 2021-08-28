<template>
  <div class="flex flex-col w-full h-full">
    <navigation-header :header-class="headerClass" />
    <div class="flex-grow">
      <router-view />
    </div>
    <website-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationHeader from '~/components/NavigationHeader.vue';
import WebsiteFooter from '~/components/WebsiteFooter.vue';

export default defineComponent({
  props: {
    headerClass: {
      type: String,
      default: '',
    },
  },
  components: { NavigationHeader, WebsiteFooter },
});
</script>
