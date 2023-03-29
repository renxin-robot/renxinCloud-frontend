import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import i18n from './i18n';
import './styles/index.less';
import axios from 'axios' 
const app = createApp(App);

app.use(store);
app.use(router);
app.use(permission);
app.use(i18n);
axios.defaults.withCredentials=true;
console.log(axios.defaults)
app.mount('#app');
