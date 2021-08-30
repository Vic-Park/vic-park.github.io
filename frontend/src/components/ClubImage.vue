<template>
	<div v-if="clubHasImage">
		<img
			:class="imageClass"
			:src="clubImageUrl"
			:alt="name"
			@error="onImageLoadError"
		/>
	</div>
	<template v-else>
		<img :class="imageClass" src="/img/vic-park-logo.png" />
	</template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { getClubImageUrl } from '~/utils/club';

export default defineComponent({
	props: {
		slug: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		imageClass: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const clubHasImage = ref(true);

		function onImageLoadError(event: Event) {
			event.preventDefault();
			clubHasImage.value = false;
		}

		const clubImageUrl = getClubImageUrl(props.slug);

		return {
			clubImageUrl,
			onImageLoadError,
			clubHasImage,
		};
	},
});
</script>
