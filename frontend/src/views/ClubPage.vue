<template>
  <template v-if="found">
    <div class="flex flex-col items-center">
      <div class="py-8 self-stretch bg-red-dark text-center text-white">
        <h1 class="font-bold self-stretch text-4xl mb-3">
          {{ name }}
        </h1>
        <div class="italic font-bold px-6">{{ shortDescription }}</div>
      </div>

      <div class="max-w-4xl">
        <div class="pt-3">
          <strong>Club Leaders:</strong>
          {{ clubLeaders }}
        </div>

        <div class="pt-3">
          <strong>Staff Supervisor:</strong>
          {{ staffSupervisor }}
        </div>

        <div class="pt-3">
          <strong>Categories:</strong>
          {{ categories }}
        </div>

        <div class="pt-3">
          <strong>Time Commitment:</strong>
          {{ timeCommitment }}
        </div>

        <div class="pt-3">
          <strong>Meeting Times:</strong>
          {{ meetingTimes }}
        </div>

        <div class="pt-3">
          <strong>Online Platforms:</strong>
          {{ onlinePlatforms }}
        </div>

        <div class="pt-3">
          <div class="font-bold">Join Instructions:</div>
          {{ joinInstructions }}
        </div>

        <div v-if="extraInformation">
          <div class="font-bold pt-3">Extra Information:</div>

          {{ extraInformation }}
        </div>
      </div>
    </div>
  </template>
  <div v-else>Sorry, no club exists at this URL. However, you can start your own!</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import clubs from '~data/clubs';

export default defineComponent({
  name: 'ClubPage',
  setup() {
    const route = useRoute();

    const clubSlug = route.params.clubSlug.toString();
    if (clubs[clubSlug] === undefined) {
      return {
        found: false,
      };
    }

    const {
      name,
      shortDescription,
      staffSupervisor,
      clubLeaders,
      categories,
      timeCommitment,
      meetingTimes,
      onlinePlatforms,
      joinInstructions,
      extraInformation,
    } = clubs[clubSlug].data;

    return {
      found: true,
      name,
      shortDescription,
      staffSupervisor,
      clubLeaders,
      categories,
      timeCommitment,
      meetingTimes,
      onlinePlatforms,
      joinInstructions,
      extraInformation,
    };
  },
});
</script>
