import type { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: "content" */ '~/layouts/content-layout.vue'),
		children: [
			{
				path: '/',
				name: 'Home',
				component: () =>
					import(/* webpackChunkName: "home" */ '~/views/home-page.vue'),
				meta: {
					hideNavigationHeader: true,
					cssVariables: {
						'--scrollbar-thumb-color': '#fcc534',
					},
				},
			},
			{
				path: '/clubs',
				name: 'Clubs',
				component: () =>
					import(
						/* webpackChunkName: "clubs-list" */ '~/views/clubs-list-page.vue'
					),
			},
			{
				path: '/club/:clubSlug',
				name: 'Club Page',
				component: () =>
					import(/* webpackChunkName: "club" */ '~/views/club-page.vue'),
				meta: {
					cssVariables: {
						'--scrollbar-thumb-color': '#fcc534',
					},
					navigationHeaderClass: 'bg-red-dark',
					navigationLinkClass: 'hover:text-yellow-deep',
				},
			},
			{
				path: '/events',
				name: 'Events',
				component: () =>
					import(/* webpackChunkName: "events" */ '~/views/events-page.vue'),
			},
			{
				path: '/event/:eventSlug',
				name: 'Event Page',
				component: () =>
					import(/* webpackChunkName: "event" */ '~/views/event-page.vue'),
			},
			{
				path: '/announcements',
				name: 'Announcements',
				component: () =>
					import(
						/* webpackChunkName: "announcements" */ '~/views/announcements-page.vue'
					),
				meta: {},
			},
			{
				path: '/:catchAll(.*)',
				name: 'Not Found',
				component: () =>
					import(/* webpackChunkName: "404" */ '~/views/404-page.vue'),
			},
		],
	},
];
