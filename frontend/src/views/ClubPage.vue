<template>
  <template v-if="found">
    <div class="flex flex-col items-center text-xl pb-12">
      <div class="py-8 self-stretch bg-red-dark text-center text-white flex flex-col items-center">
        <h1 class="font-bold self-stretch font-kollektif text-6xl mb-3">
          {{ name }}
        </h1>
        <div class="italic font-bold px-6 max-w-4xl leading-9">
          {{ shortDescription }}
        </div>
      </div>

      <div class="max-w-4xl text-left">
        <div v-for="{ name, content } in sections" :key="name">
          <div v-if="content !== ''" class="pt-12">
            <strong class="block">{{ name }}:</strong>
            {{ content }}
          </div>
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

    const sections = [
      {
        name: 'Staff Supervisor',
        content: staffSupervisor,
      },
      {
        name: 'Club Leaders',
        content: clubLeaders,
      },
      {
        name: 'Categories',
        content: categories,
      },
      {
        name: 'Time Commitment',
        content: timeCommitment,
      },
      {
        name: 'Meeting Times',
        content: meetingTimes,
      },
      {
        name: 'Online Platforms',
        content: onlinePlatforms,
      },
      {
        name: 'Join Instructions',
        content: joinInstructions,
      },
      {
        name: 'Extra Information',
        content: extraInformation,
      },
    ];

    return {
      found: true,
      name,
      shortDescription,
      sections,
    };
  },
});
</script>
