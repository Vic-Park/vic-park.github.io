import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes';

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from) => {
	// Unset old CSS variables
	if (from.meta.cssVariables !== undefined) {
		for (const key of Object.keys(from.meta.cssVariables)) {
			document.documentElement.style.removeProperty(key);
		}
	}

	// Set new CSS variables
	if (to.meta.cssVariables !== undefined) {
		for (const [key, value] of Object.entries(to.meta.cssVariables)) {
			document.documentElement.style.setProperty(key, value);
		}
	}
});
