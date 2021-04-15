

import config from '../config';

const { Appid, baseUrl } = config

const request = (opts) => {
    const url = opts.url.includes('http') ? opts.url : `${baseUrl}${opts.url}`
    // const accountInfo = uni.getAccountInfoSync();
    const token = uni.getStorageSync('token')
    return uni.request({
        ...opts, url,
        header: {
            'Appid': Appid,
            'Authorization': `Bearer ${token}`
        },
    })
}

export const getRecommand = (data) => {
    return request({
        url: '/minapp/v1/takeout/shop/recommand?lat=32.16046142578125&lng=118.72357177734375',
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