/*
 * @Author: dazhao 
 * @Date: 2021-04-08 15:30:37 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-08 21:32:55
 */

import { getUserIncome } from "../../request";

export default {
    state: {
        list: [],
    },
    getters: {

    },
    mutations: {
        setUserIncome(state, payload) {
            // state.list = list
            console.log(payload)
        },
    },
    actions: {
        async inComeInit({ dispatch, commit }, payload) {
            dispatch('fetchIncome')
        },

        async fetchIncome({ dispatch, commit }, payload) {
            const [err, res] = await getUserIncome(payload);
            if (err) return
            commit('setUserIncome', res.data.data)
        },

    }
}