<template>
	<div
		class="bg-yellow-deep column center rounded-full"
		w:hover="border-4 border-burgundy"
	>
		<div>{{ title }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	setup() {},
});
</script>
