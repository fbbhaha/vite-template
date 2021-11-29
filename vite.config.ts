/*
 * @Description:
 * @Author: bb f
 * @Date: 2021-10-20 11:17:42
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-29 10:04:05
 */
import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(), // 按需自动引入
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: {
                '@': resolve('./src'),
            },
        },
        base: './', // 打包路径
        build: {
            assetsDir: 'image/',
            rollupOptions: {
                output: {
                    entryFileNames: 'js/[name]-[hash].js',
                    chunkFileNames: 'js/[name]-[hash].js',
                    assetFileNames: 'assets/[name]-[hash].[ext]',
                },
            },
        },
    };
};
