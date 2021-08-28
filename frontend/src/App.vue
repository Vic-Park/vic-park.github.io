<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
});
</script>

<style>
:root {
	--scrollbar-thumb-color: #f6f3f3;
	--scrollbar-track-color: #bb0e0a;
}

html::-webkit-scrollbar {
	width: 15px;
	height: 15px;
}

/* The grabbable scrollbar button  */
html::-webkit-scrollbar-thumb {
	background: var(--scrollbar-thumb-color);
	border-radius: 5px;
}

/* The vertical scrollbar background */
html::-webkit-scrollbar-track {
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
