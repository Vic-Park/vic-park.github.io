<template>
  <NavigationHeader />
  <HeroBanner />
  <div class='flex flex-col items-center'>
    <div class="mb-2 mt-8 font-kollektif text-center text-red text-4xl">clubs equity statement</div>
    <div class="max-w-4xl italic font-medium text-red-dark text-center">
      Clubs offered at VP aim to create inclusive spaces for everyone. Students of all identities
      and experiences are welcome to join clubs where members can come together based on shared
      interests. Each club is a reflection of the larger school community where all voices are
      valued and heard.
    </div>
    <ClubGallery />
    <div class="text-4xl font-bold text-center pb-8">Announcements</div>
    <div v-for="announcement in announcementsArray" :key="announcement.slug" class="pb-8">
      <ClubAnnouncementListing
        :title="announcement.title"
        :date="announcement.date"
        :content="announcement.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ClubAnnouncementListing from '~/components/ClubAnnouncementListing.vue';
import ClubGallery from '~/components/ClubGallery.vue';
import HeroBanner from '~/components/HeroBanner.vue';
import NavigationHeader from '~/components/NavigationHeader.vue';
import announcements from '~data/announcements';

export default defineComponent({
  name: 'HomePage',
  components: { NavigationHeader, HeroBanner, ClubAnnouncementListing, ClubGallery },
  setup() {
    const announcementsArray = Object.values(announcements)
      .map(({ data, content }) => ({
        title: data.title,
        date: data.date,
        content,
      }))
      .sort((a1, a2) => {
        const a1Date = new Date(a1.date);
        const a2Date = new Date(a2.date);
        if (a1Date > a2Date) {
          return -1;
        }
        if (a1Date < a2Date) {
          return 1;
        }
        return 0;
      });

    return {
      announcementsArray,
    };
  },
});
</script>
