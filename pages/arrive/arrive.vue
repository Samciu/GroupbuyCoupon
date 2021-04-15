<template>
  <view class="app">
    <!-- 顶部筛选 分类栏 -->
    <view class="top">
      <uni-nav-bar :fixed="false" :status-bar="true" :border="false">
        <view class="nav-bar choose-address" slot="left" @click="openPopup">
          <view class="city">{{ city }}</view>
          <uni-icons type="arrowdown" size="16"></uni-icons>
        </view>
        <view class="nav-bar input-view">
          <uni-icons type="search" size="16"></uni-icons>
          <input
            type="search"
            class="nav-bar-input"
            confirmType="search"
            placeholder="搜索门店找优惠"
            @input="handleInput"
            @confirm="handleSearch"
            :value="keyWords"
          />
          <view class="search-clear" @click="handleClearSearch">
            <uni-icons
              v-if="keyWords.length > 0"
              type="clear"
              size="18"
              color="#666"
            ></uni-icons>
          </view>
        </view>
      </uni-nav-bar>
    </view>
    <view :style="'height:' + navHeight + 'px'"></view>
    <recommand></recommand>
    <view class="sticky-box" :style="'top:' + navHeight + 'px'">
      <view class="sort-bar row">
        <view
          v-for="item in tabList"
          class="item row center"
          :class="{ active: item.id === cat0Id }"
          :key="item.id"
          @click="changeTab(item)"
        >
          <text>{{ item.name }}</text>
        </view>
      </view>
      <!-- 商品分类 -->
      <view class="cate-bar">
        <view class="cate-wrap row b-b">
          <!-- <text :id="'cate-'+item._id" class="item" :class="{active: item._id === curCateItem._id}" v-for="item in cateList" :key="item._id" @click="changeCategory(item)">{{ item.name }}</text> -->
          <view
            class="item"
            :class="{ active: !!aroundOpen }"
            @click="openMenu('aroundOpen')"
          >
            <text>{{ aroundTitle }}</text>
            <view class="arrow">
              <uni-icons type="arrowdown" size="12"></uni-icons>
            </view>
          </view>
          <view
            class="item"
            :class="{ active: !!allOpen }"
            @click="openMenu('allOpen')"
          >
            <text>{{ allTitle }}</text>
            <view class="arrow">
              <uni-icons type="arrowdown" size="12"></uni-icons>
            </view>
          </view>
          <view
            class="item"
            :class="{ active: !!sortOpen }"
            @click="openMenu('sortOpen')"
          >
            <text>{{ sortTitle }}</text>
            <view class="arrow">
              <uni-icons type="arrowdown" size="12"></uni-icons>
            </view>
          </view>
          <view
            class="item"
            :class="{ active: !!filterOpen }"
            @click="openMenu('filterOpen')"
          >
            <text>筛选</text>
            <view class="arrow">
              <uni-icons type="arrowdown" size="12"></uni-icons>
            </view>
          </view>
        </view>
      </view>
      <view class="dropdown">
        <view class="menu" v-if="aroundOpen">
          <view
            class="item b-b"
            v-for="item in aroundList"
            @click="handleMenuItem('radii', item)"
            :key="item.id"
            >{{ item.title }}</view
          >
        </view>
        <scroll-view style="height: 520rpx" scroll-y="true" v-if="allOpen">
          <view class="menu menu-cate-list">
            <view
              class="item"
              :class="{ active: item.id === cat1Id }"
              v-for="item in allCateList"
              @click="handleMenuItem('cat1Id', item)"
              :key="item.id"
              >{{ item.title }}</view
            >
          </view>
        </scroll-view>
        <view class="menu" v-if="sortOpen">
          <scroll-view style="height: 520rpx" scroll-y="true">
            <view
              class="item b-b"
              v-for="item in sortList"
              @click="handleMenuItem('sortType', item)"
              :key="item.id"
              >{{ item.title }}</view
            >
          </scroll-view>
        </view>
        <view class="menu menu-filter" v-if="filterOpen">
          <view class="menu-title">价格</view>
          <view class="menu-filter-list">
            <view
              class="item"
              :class="{ active: priceRangeIndex === item.id }"
              v-for="item in priceRange"
              @click="handlePriceRange(item.id)"
              :key="item.id"
              >{{ item.title }}</view
            >
          </view>
          <view class="menu-title">全部优惠</view>
          <view class="menu-filter-list">
            <view
              class="item"
              :class="{ active: item.id === filterType }"
              v-for="item in filterTypeList"
              @click="handleFilter(item)"
              :key="item.id"
              >{{ item.title }}</view
            >
          </view>
          <view class="button-list">
            <view class="btn btn-reset" @click="handelRestFilter">重置</view>
            <view class="btn btn-submit" @click="handelSubmitFilter">确认</view>
          </view>
        </view>
      </view>
    </view>
    <view
      class="mask"
      v-if="aroundOpen || allOpen || sortOpen || filterOpen"
      @click="closeMenu"
    ></view>
    <view class="product-body">
      <view class="empty" v-if="isListEmpty">
        <image
          class="empty-image"
          mode="widthFix"
          src="../../static/img_empty.png"
        ></image>
        <view class="empty-text">暂无商家</view>
      </view>
      <block v-else>
        <product-list
          ref="productList"
          :list="shopList"
          baseUrl="/pages/shop/shop"
        ></product-list>
      </block>
    </view>
    <uni-popup id="popup" ref="popup" type="bottom" animation="true">
      <view class="popup-content" @click="closePopup">
        <view class="action-sheet-item b-b" @click="initLocation"
          >定位当前位置</view
        >
        <picker
          mode="multiSelector"
          :range="areaList"
          @columnchange="handleCityColumnChange"
          @change="handleCityChange"
        >
          <view class="action-sheet-item">选择所在城市</view>
        </picker>
        <view class="action-sheet-item-cancel-item">取消</view>
        <!-- <picker bindchange="handleCityChange" bindcolumnchange="handleColumnChange" mode="multiSelector" range="{{areaList}}" value="{{selectedCity}}">
            <at-action-sheet-item compid="{{$compid__238}}"></at-action-sheet-item>
        </picker> -->
      </view>
    </uni-popup>
    <login />
    <customTabBar tab="arrive"></customTabBar>
  </view>
