// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';
import './css/global.postcss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import VueIcon from '~/components/vue-icon.vue';

import App from './app.vue';
import { router } from './router';
import vClickOutside from './utils/click-outside';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.directive('clickOutside', vClickOutside);
app.component('VueIcon', VueIcon);
app.mount('#app');
