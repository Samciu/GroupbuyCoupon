/*
 * @Author: dazhao 
 * @Date: 2021-03-31 14:59:52 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-16 01:28:24
 */

import { getShopDetail } from "../../request";

export default {
    state: {
        
    },
    getters: {

    },
    mutations: {
        setShopDetail(state, payload) {
            state.shopList = payload
            if (payload && payload.length > 0) {
                state.shopInfo = payload[0].shopInfo
                state.dealDetail = payload[0].dealDetail
                state.dealBaseInfo = payload[0].dealBaseInfo
            }
        }
    },
    actions: {
        async fetchShopDetail({ dispatch, commit }, payload) {
            const [err, res] = await getShopDetail(payload)
            if (err) return;
            commit('setShopDetail', res.data.data.records)
        },
    }
}