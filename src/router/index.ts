import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
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
    path: '/clubs/search',
    name: 'Club Search',
    component: () => import(/* webpackChunkName: "club-search" */ '~/views/ClubSearch.vue'),
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import(/* webpackChunkName: "events" */ '~/views/EventsPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
