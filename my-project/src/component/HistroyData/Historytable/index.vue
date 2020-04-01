<template>
  <div class="movie_body" ref="movie_body">
   
    <ul >
      <li class="details_now" v-for="(item,index) in  itemList" :key="index">
        <div class="list_tittle">
          <p>
            <span class="shebeihao">{{item.shebeibianhao}}</span>
          </p>
          <p>
            <span class="worktime">{{item.time}}</span>
          </p>
        </div>
        <div class="list-content">
          <div>
            <p>
              温度1：
              <span class="temp1">{{item.temperature01}}</span>℃
            </p>
            <p>
              温度2：
              <span class="temp2">{{item.temperature02}}</span>℃
            </p>
          </div>
          <div>
            <p>
              湿度：
              <span class="humidity">{{item.humidity}}</span>%RH
            </p>
            <p>
              速度：
              <span class="speed">{{item.speed}}</span>km/h
            </p>
          </div>
          <div>
            <p>
              信号强度：
              <span class="signal" v-if="item.xinhaoqiangdu<=5">无信号</span>
              <span class="signal" v-else-if="item.xinhaoqiangdu>5&&item.xinhaoqiangdu<=13">弱</span>
              <span class="signal" v-else-if="item.xinhaoqiangdu>13&&item.xinhaoqiangdu<=20">良</span>
              <span class="signal" v-else-if="item.xinhaoqiangdu>20&&item.xinhaoqiangdu<=26">好</span>
              <span class="signal" v-else-if="item.xinhaoqiangdu>26&&item.xinhaoqiangdu<=100">强</span>
              <span class="signal" v-else>无信号</span>
            </p>
            <p>
              电量：
              <span class="power">{{item.power}}</span>%
            </p>
          </div>
          <div>
            地理位置：
            <span class="address">{{item.dizhi}}</span>
          </div>
        </div>
      </li>
    </ul>
  
  </div>
</template>
<script>
export default {
  props: {
    itemList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      tableData: [],
      // itemList: [],
      isLoading: true,
      prevCityId: -1
    };
  },
  create(){
    console.log(this.itemList)
  },
  mounted() {
    // this.itemList = JSON.parse(sessionStorage.getItem("key"));
    // console.log(itemList)
    // console.log(this.itemList)
  },

  methods: {}
};
</script>
<style>
.searchTime .van-cell-group {
  width: 100%;
}
.searchTime .van-tabs__line {
  height: 30px;
}
.searchTime .van-cell {
  padding: 0;
}
.searchTime .van-field__control {
  text-align: center;
  display: inline-block;
  width: 100%;
}

.history_bar .van-tabs--line .van-tabs__wrap {
  height: 30px;
}
.history_bar .van-tabs__nav--line {
  height: 30px;
  box-sizing: content-box;
  height: 100%;
  padding-bottom: 0.4rem;
}

.history_bar .van-tabs__nav {
  height: 30px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.history_bar .van-tab {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
  padding: 0 0.13333rem;
  color: #7d7e80;
  font-size: 0.37333rem;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
</style>
<style  scoped>
.searchTime .starttime {
  border-right: 1px solid #eeee;
}
.content {
  margin: 5px 5px;
}
.van-button--large {
  width: 92%;
  margin-left: 4%;
  margin-top: 25%;
}
.searchTime {
  /* margin: 5px 0px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchTime .van-cell-group {
  height: 30px;
  display: flex;
  align-items: center;
}
.search_btn {
  margin: 5px 0;
  width: 100%;
}
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 5px;
  overflow: hidden;
}
/* @import url(); 引入css类 */
.details_now {
  height: 160px;
  /* width: 100vw; */
  /* background: #ffffff; */
  font-size: 13px;
}
.list_tittle {
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  background: #ededed;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 10px;
}
.list-content {
  background: #ffffff;
  padding: 5px 0;
  box-sizing: border-box;
}
.list-content div {
  padding: 5px 10px;
  box-sizing: border-box;
  float: none;
  display: flex;
  align-items: center;
  /* justify-content: space-between */
}
.list-content div p {
  width: 50%;
  text-align: left;
}
</style>
