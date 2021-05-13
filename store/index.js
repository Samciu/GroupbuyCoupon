import Vue from 'vue'
import Vuex from 'vuex'

import index from '@/store/modules/index'
import shop from '@/store/modules/shop'
import arrive from '@/store/modules/arrive'
import user from '@/store/modules/user'
import orderList from '@/store/modules/orderList'
import income from '@/store/modules/income'
import withdraw from '@/store/modules/withdraw'
import team from '@/store/modules/team'

import { getPayToolUserLogin } from "@/request";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false,
        loginShow: false, // 展示登陆弹窗
    },
    mutations: {
        setIsLogin(state, payload) {
            state.isLogin = payload
        },

        setLoginShow(state, payload) {
            state.loginShow = payload
        },
    },
    actions: {
        /**
         * 获取授权
         */
        async getAuthorize({ dispatch, commit }) {
            // 获取授权
            const [authorizeErr, authorizeRes] = await uni.authorize({
                scope: "scope.userLocation",
            });
            console.log(authorizeErr, authorizeRes);
            // 授权失败
            if (authorizeErr) {
                return dispatch('authorizeWarning');
            }
            return true;
        },

        /**
         * 地址授权警告
         */
        async authorizeWarning({ dispatch, commit }) {
            const [modalErr, modalRes] = await uni.showModal({
                title: "是否授权当前位置",
                content: "需要获取您的地理位置，请确认授权，否则功能将无法使用",
            });
            if (!modalRes.confirm) {
                return dispatch('authorizeWarning');
            }
            await uni.openSetting();
            const [settingErr, settingRes] = await uni.getSetting();
            if (!settingRes.authSetting["scope.userLocation"]) {
                return dispatch('authorizeWarning');
            }
            return true;
        },

        async setUserData(context, payload) {
            try {
                const { token, user } = payload
                console.log('setUserData', { token, user })
                uni.setStorage({
                    key: 'token',
                    data: token
                });
                uni.setStorage({
                    key: 'userInfo',
                    data: user
                });
            } catch (e) {

            }
        },

        async getLoginStatus({ dispatch, commit }) {
            const token = uni.getStorageSync('token')
            
            if (token) {
                commit('setIsLogin', true)
            } else {
                commit('setLoginShow', true)
            }
        },

        async fetchPayToolUserLogin({ dispatch, commit }, payload) {
            const [err, res] = await getPayToolUserLogin(payload)
            
            return res
        }
    },
    modules: {
        index, shop, arrive, user, orderList, income, withdraw, team
    }
})
export default store