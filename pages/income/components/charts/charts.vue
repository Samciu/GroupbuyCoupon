<template>
  <view class="charts-box">
    <qiun-data-charts
      type="line"
      :chartData="chartData"
      :background="none"
      :animation="false"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
        series: [
          {
            name: "累计",
            data: [35, 8, 25, 37, 4, 20],
          },
          {
            name: "自推",
            data: [70, 40, 65, 100, 44, 68],
          },
          {
            name: "好友",
            data: [100, 80, 95, 150, 112, 132],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.charts-box {
  margin-top: 30rpx;
  width: 100%;
  height: 400rpx;
}
</style>