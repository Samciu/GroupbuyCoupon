/*
 * @Author: dazhao 
 * @Date: 2021-04-26 11:49:46 
 * @Last Modified by: dazhao
 * @Last Modified time: 2021-04-26 14:11:37
 */


/**
 * 公共分享信息
 * @returns {}
 */
function getShareMessage() {
  const userInfo = uni.getStorageSync('userInfo')
  return {
    title: "震惊！小明天天出来玩，竟然只花1分钱",
    path: `pages/index/index?fromUid=${userInfo.id || ""}`,
    imageUrl:
      "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/1fa7c836-b3cc-44ba-84b0-6e6e9188244b.jpg",
  };
}

export default getShareMessage