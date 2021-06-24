<template>
  <template v-if="toId">
    <div @click="scrollToId" class="cursor-pointer text-white text-lg hover:text-blue-400">
      {{ title }}
    </div>
  </template>
  <template v-else>
    <slot name="link">
      <div class="text-white">
        <router-link :to="route" active-class="text-gray-300">
          <div class="text-lg hover:text-gray-300">{{ title }}</div>
        </router-link>
      </div>
    </slot>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    function scrollToId() {
      document.getElementById(props.toId)!.scrollIntoView({ behavior: 'smooth' });
    }

    return {
      scrollToId,
    };
  },
});
</script>
