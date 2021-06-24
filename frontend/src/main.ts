import { createApp } from 'vue';
import VueIcon from '~/components/VueIcon.vue';
import App from './App.vue';
import router from './router';
import vClickOutside from './utils/click-outside';
import './tailwind.css';
import 'animate.css';

const app = createApp(App);
app.use(router);
app.directive('clickOutside', vClickOutside);
app.component('vue-icon', VueIcon);
app.mount('#app');
