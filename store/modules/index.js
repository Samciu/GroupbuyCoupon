/*
 * @Author: dazhao 
 * @Date: 2021-05-06 16:34:57 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-06-22 01:14:00
 */

import { getProductActivity, getProductHot, getCardProductRecommand, getHomePopup } from "@/request"

export default {
    state: {
        productActivityList: [],
        productHotList: [],
        banner: [],
        coupon: [],
        layout: 0,
        homePopup: []
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
        setHomePopup(state, payload) {
            console.log(payload)
            state.homePopup = payload
        }
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
        },

        async fetchHomePopup({ dispatch, commit }) {
            const [err, res] = await getHomePopup()
            if (err) return;
            commit('setHomePopup', res.result)
        }
    }
}