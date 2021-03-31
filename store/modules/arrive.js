/*
 * @Author: dazhao 
 * @Date: 2021-03-31 16:47:47 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-03-31 18:39:01
 */

import { getCategory } from "../../request";

export default {
    state: {
        tabList: []
    },
    getters: {

    },
    mutations: {
        setTabList(state, payload) {
            state.tabList = payload.filter(item => item.show)
        }
    },
    actions: {
        async fetchTabList({ dispatch, commit }, payload) {
            const [err, res] = await getCategory()
            if (err) return;
            commit('setTabList', res.data.data)
        },
    }
}