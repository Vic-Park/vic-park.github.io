<template>
	<template v-if="found">
		<div class="flex flex-col items-center text-xl pb-12 club-page">
			<div class="py-8 self-stretch bg-red-dark text-center text-white flex flex-col items-center">
				<h1 class="font-bold font-kollektif text-6xl mb-3 max-w-4xl">
					{{ name }}
				</h1>
				<div class="italic font-bold px-6 max-w-4xl leading-9">
					{{ equityStatement }}
				</div>
			</div>

			<div class="w-full max-w-xl">
				<img
					:src="imgPath"
					v-if="!imageNotFound"
					class="mt-12 px-6 w-full"
					@error="imageNotFound = true"
				/>
			</div>

			<div class="max-w-4xl text-left px-8">
				<div v-for="{ name, content } in sections" :key="name">
					<div v-if="content !== ''" class="pt-12">
						<strong class="block">{{ name }}:</strong>
						<div v-html="content"></div>
					</div>
				</div>
			</div>
		</div>
	</template>
	<div v-else>Sorry, no club exists at this URL. However, you can start your own!</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Autolinker from 'autolinker';
import DOMPurify from 'dompurify';

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
			equityStatement,
		} = clubs[clubSlug].data;

		const processedEquityStatement = equityStatement.replace(/\[|\]/g, '');

		const sections = [
			{
				name: 'Description',
				content: shortDescription,
			},
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
		].map((section) => {
			return {
				...section,
				content: DOMPurify.sanitize(
					Autolinker.link(section.content, {
						mention: 'instagram',
					})
				),
			};
		});

		const imgPath = `/img/club-thumbnail-img/${clubSlug}.jpg`;

		const imageNotFound = ref(false);

		return {
			found: true,
			imageNotFound,
			name,
			equityStatement: processedEquityStatement,
			sections,
			imgPath,
		};
	},
});
</script>

<style lang="postcss">
.club-page a {
	@apply underline text-blue-600 hover:text-blue-800;
}
</style>
