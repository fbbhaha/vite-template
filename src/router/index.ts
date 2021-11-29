/*
 * @Description: 路由文件
 * @Author: bb f
 * @Date: 2021-08-08 23:43:53
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-26 18:14:21
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Test from '../pages/Test.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/test',
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
