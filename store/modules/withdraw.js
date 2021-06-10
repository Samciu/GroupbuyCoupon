/*
 * @Author: dazhao 
 * @Date: 2021-04-24 22:35:08 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-26 17:14:15
 */

import { getWithdrawInfo, getWithdrawDo } from "@/request";

export default {
    state: {
        list: [],
        tips: [],
        balance: "0.00"
    },
    getters: {

    },
    mutations: {
        setWithdrawInfo(state, payload) {
            console.log(payload)
            state.list = payload.list
            state.tips = payload.tips
            state.balance = payload.balance
        }
    },
    actions: {
        async fetchWithdrawInfo({ dispatch, commit }, payload) {
            const [err, res] = await getWithdrawInfo(payload)
            if (err) return;
            commit('setWithdrawInfo', res.data.data)
        },

        async withdrawDo({ dispatch, commit }, payload) {
            const [err, res] = await getWithdrawDo(payload)
            if (err) return;
            return res.data
        }
    }
}