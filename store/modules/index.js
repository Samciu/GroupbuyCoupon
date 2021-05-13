/*
 * @Author: dazhao 
 * @Date: 2021-05-06 16:34:57 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-05-11 00:32:48
 */

import { getProductActivity, getProductHot } from "@/request"

export default {
    state: {
        productActivityList: [],
        productHotList: [],
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
    }
}