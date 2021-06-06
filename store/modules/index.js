/*
 * @Author: dazhao 
 * @Date: 2021-05-06 16:34:57 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-06-06 12:19:51
 */

import { getProductActivity, getProductHot, getCardProductRecommand } from "@/request"

export default {
    state: {
        productActivityList: [],
        productHotList: [],
        banner: [],
        coupon: [],
        layout: 0
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
            state.banner = payload.banner
            state.coupon = payload.coupon
            state.layout = payload.layout
        },
    },
    actions: {
        async fetchProductActivity({ dispatch, commit }) {
            const [err, res] = await getProductActivity()
            if (err) return;
            commit('setProductActivity', res.result)
        },

        async fetchProductHot({ dispatch, commit }) {
            const [err, res] = await getProductHot()
            if (err) return;
            commit('setProductHot', res.result)
        },

        async fetchCardProductRecommand({ dispatch, commit }) {
            const [err, res] = await getCardProductRecommand()
            if (err) return;
            commit('setProductRecommand', res.result)
        }
    }
}