<template>
  <LandingNavigationHeader />
  <HeroBanner />
  <div class="flex flex-col items-center">
    <div id="equity" class="mb-2 mt-8 font-kollektif text-center text-red text-4xl">
      clubs equity statement
    </div>
    <div class="max-w-4xl italic font-medium text-red-dark text-center">
      Clubs offered at VP aim to create inclusive spaces for everyone. Students of all identities
      and experiences are welcome to join clubs where members can come together based on shared
      interests. Each club is a reflection of the larger school community where all voices are
      valued and heard.
    </div>
    <ClubGallery class="my-8" />
    <div class="max-w-6xl mb-8 flex flex-col">
      <div class="text-4xl font-bold text-center pb-8">Recent Announcements</div>
      <div v-for="announcement in announcementsArray" :key="announcement.slug" class="pb-8">
        <ClubAnnouncementListing
          :title="announcement.title"
          :date="announcement.date"
          :content="announcement.content"
        />
      </div>
      <div class="group self-center">
        <router-link to="/announcements" class="group-hover:text-red announcements-link">
          <div class="inline-flex flex-row items-center">
            View all announcements
            <vue-icon :icon="mdiArrowRight" size="20px" class="ml-1 group-hover:text-red" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js';
import { defineComponent } from 'vue';

import ClubAnnouncementListing from '~/components/ClubAnnouncementListing.vue';
import ClubGallery from '~/components/ClubGallery.vue';
import HeroBanner from '~/components/HeroBanner.vue';
import LandingNavigationHeader from '~/components/LandingNavigationHeader.vue';
import { createAnnouncementsArray } from '~/utils/announcement';
import announcements from '~data/announcements';

export default defineComponent({
  name: 'HomePage',
  components: {
    LandingNavigationHeader,
    HeroBanner,
    ClubAnnouncementListing,
    ClubGallery,
  },
  setup() {
    // Only retrieving the latest 3 announcements
    const announcementsArray = createAnnouncementsArray(announcements).slice(0, 3);

    return {
      announcementsArray,
      mdiArrowRight,
    };
  },
});
</script>