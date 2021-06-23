import { createApp } from 'vue';

import VueIcon from '~/components/VueIcon.vue';

import App from './App.vue';
import router from './router';
import './index.css'

const app = createApp(App);
app.use(router);
app.component('vue-icon', VueIcon);
app.mount('#app');
