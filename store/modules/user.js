/*
 * @Author: dazhao 
 * @Date: 2021-03-31 14:59:52 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-05-24 15:35:54
 */

import { getUserIncome, getUserBaseInfo, getUserInfo } from "@/request";

export default {
    state: {
        income: {},
        baseInfo: {},
        info: {}
    },
    getters: {
        level: state => ['顾客', '会员', '经理', '总监', '合伙人'][state.info?.user?.role]
    },
    mutations: {
        setIncome(state, payload) {
            state.income = payload
        },

        setUserBaseInfo(state, payload) {
            state.baseInfo = payload
        },

        setUserInfo(state, payload) {
            state.info = payload
        }
    },
    actions: {
        async userInit({ dispatch, commit }, payload) {
            dispatch('fetchUserIncome')
            dispatch('fetchUserBaseInfo')
            dispatch('fetchUserInfo')
        },

        async fetchUserIncome({ dispatch, commit }, payload) {
            const [err, res] = await getUserIncome();
            if (err) return
            commit('setIncome', res.data.data)
        },

        async fetchUserBaseInfo({ dispatch, commit }, payload) {
            const [err, res] = await getUserBaseInfo();
            if (err) return
            commit('setUserBaseInfo', res.data.data)
        },

        async fetchUserInfo({ dispatch, commit }, payload) {
            const [err, res] = await getUserInfo();
            if (err) return
            commit('setUserInfo', res.data.data)
        }
    }
}