/*
 * @Author: dazhao 
 * @Date: 2021-04-08 15:30:37 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-26 22:17:24
 */

import { getTeamList } from "../../request";

export default {
    state: {
        role: 0, // 级别。默认0所有
        keyword: "", // 搜索词
        p: 1,
        list: [],
        levelList: ['全部', '会员', '经理', '总监', '合伙人'],
    },
    getters: {

    },
    mutations: {
        setTeamList(state, payload) {
            console.log(payload)
            if (state.p == 1) {
                state.list = payload
            } else {
                state.list.push(...payload)
            }
        },

        setRole(state, payload) {
            state.role = payload
        },

        setPage(state, payload) {
            state.p = payload
        },

        setKeyword(state, payload) {
            state.keyword = payload
        }
    },
    actions: {
        async orderListInit({ dispatch, commit }, payload) {
            dispatch('fetchOrderList')
        },

        async switchRole({ dispatch, commit }, payload) {
            commit('setRole', payload)
            commit('setPage', 1)
            dispatch('fetchTeamList')
        },

        async addPage({ dispatch, commit, rootState }, payload) {
            const { p } = rootState.team;
            commit('setPage', p + 1)
            dispatch('fetchTeamList')
        },

        async fetchTeamList({ dispatch, commit, rootState }, payload) {
            uni.showLoading({ title: "加载列表中" });
            const { p, keyword, role } = rootState.team;
            const [err, res] = await getTeamList({ p, keyword, role });
            if (err) return
            commit('setTeamList', res.data.data)
            uni.hideLoading();
        },

        async fetchTeamSearch({ dispatch, commit, rootState }, payload) {
            commit('setKeyword', payload)
            commit('setPage', 1)
            commit('setRole', 0)
            dispatch('fetchTeamList')
        }
    }
}