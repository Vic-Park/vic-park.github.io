<template>
	<div class="club-listing group">
		<div
			class="
				text-white
				mb-4
				flex
				w-full
				justify-between
				items-center
				relative
				p-8
			"
		>
			<div
				class="club-listing-background absolute inset-0 -z-1 bg-burgundy"
			></div>
			<div class="flex-shrink">
				<div class="text-2xl font-bold">{{ name }}</div>
				<div class="text-md">{{ shortDescription }}</div>
			</div>
			<div
				class="ml-4 relative cursor-pointer"
				:to="`/club/${slug}`"
				@click="animateNavigate"
			>
				<ClubImage
					:name="name"
					:slug="slug"
					image-class="club-listing-image min-w-50 w-50 h-50 rounded-full flex-shrink-0 object-cover "
				/>
				<div
					class="club-listing-arrow opacity-0 absolute inset-0 rounded-full"
					style="background-color: rgba(255, 255, 255, 0.5)"
				>
					<vue-icon
						:icon="mdiChevronRight"
						size="200px"
						class="text-black font-bold club-listing-arrow-icon"
					></vue-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mdiChevronRight } from '@mdi/js';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { getClubPageUrl } from '~/utils/club';

import ClubImage from './ClubImage.vue';

export default defineComponent({
	name: 'ClubListing',
	components: { ClubImage },
	props: {
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		shortDescription: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const clubPageUrl = getClubPageUrl(props.slug);
		const router = useRouter();

		async function animateNavigate() {
			await router.push(clubPageUrl);
		}

		return {
			animateNavigate,
			mdiChevronRight,
		};
	},
});
</script>

<style>
.club-listing-background {
	transition: transform 0.2s ease-in-out;
}

.club-listing-arrow {
	transition: opacity 0.5s;
}

.club-listing:hover .club-listing-arrow {
	display: block;
	opacity: 1;
}

.club-listing-image {
	transition: filter 0.2s;
}

.club-listing:hover .club-listing-image {
	filter: blur(4px);
}

.club-listing-background {
	box-shadow: -10px 10px #fcc534;
	transition: box-shadow 0.2s;
}

.club-listing:hover .club-listing-background {
	box-shadow: -8px 8px #fcc534;
}

.club-listing-arrow-icon {
	transition: transform 0.2s;
}

.club-listing-arrow:hover .club-listing-arrow-icon {
	transform: scale(1.1);
}

.image-blur {
	filter: blur(4px);
}
</style>
