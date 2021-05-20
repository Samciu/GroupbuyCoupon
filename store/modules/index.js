/*
 * @Author: dazhao 
 * @Date: 2021-05-06 16:34:57 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-05-20 02:05:25
 */

import { getProductActivity, getProductHot, getCardProductRecommand } from "@/request"

export default {
    state: {
        productActivityList: [],
        productHotList: [],
        productRecommand: []
    },
    getters: {

    },
    mutations: {
        setProductActivity(state, payload) {
            state.productActivityList = payload
        },
        setProductHot(state, payload) {
            state.productHotList = payload
        },
        setProductDetail(state, payload) {
            console.log(payload)
            state.productDetail = payload
        },
        setProductRecommand(state, payload) {
            console.log(payload)
            state.productRecommand = payload
        },
    },
    actions: {
        async fetchProductActivity({ dispatch, commit }) {
            const [err, res] = await getProductActivity()
            if (err) return;
            commit('setProductActivity', res.data.data)
        },

        async fetchProductHot({ dispatch, commit }) {
            const [err, res] = await getProductHot()
            if (err) return;
            commit('setProductHot', res.data.data)
        },

        async fetchCardProductRecommand({ dispatch, commit }) {
            const [err, res] = await getCardProductRecommand()
            if (err) return;
            commit('setProductRecommand', res.data.data)
        }
    }
}