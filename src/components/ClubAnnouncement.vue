<template>
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

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: String,
      default: null,
    },
    longDescription: {
      type: String,
      required: true,
    },
    meetingTimes: {
      type: String,
      required: true,
    },
    meetingPlatform: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
      default: null,
    },
  },
});
</script>

<style scoped lang="scss">
.club-name {
  margin-bottom: 3rem;
}
</style>
