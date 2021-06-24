<template>
  <NavigationHeaderLink class="mx-2 mr-auto" route="/" title="home" />
  <div class="hidden md:flex flex-1 flex-row gap-x-4 justify-end ">
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
  <div class="md:hidden">
    <vue-icon :icon="mdiMenu" class="text-white h-full mr-2" size="20px" @click="onMenuClick" />
    <div v-if="isMenuVisible" class="relative z-50">
      <div class="flex flex-col absolute right-0 border rounded-sm overflow-hidden bg-white p-1">
        <div v-for="tab in tabs" :key="tab.title">
          <NavigationHeaderLink
            textClass='p-2'
            class="text-burgundy"
            :key="tab.title"
            :route="tab.route"
            :toId="tab.toId"
            :title="tab.title"
            :class="tab.class"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Tab } from '~/types/tab';
import { mdiMenu } from '@mdi/js';

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
  setup() {
    const isMenuVisible = ref(false);

    function onMenuClick() {
      isMenuVisible.value = !isMenuVisible.value;
    }

    return {
      mdiMenu,
      isMenuVisible,
      onMenuClick,
    };
  },
});
</script>
