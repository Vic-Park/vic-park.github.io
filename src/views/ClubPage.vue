<template>
  <template v-if="notFound">
    Sorry, no club exists at this URL. However, you can start your own!
  </template>
  <template v-else>
    <h1 class="club-name">{{ name }}</h1>

    <h2>Club Info</h2>
    {{ longDescription }}

    <template v-if="prerequisites">
      <h3>Prerequisites</h3>
      {{ prerequisites }}
    </template>

    <p>
      <strong>Meeting Times:</strong>
      {{ meetingTimes }}
    </p>

    <p>
      <strong>Meeting Platform:</strong>
      {{ meetingPlatform }}
    </p>

    <template v-if="moreInfo">
      {{ moreInfo }}
    </template>
  </template>
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
        notFound: true,
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

<style scoped lang="scss">
.club-name {
  margin-bottom: 3rem;
}
</style>
