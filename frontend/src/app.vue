<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
});
</script>

<style lang="postcss">
:root {
	--scrollbar-thumb-color: #bb0e0a;
	--scrollbar-track-color: #f6f3f3;
}

body::-webkit-scrollbar {
	width: 12px;
}

/* The grabbable scrollbar button  */
body::-webkit-scrollbar-thumb {
	background: var(--scrollbar-thumb-color);
	border-radius: 5px;
}

/* The vertical scrollbar background */
body::-webkit-scrollbar-track {
	background: var(--scrollbar-track-color);
}

* {
	box-sizing: border-box;
}

html,
body,
#app {
	height: 100%;
}

.link {
	@apply text-blue-400 hover:text-blue-600 underline;
}

#app {
	font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

@font-face {
	font-family: 'Kollektif';
	src: url('/fonts/Kollektif.ttf');
}

@font-face {
	font-family: 'Kollektif';
	font-weight: bold;
	src: url('/fonts/Kollektif-Bold.ttf');
}

@font-face {
	font-family: 'Glacial Indifference';
	src: url('/fonts/GlacialIndifference-Regular.otf');
}

@font-face {
	font-family: 'Glacial Indifference';
	font-weight: bold;
	src: url('/fonts/GlacialIndifference-Bold.otf');
}
</style>
