/*
 * @Description:
 * @Author: bb f
 * @Date: 2021-11-26 16:38:20
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-29 10:00:57
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.less';
import 'element-plus/dist/index.css';

createApp(App).use(store).use(router).mount('#app');
