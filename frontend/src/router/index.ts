import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "content" */ '~/layouts/ContentLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '~/views/HomePage.vue'),
      },
      {
        path: '/clubs',
        name: 'Clubs',
        component: () => import(/* webpackChunkName: "clubs-list" */ '~/views/ClubsListPage.vue'),
      },
      {
        path: '/club/:clubSlug',
        name: 'Club Page',
        component: () => import(/* webpackChunkName: "club" */ '~/views/ClubPage.vue'),
      },
      {
        path: '/events',
        name: 'Events',
        component: () => import(/* webpackChunkName: "events" */ '~/views/EventsPage.vue'),
      },
      {
        path: '/event/:eventSlug',
        name: 'Event Page',
        component: () => import(/* webpackChunkName: "event" */ '~/views/EventPage.vue'),
      },
      {
        path: '/announcements',
        name: 'Announcements',
        component: () =>
          import(/* webpackChunkName: "announcements" */ '~/views/AnnouncementsPage.vue'),
      },
      {
        path: '/:catchAll(.*)',
        name: 'Not Found',
        component: () => import(/* webpackChunkName: "404" */ '~/views/404Page.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
