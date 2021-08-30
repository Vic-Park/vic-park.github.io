<template>
	<div class="shadow-title mt-8">announcements</div>
	<div class="column items-center mt-12">
		<div class="max-w-6xl px-12">
			<div
				v-for="announcement in announcementsArray"
				:key="announcement.title"
				class="pb-8"
			>
				<ClubAnnouncementListing
					:title="announcement.title"
					:date="announcement.date.toString()"
					:content="announcement.content"
				/>
			</div>
		</div>
	</div>
	<BackToTopFab />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BackToTopFab from '~/components/BackToTopFab.vue';
import ClubAnnouncementListing from '~/components/ClubAnnouncementListing.vue';
import { createAnnouncementsArray } from '~/utils/announcement';
import announcements from '~data/announcements';

export default defineComponent({
	components: { BackToTopFab, ClubAnnouncementListing },
	setup() {
		const announcementsArray = createAnnouncementsArray(announcements);

		return { announcementsArray };
	},
});
</script>
