<template>
	<div
		ref="popperEl"
		v-click-outside="onClickOutside"
		class="z-9999"
		:style="{ visibility: modelValue ? 'visible' : 'hidden' }"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { createPopper } from '@popperjs/core';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		reference: {
			type: String,
			required: true,
		},
	},
	emits: ['update:modelValue'],
	setup(props, ctx) {
		const popperEl = ref<HTMLDivElement>();
		const referenceElement = ref<Element>();

		onMounted(() => {
			referenceElement.value =
				document.querySelector(props.reference) ?? undefined;

			if (referenceElement.value === undefined) {
				throw new Error('Could not find reference element.');
			}
			createPopper(referenceElement.value, popperEl.value!, {
				placement: 'bottom-start',
				modifiers: [
					{
						name: 'preventOverflow',
						enabled: false,
					},
				],
			});
		});

		function onClickOutside(e: MouseEvent) {
			if (e.target !== referenceElement.value) {
				ctx.emit('update:modelValue', false);
			}
		}

		return { popperEl, onClickOutside };
	},
});
</script>

<style scoped></style>
