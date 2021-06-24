<template>
  <slot name="link">
    <template v-if="toId">
      <div @click="scrollToId(toId)" class="cursor-pointer text-white text-lg hover:text-blue-400">
        {{ title }}
      </div>
    </template>
    <template v-else>
      <div class="text-white">
        <router-link :to="route" active-class="text-gray-300">
          <div class="text-lg hover:text-gray-300">{{ title }}</div>
        </router-link>
      </div>
    </template>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollToId } from '~/utils/scroll';

export default defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    toId: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      scrollToId,
    };
  },
});
</script>
