/*
 * @Author: dazhao 
 * @Date: 2021-03-31 14:59:52 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-03-31 16:13:00
 */

import { getIndexCouponList, getRecommand } from "../../request"

export default {
    state: {
        indexCoupons: [],
        recommandList: [],
    },
    getters: {

    },
    mutations: {
        setIndexCoupons(state, payload) {
            state.indexCoupons = payload.map(item => {
                const platform = item.platform
                const labelPic = platform == "ele" ? "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-k3gpzmwscp2i85a06d/c9d9b660-57ce-11eb-8d54-21c4ca4ce5d7.png" : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-k3gpzmwscp2i85a06d/ca96c4d0-57ce-11eb-b997-9918a5dda011.png"
                const markPic = platform == "ele" ? "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-k3gpzmwscp2i85a06d/cb5c10a0-57ce-11eb-b997-9918a5dda011.png" : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-k3gpzmwscp2i85a06d/cc101e60-57ce-11eb-b997-9918a5dda011.png"
                return { ...item, labelPic, markPic }
            })
        },
        setRecommandList(state, payload) {
            state.recommandList = payload
        }
    },
    actions: {
        async fetchIndexCoupons({ dispatch, commit }) {
            const [err, res] = await getIndexCouponList()
            if (err) return;
            commit('setIndexCoupons', res.data.data)
        },

        async fetchShopRecommand({ dispatch, commit }, payload) {
            const [err, res] = await getRecommand(payload)
            if (err || res.data.code != 200) return;
            commit('setRecommandList', res.data.data)
        }
    }
}