import {createApp} from 'vue';
import App from './App.vue';

import {createPinia} from 'pinia';
import Message from 'vue-m-message';
import router from '@/router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vue-m-message/dist/style.css';
import './index.scss';

Message.setDefault({
    closable: true,
})

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus)
app.use(Message);
app.use(router);
app.use(createPinia());
app.mount('#app');
