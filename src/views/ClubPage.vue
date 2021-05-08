<template>
  <div />
  <!--
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
  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ClubPage",
  setup(props, ctx) {
    const $route = useRoute();
  },
});
</script>

<style scoped lang="scss">
.club-name {
  margin-bottom: 3rem;
}
</style>
