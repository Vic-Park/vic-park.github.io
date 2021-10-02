<template>
	<div class="flip-card w-[20rem] h-[20rem]" @click="onClick">
		<div class="flip-card-inner h-full w-full relative" :style="cardStyle">
			<div
				class="flip-card-front absolute w-full h-full"
				:style="frontCardStyle"
			>
				<ImageWithFallback
					class="absolute w-full h-full object-cover object-center"
					:src="clubIconUrl"
					:alt="name"
				>
					<template #fallback>
						<div
							w:text="3xl center"
							class="
								fallback-card-cover
								font-bold
								absolute
								top-1/2
								left-1/2
								p-8
								w-full
								column
								items-center
							"
						>
							{{ name }}
							<img src="/images/vic-park-logo.png" width="150" />
						</div>
					</template>
				</ImageWithFallback>
			</div>
			<div
				class="flip-card-back w-full h-full p-4 column items-center"
				w:text="burgundy center"
			>
				<h4 w:text="xl center" class="font-bold uppercase mb-2">{{ name }}</h4>
				<div ref="equityStatementContainer" class="text-md overflow-hidden">
					<p ref="equityStatementTextContainer">
						{{ clubExcerpt }}
					</p>
				</div>
				<div class="column mt-auto">
					<router-link :to="clubPageUrl" class="self-center">
						<vue-icon
							:icon="mdiArrowRight"
							size="30px"
							w:text="yellow hover:burgundy"
							@click.stop
						/>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js';
import type * as CSS from 'csstype';
import shave from 'shave';
import { computed, defineComponent, ref } from 'vue';

import { getClubIconUrl, getClubPageUrl } from '~/utils/club';

import ImageWithFallback from './image-with-fallback.vue';

export default defineComponent({
	components: { ImageWithFallback },
	props: {
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		equityStatement: {
			type: String,
			default: undefined,
		},
	},
	setup(props) {
		const isDescriptionActive = ref(false);
		const clubExcerptContainer = ref<HTMLDivElement>();
		const clubExcerptTextContainer = ref<HTMLParagraphElement>();

		const cardStyle = computed(() => ({
			transform: isDescriptionActive.value ? 'rotateY(180deg)' : undefined,
		}));

		const frontCardStyle = computed<CSS.Properties>(() => ({
			pointerEvents: isDescriptionActive.value ? 'none' : 'auto',
		}));

		let isShaveRegistered = false;
		function onClick() {
			isDescriptionActive.value = !isDescriptionActive.value;

			if (!isShaveRegistered) {
				isShaveRegistered = true;
				shave(
					clubExcerptTextContainer.value!,
					clubExcerptContainer.value!.getBoundingClientRect().height
				);
			}
		}

		const clubExcerpt = computed(() => {
			if (props.equityStatement !== undefined) {
				const openingBracketIndex = props.equityStatement.indexOf('[');
				const closingBracketIndex = props.equityStatement.indexOf(']');
				return props.equityStatement.slice(
					openingBracketIndex + 1,
					closingBracketIndex
				);
			} else {
				return props.description;
			}
		});

		const clubIconUrl = getClubIconUrl(props.slug);
		const clubPageUrl = getClubPageUrl(props.slug);

		return {
			clubIconUrl,
			clubPageUrl,
			mdiArrowRight,
			onClick,
			cardStyle,
			frontCardStyle,
			clubExcerpt,
			clubExcerptContainer,
			clubExcerptTextContainer,
		};
	},
});
</script>

<style scoped>
.flip-card-front,
.flip-card-back {
	position: absolute;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	background-color: white;
}

.flip-card {
	background-color: transparent;
	perspective: 1000px;
}

.flip-card-inner {
	position: absolute;
	cursor: pointer;
	transition: transform 0.5s;
	transform-style: preserve-3d;
}

.fallback-card-cover {
	transform: translateX(-50%) translateY(-50%);
}

.flip-card-back {
	transform: rotateY(180deg);
}
</style>
