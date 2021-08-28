import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: "content" */ '~/layouts/ContentLayout.vue'),
		children: [
			{
				path: '/',
				name: 'Home',
				component: () =>
					import(/* webpackChunkName: "home" */ '~/views/HomePage.vue'),
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
						/* webpackChunkName: "clubs-list" */ '~/views/ClubsListPage.vue'
					),
			},
			{
				path: '/club/:clubSlug',
				name: 'Club Page',
				component: () =>
					import(/* webpackChunkName: "club" */ '~/views/ClubPage.vue'),
			},
			{
				path: '/events',
				name: 'Events',
				component: () =>
					import(/* webpackChunkName: "events" */ '~/views/EventsPage.vue'),
				meta: {
					navigationHeaderClass: 'bg-yellow-500',
				},
			},
			{
				path: '/event/:eventSlug',
				name: 'Event Page',
				component: () =>
					import(/* webpackChunkName: "event" */ '~/views/EventPage.vue'),
			},
			{
				path: '/announcements',
				name: 'Announcements',
				component: () =>
					import(
						/* webpackChunkName: "announcements" */ '~/views/AnnouncementsPage.vue'
					),
				meta: {},
			},
			{
				path: '/:catchAll(.*)',
				name: 'Not Found',
				component: () =>
					import(/* webpackChunkName: "404" */ '~/views/404Page.vue'),
			},
		],
	},
];
