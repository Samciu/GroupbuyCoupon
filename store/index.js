import Vue from 'vue'
import Vuex from 'vuex'

import takeout from '@/store/modules/takeout'
import shop from '@/store/modules/shop'
import arrive from '@/store/modules/arrive'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    mutations: {

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
    },
    modules: {
        takeout, shop, arrive
    }
})
export default store