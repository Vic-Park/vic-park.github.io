<template>
	<div class="column items-center px-8 max-w-6xl mx-auto">
		<div class="shadow-title my-8">clubs</div>

		<div class="row justify-between h-10 w-full items-start mb-8 relative">
			<!-- Add/update club button -->
			<button
				id="update-club-button"
				w:p='l-2 y-2 r-3'
				class="
					bg-blue-400
					row
					items-center
					text-white
					font-medium
					cursor-pointer
					relative
				"
				@click="isAddClubTooltipVisible = !isAddClubTooltipVisible"
			>
				<vue-icon :icon="mdiPlus" class="mr-1" size="24px" />
				add club
			</button>

			<vue-tooltip
				v-model="isAddClubTooltipVisible"
				reference="#update-club-button"
				class="max-w-full overflow-hidden"
			>
				<div
					class="
						max-w-150
						bg-white
						text-black
						p-4
						border-blue-400 border-2
						rounded-md
						mt-1
					"
				>
					To add a club to this list, please fill out the following Google Form:
					<br />
					<a class="link" href="https://forms.gle/qeFtjLJmUcvW7Vwo8"
						>https://forms.gle/qeFtjLJmUcvW7Vwo8</a
					>
					<br />
					<div class="text-sm mt-1">
						<span class="font-bold">Note:</span> You must be signed in with your
						TDSB account to access the form.
					</div>
				</div>
			</vue-tooltip>

			<!-- Search club input box -->
			<div class="relative w-60 self-end">
				<vue-icon
					class="search-icon text-gray-300 absolute"
					:icon="mdiMagnify"
					height="100%"
				/>
				<input
					v-model="searchQuery"
					w:border="2 gray-300"
					w:focus="outline-none ring-2 ring-yellow-deep border-transparent"
					class="
						pl-3
						self-center
						w-full
						h-full
						max-w-md
						p-1
						font-kollektif
						text-xl
					"
					placeholder="search club"
				/>
			</div>
		</div>

		<!-- Club list -->
		<div class="column">
			<template v-if="filteredClubs.length > 0">
				<div v-for="club in filteredClubs" :key="club.slug" class="pb-2">
					<ClubListing
						:name="club.name"
						:short-description="club.shortDescription"
						:slug="club.slug"
					/>
				</div>
			</template>
			<div v-else class="text-center">
				Unfortunately, we couldn't find a club that meets this criteria.
				However, you can always start your own club!
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mdiMagnify, mdiPlus } from '@mdi/js';
import { computed, defineComponent, ref } from 'vue';

import ClubListing from '~/components/club-listing.vue';
import { getClubsArray } from '~/utils/club';
import clubs from '~data/clubs';

export default defineComponent({
	name: 'ClubsListPage',
	components: { ClubListing },
	setup() {
		const searchQuery = ref('');
		const clubsArray = getClubsArray(clubs);
		const isAddClubTooltipVisible = ref(false);

		const filteredClubs = computed(() => {
			const query = searchQuery.value.toLowerCase();
			return clubsArray
				.filter(
					({ name, shortDescription }) =>
						name.toLowerCase().includes(query) ||
						shortDescription.toLowerCase().includes(query)
				)
				.map(({ slug, name, shortDescription }) => ({
					name,
					slug,
					shortDescription,
				}));
		});

		type ClubSummary = {
			name: string;
			slug: string;
			shortDescription: string;
		};

		const categories: Record<string, ClubSummary[]> = {};
		for (const club of clubsArray) {
			const clubCategories = club.categories?.split(',') ?? [];
			for (const unnormalizedCategory of clubCategories) {
				const category = unnormalizedCategory.trim();
				categories[category] = categories[category] ?? [];
				categories[category].push({
					name: club.name,
					slug: club.slug,
					shortDescription: club.shortDescription,
				});
			}
		}

		return {
			searchQuery,
			filteredClubs,
			mdiMagnify,
			mdiPlus,
			isAddClubTooltipVisible,
		};
	},
});
</script>

<style scoped>
.search-icon {
	right: 0;
	pointer-events: none;
}
</style>
