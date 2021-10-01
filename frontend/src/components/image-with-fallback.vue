<template>
	<img
		v-if="!imageLoadFailed"
		:src="src"
		:alt="alt"
		v-bind="$attrs"
		@error="onImageLoadError"
	/>
	<template v-else>
		<slot name="fallback">
			<img src="/images/vic-park-logo.png" :alt="alt" v-bind="$attrs" />
		</slot>
	</template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	inheritAttrs: false,
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
	},
	setup() {
		const imageLoadFailed = ref(false);

		function onImageLoadError(event: Event) {
			event.preventDefault();
			imageLoadFailed.value = true;
		}

		return {
			onImageLoadError,
			imageLoadFailed,
		};
	},
});
</script>
