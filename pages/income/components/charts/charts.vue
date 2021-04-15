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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      chartData: (state) => state.income.chartData,
    }),
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