<template>
  <div
    style="text-shadow: 2px 2px #db7f43"
    class="text-white font-bold text-4xl self-stretch text-center bg-red-dark p-6"
  >
    announcements
  </div>
  <div class="flex flex-col items-center mt-12">
    <div class="max-w-6xl px-12">
      <div v-for="announcement in announcementsArray" :key="announcement.title" class="pb-8">
        <ClubAnnouncementListing
          :title="announcement.title"
          :date="announcement.date.toString()"
          :content="announcement.content"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ClubAnnouncementListing from '~/components/ClubAnnouncementListing.vue';
import { createAnnouncementsArray } from '~/utils/announcement';
import announcements from '~data/announcements';

export default defineComponent({
  components: { ClubAnnouncementListing },
  setup() {
    const announcementsArray = createAnnouncementsArray(announcements);

    return { announcementsArray };
  },
});
</script>
