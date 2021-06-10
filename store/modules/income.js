/*
 * @Author: dazhao 
 * @Date: 2021-04-08 15:30:37 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-12 02:25:02
 */

import { getIncomeSum, getIncomeOverview, getIncomeDay } from "../../request";

export default {
    state: {
        incomeSum: {},
        incomeOverview: {},
        activeTab: 'today',
        tabList: [
            { name: '今日', value: 'today' },
            { name: '昨日', value: 'yesterday' },
            { name: '本月', value: 'month' },
            { name: '上月', value: 'subMonth' },
            { name: '总计', value: 'all' }
        ],
        chartData: {}
    },
    getters: {

    },
    mutations: {
        setIncomeSum(state, payload) {
            state.incomeSum = payload
        },

        setIncomeOverview(state, payload) {
            state.incomeOverview = payload
        },

        setActiveTab(state, payload) {
            state.activeTab = payload
        },

        setIncomechartData(state, payload) {
            const { date, income } = payload
            state.chartData = {
                categories: date,
                series: [
                    {
                        name: "自推",
                        data: income.self,
                    },
                    {
                        name: "好友",
                        data: income.low,
                    },
                    {
                        name: "团队",
                        data: income.team,
                    },
                ],
            }
        }
    },
    actions: {
        async inComeInit({ dispatch, commit }, payload) {
            commit('setActiveTab', "today")
            dispatch('fetchIncomeSum', { day: "today" })
            dispatch('fetchIncomeOverview')
            dispatch('fetchIncomeDay')
        },

        async fetchIncomeSum({ dispatch, commit }, payload) {
            const [err, res] = await getIncomeSum(payload);
            if (err) return
            commit('setIncomeSum', res.data.data)
        },

        async fetchIncomeOverview({ dispatch, commit }, payload) {
            const [err, res] = await getIncomeOverview(payload);
            if (err) return
            commit('setIncomeOverview', res.data.data)
        },

        async switchTab({ dispatch, commit }, payload) {
            commit('setActiveTab', payload)
            dispatch('fetchIncomeSum', { day: payload })
        },

        async fetchIncomeDay({ dispatch, commit }, payload) {
            const [err, res] = await getIncomeDay(payload);
            if (err) return
            commit('setIncomechartData', res.data.data)
        },

    }
}