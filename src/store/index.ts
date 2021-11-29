/*
 * @Description:
 * @Author: bb f
 * @Date: 2021-11-02 17:45:51
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-26 18:13:29
 */
import { createStore } from 'vuex';

interface IStore {
    a: string;
}
export default createStore<IStore>({
    state: { a: '1' },
    mutations: {},
    getters: {},
    actions: {},
    modules: {},
});