</template>
<script>
import recommand from "./components/recommand/recommand";
import { getArea, getCity, getCategory, getShopList } from "../../request";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    recommand,
  },
  data() {
    return {
      list: [],
      areaList: [], // 处理后城市列表展示数据
      index: 0,
      provinceIndex: 0, // 当前列表选择省份索引
      originAreaList: [], // 存储接口原始城市数据
      city: "选择", // 当前选择城市
      cityId: 0, // 当前选择城市id
      cat0Id: 0, // 当前选择一级类目id
      sortList: [
        {
          id: 1,
          title: "离我最近",
        },
        {
          id: 6,
          title: "销量升序",
        },
        {
          id: 7,
          title: "销量降序",
        },
        {
          id: 8,
          title: "价格由低到高",
        },
        {
          id: 9,
          title: "价格由高到底",
        },
        {
          id: 10,
          title: "优惠比例升序",
        },
        {
          id: 11,
          title: "优惠比例降序",
        },
      ],
      aroundList: [
        {
          id: 500,
          title: "500m",
        },
        {
          id: 1e3,
          title: "1km",
        },
        {
          id: 3e3,
          title: "3km",
        },
        {
          id: 5e3,
          title: "5km",
        },
        {
          id: 1e4,
          title: "10km",
        },
      ],
      allCateList: [],
      aroundOpen: false,
      aroundTitle: "附近",
      radii: "", // 距离
      allOpen: false,
      allTitle: "全部分类",
      cat1Id: "", // 二级类目id
      sortOpen: false,
      sortTitle: "离我最近",
      sortType: 1, // 排序类型
      filterOpen: false,
      filterType: "",
      priceRangeIndex: null,
      shopList: [],
      page: 1,
      keyWords: "",
      navHeight: 130,
      priceRange: [
        { lower: 0, upper: 50, title: "50以下", id: 1 },
        { lower: 50, upper: 100, title: "50-100", id: 2 },
        { lower: 100, upper: 300, title: "100-300", id: 3 },
        { lower: 300, upper: 100000, title: "300以上", id: 4 },
      ],
      filterTypeList: [
        { id: 1, title: "券后价" },
        { id: 2, title: "优惠比例" },
        { id: 3, title: "满减优惠" },
      ],
      isListEmpty: false,
    };
  },

  computed: {
    ...mapState({
      tabList: (state) => state.arrive.tabList,
    }),
  },

  onLoad(e) {
    this.getNavHeight();
    this.initLocation();
    this.getCityList();
  },
  methods: {
    ...mapActions(["getAuthorize", "fetchTabList"]),

    async initLocation() {
      const authorize = await this.getAuthorize();
      if (!authorize) return;
      const [locationErr, locationRes] = await uni.getLocation();
      const { latitude, longitude } = locationRes;
      const [cityErr, cityRes] = await getCity({
        lat: latitude,
        lng: longitude,
      });
      const { city, id } = cityRes?.data?.data || {};
      this.city = city;
      this.cityId = id;

      this.lat = latitude;
      this.lng = longitude;

      

      // 一级tab也通过后端接口返回
      await this.fetchTabList();
      this.cat0Id = this.tabList[0].id;
      this.updateCategoryList();
      this.getShopList();
    },

    /**
     * 请求原始城市数据
     */
    async getCityList() {
      const [err, res] = await getArea();
      this.originAreaList = res?.data?.data || [];
      this.updateAreaList();
    },

    /**
     * 请求优惠列表
     */
    async getShopList(concat) {
      if (!concat) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 500,
        });
        this.isListEmpty = false;
      }
      uni.showLoading({ title: "加载优惠中" });
      const {
        cat0Id,
        cat1Id,
        cityId,
        radii,
        sortType,
        lat,
        lng,
        page,
        keyWords,
        filters,
      } = this;
      const data = {
        cat0Id,
        cat1Id,
        cityId,
        radii,
        sortType,
        lat,
        lng,
        page,
        keyWords,
        filters,
      };
      Object.keys(data).forEach((key) => {
        if (data[key]) return;
        delete data[key];
      });
      const [err, res] = await getShopList(data);
      const shopList = res?.data?.data?.records || [];
      this.shopList = concat ? this.shopList.concat(shopList) : shopList;
      // 没有商家数据
      this.isListEmpty = !concat && !shopList.length;
      uni.hideLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
      this.page++;
      this.getShopList(true);
    },

    /**
     * 重置二级分类
     */
    resetMenu() {
      this.aroundTitle = "附近";
      this.radii = ""; // 距离
      this.allTitle = "全部分类";
      this.cat1Id = ""; // 二级类目id
      this.sortTitle = "离我最近";
      this.sortType = 1; // 排序类型
      this.page = 1;

      this.priceRangeIndex = null;
      this.filterType = "";
      this.filters = null;
    },

    handleCityColumnChange({ detail }) {
      const { column, value } = detail;
      if (column != 0) return;
      this.provinceIndex = value;
      this.updateAreaList();
    },

    changeTab(tab) {
      if (tab.id == this.cat0Id) return;
      this.cat0Id = tab.id;
      this.closeMenu();

      this.updateCategoryList();
      this.getShopList();
    },

    handleMenuItem(type, item) {
      const { id, title } = item;
      this[type] = id;
      switch (type) {
        case "radii":
          this.aroundTitle = title;
          break;
        case "cat1Id":
          this.allTitle = title;
          break;
        case "sortType":
          this.sortTitle = title;
          break;
      }
      this.closeMenu();
      this.getShopList();
    },

    handlePriceRange(index) {
      this.priceRangeIndex = index;
    },

    handleFilter(item) {
      this.filterType = item.id;
    },

    handelRestFilter() {
      this.priceRangeIndex = null;
      this.filterType = "";
      this.filters = null;

      this.closeMenu();
      this.getShopList();
    },

    handelSubmitFilter() {
      const { upper, lower } =
        this.priceRange.find((item) => item.id == this.priceRangeIndex) || {};
      this.filters = [{ upper, lower, filterType: this.filterType || 1 }];

      this.closeMenu();
      this.getShopList();
    },

    openMenu(type) {
      if (this[type]) {
        this[type] = false;
      } else {
        this.closeMenu();
        this[type] = true;
      }
    },

    closeMenu() {
      this.aroundOpen = false;
      this.allOpen = false;
      this.sortOpen = false;
      this.filterOpen = false;
    },

    async updateCategoryList() {
      this.resetMenu(); // 重置二级tab选择
      const [err, res] = await getCategory({
        cityId: this.cityId,
        cat0Id: this.cat0Id,
      });
      const categories = res.data.data.categories;
      const allCateList = Object.keys(categories).map((id) => ({
        id,
        title: categories[id],
      }));
      this.allCateList = [{ id: "", title: "全部分类" }, ...allCateList];
    },

    /**
     * 更新城市选择列表
     */
    updateAreaList() {
      const province = this.originAreaList.map((item) => item.province);
      const city = this.originAreaList[this.provinceIndex].city.map(
        (item) => item.name
      );
      this.areaList = [province, city];
    },

    handleCityChange({ detail }) {
      const { value } = detail;
      const [provinceIndex, cityIndex] = value;
      const city = this.originAreaList[provinceIndex].city[cityIndex];
      this.city = city.name;
      this.cityId = city.id;

      this.updateCategoryList();
      this.getShopList();
    },

    handleInput(e) {
      this.keyWords = e.detail.value;
    },

    handleSearch() {
      this.page = 1;
      this.getShopList();
    },

    handleClearSearch() {
      this.keyWords = "";
      this.page = 1;
      this.getShopList();
    },

    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    getNavHeight() {
      const query = uni.createSelectorQuery();
      query
        .select(".top")
        .boundingClientRect((rect) => {
          const height = rect.height;
          this.navHeight = height;
        })
        .exec();
    },
    onShareAppMessage(res) {
      return {
        title: "震惊！小明天天出来玩，竟然只花1分钱",
        path: "pages/arrive/arrive",
        imageUrl:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/1fa7c836-b3cc-44ba-84b0-6e6e9188244b.jpg",
      };
    },
  },
};
</script>
<style lang="scss">
.top {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 95;
  background-color: #fff;
}
.nav-bar {
  &.choose-address {
    padding-left: 30rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;

    .city {
      padding-right: 8rpx;
    }
  }

  &.input-view {
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #eee;
    height: 70rpx;
    width: 320rpx;
    border-radius: 15px;
    padding: 0 15rpx;
    flex-wrap: nowrap;
    line-height: 70rpx;

    .nav-bar-input {
      margin-left: 6rpx;
      font-size: 28rpx;
      flex: 1;
    }
  }
}
.sort-bar {
  justify-content: space-around;
  height: 76rpx;
  padding: 4rpx 0 4rpx;
  background-color: #fff;
  position: relative;
  z-index: 1;

  .item {
    flex: 1;
    height: 100%;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    position: relative;
    overflow: hidden;

    &.active {
      color: #ff536f;
      font-weight: 700;

      &:after {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-28rpx);
        content: "";
        width: 56rpx;
        height: 4rpx;
        background-color: #ff536f;
        border-radius: 10px;
      }
      .mix-icon.active {
        color: #ff536f;
      }
    }
    /* #ifdef MP */
    &.last:before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2rpx;
      height: 40rpx;
      box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.6);
    }
    /* #endif */
  }
  .icon-wrap {
    display: flex;
    flex-direction: column;
    padding-left: 8rpx;
  }
  .mix-icon {
    font-size: 14rpx;
    color: #bbb;
  }
  .btn {
    height: 68rpx;
    padding-left: 16rpx;
    padding-right: 20rpx;

    .icon-hengxiangliebiao,
    .icon-shuxiangliebiao {
      font-size: 40rpx;
      color: #333;
    }
  }
}
.sticky-box {
  position: sticky;
  top: 280rpx;
  z-index: 5;
  background: #fff;
}
.cate-wrap {
  justify-content: space-around;
  font-size: 28rpx;
  color: #333;

  .item {
    padding: 18rpx;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }
  .arrow {
    margin-left: 6rpx;
    transition: 0.5s;
  }
  .active .arrow {
    transform: rotate(-180deg);
  }
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx;

  .empty-image {
    width: 300rpx;
  }
  .empty-text {
    padding-top: 30rpx;
    color: #666;
    font-size: 30rpx;
  }
}
.dropdown {
  .item {
    margin: 0 28rpx;
    padding: 32rpx 0;
    font-size: 28rpx;
    color: #333;
  }

  .menu-cate-list,
  .menu-filter-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 12rpx 32rpx;

    .item {
      margin: 0 0 14rpx 0;
      padding: 14rpx 0;
      width: 200rpx;
      text-align: center;
      background: #eee;
      font-size: 26rpx;
      border-radius: 10rpx;

      &.active {
        background: #fee;
        color: #e62828;
      }
    }
  }

  .menu-title {
    padding: 0 32rpx;
    padding-top: 12rpx;
    font-size: 28rpx;
    color: #333;
  }

  .button-list {
    padding-top: 30rpx;
    padding-bottom: 26rpx;
    display: flex;
    justify-content: center;
    font-size: 30rpx;

    .btn {
      margin: 0 30rpx;
      padding: 12rpx 56rpx;
      border: 1px solid #ff536f;
      border-radius: 30rpx;

      &-reset {
        color: #ff536f;
      }

      &-submit {
        background: #ff536f;
        color: #fff;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 4;
  background: rgba(0, 0, 0, 0.6);
}
.product-body {
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
.popup-content {
  margin: 0 auto;
  background: #eee;
  //   width: 700rpx;

  .action-sheet-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    background: #fff;
    color: #333;
  }

  .action-sheet-item-cancel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx;
    background: #fff;
    margin-top: 16rpx;
    color: #164ab0;
  }
}
</style>
