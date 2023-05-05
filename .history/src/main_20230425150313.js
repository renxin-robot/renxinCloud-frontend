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
import './assets/iconfront/iconfont.css'
const app = createApp(App);
app.use(ElementPlus)
app.use(store);
app.use(router);
app.use(permission);
app.use(i18n);
axios.defaults.withCredentials=true;
app.mount('#app');
