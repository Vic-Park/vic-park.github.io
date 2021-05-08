<template>
  <h1 class="text-2xl font-bold pb-1">{{ title }}</h1>
  <div class="text-sm pb-2">{{ date }}</div>
  <div>
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClubAnnouncementListing',
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
  },
});
</script>
