<template>
	<div class="flip-card w-[20rem] h-[20rem]" @click="onClick">
		<div class="flip-card-inner h-full w-full relative" :style="cardStyle">
			<div class="flip-card-front absolute w-full h-full" :style="frontCardStyle">
				<div v-if="clubHasImage" class="w-full h-full relative column items-center">
					<img
						class="absolute w-full h-full object-cover object-center"
						:src="imgPath"
						@error="onImageLoadError"
						:alt="name"
					/>
					<div
						w:p="y-1 x-4"
						w:text="sm black center"
						w:border="2 black"
						class="z-0 font-bold rounded-md m-2 inline-block bg-white"
					>
						{{ name }}
					</div>
				</div>
				<div
					v-else
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
			</div>
			<div class="flip-card-back w-full h-full bg-white absolute p-4" w:text="burgundy center">
				<h4 w:text="xl center" class="font-bold uppercase mb-2">{{ name }}</h4>
				<p class="text-md">{{ clippedEquityStatement }}</p>
				<div class="w-full my-auto">
					<router-link
						:to="clubPagePath"
						class="absolute bottom-4 left-1/2 transform -translate-x-1/2"
					>
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
import { defineComponent, ref, computed } from 'vue';
import * as CSS from 'csstype';

export default defineComponent({
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
		const clubHasImage = ref(true);

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
			return props.equityStatement.slice(openingBracketIndex + 1, closingBracketIndex);
		});

		function onImageLoadError(event: Event) {
			event.preventDefault();
			clubHasImage.value = false;
		}

		const imgPath = `/img/club-thumbnail-img/${props.slug}.jpg`;
		const clubPagePath = `/club/${props.slug}`;

		return {
			imgPath,
			clubPagePath,
			mdiArrowRight,
			clubHasImage,
			onImageLoadError,
			isDescriptionActive,
			onClick,
			cardStyle,
			frontCardStyle,
			clippedEquityStatement,
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
