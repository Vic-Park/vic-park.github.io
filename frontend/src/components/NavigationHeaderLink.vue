<template>
  <template v-if="toId">
    <div @click="scrollToId" class="cursor-pointer text-white text-lg hover:text-blue-400">
      {{ title }}
    </div>
  </template>
  <template v-else>
    <router-link :to="toId" active-class="text-blue-400">
      <div class="text-white text-lg hover:text-blue-400">{{ title }}</div>
    </router-link>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
