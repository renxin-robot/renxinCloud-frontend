import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './i18n';
import './styles/index.less';
import axios from 'axios' 
import Region from 'v-region'
import { RegionSelects } from 'v-region'
const app = createApp(App);
app.component('v-region-selects', RegionSelects)
app.use(ElementPlus)
app.use(store);
app.use(router);
app.use(permission);
app.use(i18n);
app.use(Region)
axios.defaults.withCredentials=true;
app.mount('#app');
