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
							w:text="4xl center"
							class="
								font-bold
								transform
								-translate-x-1/2 -translate-y-1/2
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
							<img src="/img/vic-park-logo.png" width="150" />
						</div>
					</template>
				</ImageWithFallback>
			</div>
			<div
				class="
					flip-card-back
					w-full
					h-full
					bg-white
					p-4
					overflow-ellipsis
					column
					items-center
				"
				w:text="burgundy center"
			>
				<h4 w:text="xl center" class="font-bold uppercase mb-2">{{ name }}</h4>
				<div ref="equityStatementContainer" class="text-md overflow-hidden">
					<p ref="equityStatementTextContainer">
						{{ clippedEquityStatement }}
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
import { computed, defineComponent, onMounted, ref } from 'vue';

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
			required: true,
		},
	},
	setup(props) {
		const isDescriptionActive = ref(false);
		const equityStatementContainer = ref<HTMLDivElement>();
		const equityStatementTextContainer = ref<HTMLParagraphElement>();

		onMounted(() => {
			const container = equityStatementContainer.value!;
			shave(
				equityStatementTextContainer.value!,
				container.getBoundingClientRect().height
			);
		});

		const cardStyle = computed(() => ({
			transform: isDescriptionActive.value ? 'rotateY(180deg)' : undefined,
		}));

		const frontCardStyle = computed<CSS.Properties>(() => ({
			pointerEvents: isDescriptionActive.value ? 'none' : 'auto',
		}));

		function onClick() {
			isDescriptionActive.value = !isDescriptionActive.value;
		}

		const clippedEquityStatement = computed(() => {
			const openingBracketIndex = props.equityStatement.indexOf('[');
			const closingBracketIndex = props.equityStatement.indexOf(']');
			return props.equityStatement.slice(
				openingBracketIndex + 1,
				closingBracketIndex
			);
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
			clippedEquityStatement,
			equityStatementContainer,
			equityStatementTextContainer,
		};
	},
});
</script>

<style scoped>
.flip-card-front,
.flip-card-back {
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.flip-card {
	perspective: 1000px;
}

.flip-card-inner {
	cursor: pointer;
	transition: transform 0.5s;
	transform-style: preserve-3d;
	background-color: white;
}

.flip-card-back {
	position: absolute;
	transform: rotateY(180deg);
}
</style>
