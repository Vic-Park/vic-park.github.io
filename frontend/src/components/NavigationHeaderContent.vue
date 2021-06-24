<template>
  <NavigationHeaderLink class="mx-2 mr-auto" route="/" title="home" />
  <div class="hidden md:flex flex-1 flex-row gap-x-4 justify-end">
    <div v-for="tab in tabs" :key="tab.title" class="mx-2">
      <NavigationHeaderLink
        :route="tab.route"
        :toId="tab.toId"
        :title="tab.title"
        :class="tab.class"
      />
    </div>
  </div>
  <div class="md:hidden">
    <vue-icon
      :icon="mdiMenu"
      class="text-white h-full mr-2 cursor-pointer"
      size="20px"
      @click="onMenuClick"
    />
    <div v-if="isMenuVisible" class="relative z-50">
      <div class="flex flex-col absolute right-0 border rounded-sm overflow-hidden bg-white p-1">
        <div v-for="tab in tabs" :key="tab.title">
          <NavigationHeaderLink
            :key="tab.title"
            :route="tab.route"
            :toId="tab.toId"
            :title="tab.title"
            :class="tab.class"
          >
            <template #link>
              <router-link :to="route" active-class="text-red">
                <div class="text-lg hover:text-red">{{ tab.title }}</div>
              </router-link>
            </template>
          </NavigationHeaderLink>
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
