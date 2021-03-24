
const baseUrl = "https://zy-api.wxthe.com";


const request = (opts) => {
    const url = `${baseUrl}${opts.url}`
    const accountInfo = uni.getAccountInfoSync();

    return uni.request({
        ...opts, url,
        header: {
            'Appid': 'zy36aab89b0773212d'
        },
    })
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