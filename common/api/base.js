import http from './http'
import store from '@/store'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
//分享配置
const goodsJdList = (p, optId, lastGoodId) => {
    return http.request({
        url: '/addon/tequan/v1/goods/jd',
        method: 'GET', 
        data: {
			p,
			optId,
			lastGoodId
		},
    })
}
const goodsJdDetail = (goods_id) => {
    return http.request({
        url: '/addon/tequan/v1/goods/jd/detail',
        method: 'GET', 
        data: {
			goods_id
		},
    })
}
const goodsJdPromote = (materialUrl, couponLink) => {
    return http.request({
        url: '/addon/tequan/v1/goods/jd/promote',
        method: 'POST', 
        data: {
			materialUrl,
			couponLink
		},
    })
}
const homeShowcase1 = () => {
    return http.request({
        url: '/addon/tequan/v1/home/showcase1',
        method: 'GET', 
        data: {

		},
    })
}
const homeShowcase2 = () => {
    return http.request({
        url: '/addon/tequan/v1/home/showcase2',
        method: 'GET', 
        data: {

		},
    })
}
const homeShowcase3 = () => {
    return http.request({
        url: '/addon/tequan/v1/home/showcase3',
        method: 'GET', 
        data: {

		},
    })
}
const goodsJdSearch = (keyword, p) => {
    return http.request({
        url: '/addon/tequan/v1/goods/jd/search',
        method: 'GET', 
        data: {
			keyword,
			p
		},
    })
}
const userLogin = (code) => {
    return http.request({
        url: '/addon/tequan/v1/user/login',
        method: 'GET', 
        data: {
			code
		},
    })
}
const cardInfo = () => {
    return http.request({
        url: '/addon/tequan/v1/card/info',
        method: 'GET', 
        data: {
			
		},
    })
}
const getCardTrack = (result) => {
    return http.request({
        url: '/addon/tequan/v1/card/getTrack',
        method: 'POST', 
        data: result,
    })
}
const homeTips = () => {
    return http.request({
        url: '/addon/tequan/v1/home/tips',
        method: 'GET', 
        data: {
			
		},
    })
}
const homeConfig = () => {
    return http.request({
        url: '/addon/tequan/v1/home/config',
        method: 'GET', 
        data: store.state.launchInfo
    })
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	goodsJdList, goodsJdDetail, goodsJdPromote, homeShowcase1, homeShowcase3, goodsJdSearch, userLogin, homeShowcase2, cardInfo, getCardTrack, homeTips, homeConfig
}