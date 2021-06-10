/*
 * @Author: dazhao 
 * @Date: 2021-04-08 15:30:37 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-09 11:18:53
 */

import { getOrderList } from "../../request";

export default {
    state: {
        list: [],
        statusList: [
            { name: "全部", value: "-1" },
            { name: "待结算", value: "23" },
            { name: "已结算", value: "4" },
            { name: "失效", value: "1" },
        ],
    },
    getters: {

    },
    mutations: {
        setOrderList(state, payload) {
            const { originList, push } = payload;
            const list = originList.map(item => {
                const incomeType = ['', '自推', '好友', '团队'][item.income_type]
                let incomeStatus = ""
                switch (item.income_status) {
                    case 2:
                    case 3:
                        incomeStatus = '待结算'
                        break;
                    case 4:
                        incomeStatus = '已结算'
                        break;
                    case 1:
                        incomeStatus = '失效'
                        break;
                    default:
                        incomeStatus = '未知'
                        break;
                }
                return { ...item, incomeType, incomeStatus }
            })
            if (push) {
                state.list.push(...list)
            } else {
                state.list = list
            }
        },
    },
    actions: {
        async orderListInit({ dispatch, commit }, payload) {
            dispatch('fetchOrderList')
        },

        async fetchOrderList({ dispatch, commit }, payload) {
            uni.showLoading({ title: "加载订单中" });
            const { p = 1, status = -1, push } = payload || {}
            const [err, res] = await getOrderList({ p, status });
            if (err) return
            commit('setOrderList', { originList: res.data.data, push })
            uni.hideLoading();
        },

    }
}