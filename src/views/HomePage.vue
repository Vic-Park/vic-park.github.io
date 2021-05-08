<template>
  <div class="text-6xl font-bold pb-8 text-center">VPCI Clubs</div>
  <div class="text-4xl font-bold text-center pb-8">Announcements</div>
  <div v-for="announcement in announcementsArray" :key="announcement.slug" class="pb-8">
    <ClubAnnouncementListing
      :title="announcement.title"
      :date="announcement.date"
      :content="announcement.content"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import announcements from '~data/announcements';
import ClubAnnouncementListing from '~/components/ClubAnnouncementListing.vue';

export default defineComponent({
  name: 'HomePage',
  components: { ClubAnnouncementListing },
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
