/*
 * @Description:
 * @Author: bb f
 * @Date: 2021-10-20 15:54:38
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-29 14:08:14
 */

let baseUrl = {
    dev: 'http://10.101.69.25',
};
if (import.meta.env.MODE === 'development') {
    baseUrl = {
        dev: 'http://localhost:8080',
    };
}

export { baseUrl };
