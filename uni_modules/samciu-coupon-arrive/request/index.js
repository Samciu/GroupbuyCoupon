

import config from '../config';

const { Appid, baseUrl } = config

const request = (opts) => {
    const url = opts.url.includes('http') ? opts.url : `${baseUrl}${opts.url}`
    const accountInfo = uni.getAccountInfoSync();
    return uni.request({
        ...opts, url,
        header: {
            'Appid': Appid
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