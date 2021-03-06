

import config from '@/config';
import store from '@/store'

const { Appid, baseUrl } = config
const { platform } = uni.getSystemInfoSync()

const request = async (opts) => {
    const url = opts.url.includes('http') ? opts.url : `${baseUrl}${opts.url}`
    // const accountInfo = uni.getAccountInfoSync();
    const token = store.state.token
    const [err, res] = await uni.request({
        ...opts, url,
        header: {
            'Appid': Appid,
            'Authorization': `Bearer ${token}`,
            'Platform': platform
        },
    })

    switch (res.data.code) {
        case 403:
            uni.setStorage({
                key: 'token',
                data: ""
            });
            // store.commit('getLoginStatus', true)
            store.commit('setLoginShow', true)
            break;
        default:
            break;
    }

    return [err, res]
}

const cloudRequest = ({name, data = {}}) => {
    data.data = { ...data.data , platform }
    return uniCloud.callFunction({
        name,
        data
    });
}

export const getRecommand = (data) => {
    return request({
        url: '/minapp/v1/takeout/shop/recommand',
        data
    });
}

export const getArea = (data) => {
    return request({
        url: '/minapp/v1/groupBuy/area',
        data
    });
}

export const getCity = (data) => {
    return request({
        url: '/minapp/v1/groupBuy/city',
        data
    });
}

export const getCategory = (data) => {
    return request({
        url: '/minapp/v1/groupBuy/category',
        data
    });
}

export const getShopList = (data) => {
    return request({
        url: '/minapp/v1/groupBuy/list',
        data,
        method: "POST"
    })
}

export const getShopDetail = (data) => {
    return request({
        url: '/minapp/v1/groupBuy/detail',
        data
    })
}

export const getCouponList = (data) => {
    return request({
        url: "/minapp/v1/coupon/list",
        data
    })
}

export const getIndexCouponList = data => {
    return request({
        url: "/minapp/v1/takeout/coupon",
        data
    })
}

export const getUserLogin = data => {
    return request({
        url: "/minapp/v1/user/login",
        data,
        method: "POST"
    })
}

export const getUserIncome = data => {
    return request({
        url: "/minapp/v1/user/income",
        data
    })
}

export const getUserBaseInfo = data => {
    return request({
        url: "/minapp/v1/user/baseInfo",
        data
    })
}

export const getUserInfo = data => {
    return request({
        url: "/minapp/v1/user/info",
        data
    })
}

export const getOrderList = data => {
    return request({
        url: "/minapp/v1/order/list",
        data
    })
}

export const getIncomeSum = data => {
    return request({
        url: "/minapp/v1/income/sum",
        data
    })
}

export const getIncomeOverview = data => {
    return request({
        url: "/minapp/v1/income/overview",
        data
    })
}

export const getIncomeDay = data => {
    return request({
        url: "/minapp/v1/income/day?type=7",
        data
    })
}

export const getTeamList = data => {
    return request({
        url: "/minapp/v1/team/list",
        data
    })
}

export const getPayToolUserLogin = data => {
    return request({
        url: "/addon/plug/payTool/minapp/user/login",
        data
    })
}

export const getWithdrawInfo = data => {
    return request({
        url: "/minapp/v1/withdraw/info",
        data
    })
}

export const getWithdrawDo = data => {
    return request({
        url: "/minapp/v1/withdraw/do",
        data,
        method: "POST"
    })
}

export const getInviteInfo = data => {
    return request({
        url: "/minapp/v1/invite/info",
        data,
        method: "POST"
    })
}

export const getWithdrawList = data => {
    return request({
        url: "/minapp/v1/withdraw/list",
        data,
    })
}

export const getProductActivity = async data => {
    const res = await cloudRequest({
        name: "hot",
    });

    return [null, res]
}

export const getProductHot = async data => {
    const res = await cloudRequest({
        name: "recommand",
    });

    return [null, res]
}

export const getProductDetail = async data => {
    const res = await cloudRequest({
        name: "brandDetail",
        data,
    });

    return [null, res]
}

export const getGoodsDetail = async data => {
    const res = await cloudRequest({
        name: "uni-admin",
        data: { action: 'api/goods/detail', data },
    });

    return [null, res]
}

export const getOrderSku = async data => {
    const res = await cloudRequest({
        name: "uni-admin",
        data: { action: 'api/order/sku', data },
    });

    return [null, res]
}

export const getOrderConfirm = data => {
    return request({
        url: "/minapp/v1/card/order/confirm",
        data,
        method: "POST"
    })
}

export const getCardOrderList = data => {
    return request({
        url: "/minapp/v1/card/order/list",
        data
    })
}

export const getCardOrderDetail = data => {
    return request({
        url: "/minapp/v1/card/order/detail",
        data
    })
}

export const getCardOrderCancel = data => {
    return request({
        url: "/minapp/v1/card/order/cancel",
        data,
        method: "POST"
    })
}

export const getCardProductRecommand = async data => {
    const res = await cloudRequest({
        name: "banner",
    });

    return [null, res]
}

export const getCardCateList = async data => {
    const res = await cloudRequest({
        name: "classify"
    });

    return [null, res]
}

export const getUserServiceInfo = async data => {
    const res = await cloudRequest({
        name: "info",
        data: { action: 'getInfo' },
    });

    return [null, res]
}

export const getTaskSignInfo = async data => {
    return request({
        url: "/minapp/v1/task/sign/info",
        data
    })
}

export const getTaskSignDo = async data => {
    return request({
        url: "/minapp/v1/task/sign/do",
        data,
        method: "POST"
    })
}

export const getHomePopup = async data => {
    return request({
        url: "/minapp/v1/home/popup",
        data,
    })
}

export const getInviteList = async data => {
    return request({
        url: "/minapp/v1/task/sign/invite/list",
        data,
    })
}

export const getSignSubscribe = async data => {
    return request({
        url: "/minapp/v1/task/sign/subscribe",
        data,
    })
}