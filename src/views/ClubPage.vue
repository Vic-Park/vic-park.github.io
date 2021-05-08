<template>
  <template v-if="found">
    <h1 class="font-bold text-center text-5xl pb-2">{{ name }}</h1>
    <div class="text-center pb-3">{{ shortDescription }}</div>

    <h2 class="font-bold text-2xl">Club Info</h2>
    <div>
      {{ longDescription }}
    </div>

    <div v-if="prerequisites" class="pt-3">
      <h3 class="font-bold text-2xl">Prerequisites</h3>
      {{ prerequisites }}
    </div>

    <div class="pt-3">
      <strong>Meeting Times:</strong>
      {{ meetingTimes }}
    </div>

    <div class='pt-3'>
      <strong>Meeting Platform:</strong>
      {{ meetingPlatform }}
    </div>

    <div v-if="moreInfo">
      <div class="font-bold pt-3">Additional Information:</div>

      {{ moreInfo }}
    </div>
  </template>
  <div v-else>
    Sorry, no club exists at this URL. However, you can start your own!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import clubs from '~data/clubs';

export default defineComponent({
  name: 'ClubPage',
  setup() {
    const $route = useRoute();

    const clubSlug = $route.params.clubSlug.toString();
    if (clubs[clubSlug] === undefined) {
      return {
        found: false,
      };
    }

    const {
      name,
      shortDescription,
      longDescription,
      prerequisites,
      meetingTimes,
      meetingPlatform,
      moreInfo,
    } = clubs[clubSlug].data;

    return {
      found: true,

      name,
      shortDescription,
      longDescription,
      prerequisites,
      meetingTimes,
      meetingPlatform,
      moreInfo,
    };
  },
});
</script>
