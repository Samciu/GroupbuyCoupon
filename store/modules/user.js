/*
 * @Author: dazhao 
 * @Date: 2021-03-31 14:59:52 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-06-02 03:32:47
 */

import { getUserIncome, getUserBaseInfo, getUserInfo, getUserServiceInfo } from "@/request";

export default {
    state: {
        income: {},
        serviceInfo: {},
        info: {}
    },
    getters: {
        level: state => ['顾客', '会员', '经理', '总监', '合伙人'][state.info?.user?.role]
    },
    mutations: {
        setIncome(state, payload) {
            state.income = payload
        },

        setUserServiceInfo(state, payload) {
            console.log("payload",payload)
            state.serviceInfo = payload
        },

        setUserInfo(state, payload) {
            state.info = payload
        }
    },
    actions: {
        async userInit({ dispatch, commit }, payload) {
            dispatch('fetchUserServiceInfo')
            dispatch('fetchUserInfo')
        },

        async fetchUserServiceInfo({ dispatch, commit }, payload) {
            const [err, res] = await getUserServiceInfo();
            if (err) return
            console.log(res)
            commit('setUserServiceInfo', res.result)
        },

        async fetchUserInfo({ dispatch, commit }, payload) {
            const [err, res] = await getUserInfo();
            if (err) return
            commit('setUserInfo', res.data.data)
        }
    }
}