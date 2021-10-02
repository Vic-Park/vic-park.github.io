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
				<div ref="clubExcerptContainer" class="text-md overflow-hidden">
					<p ref="clubExcerptTextContainer">
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

/**
 * An individual card in the club gallery. The front side of the card is the club icon, and the back
 * side is the equity statement (with a fallback to the club description if the club hasn't yet provided an
 * equity statement).
 */
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
		// References to the excerpt containers to be provided to the `shave` package
		const clubExcerptContainer = ref<HTMLDivElement>();
		const clubExcerptTextContainer = ref<HTMLParagraphElement>();

		// shave (https://npm.im/shave) is a package that dynamically trims text and restricts it to
		// a max height. We use shave to prevent the text from overflowing the container on the back of
		// the club gallery card.
		function registerShave() {
			shave(
				clubExcerptTextContainer.value!,
				clubExcerptContainer.value!.getBoundingClientRect().height
			);
		}

		/** Whether the back of the card is shown or not */
		const isBackShown = ref(false);

		const cardStyle = computed(() => ({
			// Rotate the card 180 degrees along the y-axis when the back is shown
			transform: isBackShown.value ? 'rotateY(180deg)' : undefined,
		}));

		const frontCardStyle = computed<CSS.Properties>(() => ({
			// Prevents the user from dragging the image when they try to select text
			// on the back of the card
			pointerEvents: isBackShown.value ? 'none' : 'auto',
		}));

		let isShaveRegistered = false;
		function onClick() {
			// Flip the card by showing the back if the front is shown and otherwise re-showing
			// the front
			isBackShown.value = !isBackShown.value;
			// Make sure shave is only registered once (since after its first registered, it adds a
			// listener to the element and doesn't need to be re-registered).
			if (!isShaveRegistered) {
				isShaveRegistered = true;
				registerShave();
			}
		}

		/**
		 * If the club has an equity statement, the club excerpt consists of the clipped part (the part
		 * between the [] brackets). Otherwise, use the club description as the club excerpt.
		 */
		const clubExcerpt = computed(() => {
			if (props.equityStatement !== undefined) {
				// Retrieve the string between the [] brackets
				const openingBracketIndex = props.equityStatement.indexOf('[');
				const closingBracketIndex = props.equityStatement.indexOf(']');
				let clippedEquityStatement = props.equityStatement.slice(
					openingBracketIndex + 1,
					closingBracketIndex
				);

				// If the last character ends with a number or a letter, then add a period
				if (
					/\w|\d/.test(clippedEquityStatement[clippedEquityStatement.length - 1])
				) {
					clippedEquityStatement += '.';
				}
				return clippedEquityStatement;
			}
			// The club doesn't have an equity statement; return the description instead
			else {
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
	cursor: pointer;
	transition: transform 0.5s;
	transform-style: preserve-3d;
}

/* The TailwindCSS `transform` property seems to break card flipping on iOS Safari
(https://github.com/Vic-Park/vic-park.github.io/issues/1).
*/
.fallback-card-cover {
	transform: translateX(-50%) translateY(-50%);
}

.flip-card-back {
	transform: rotateY(180deg);
}
</style>
