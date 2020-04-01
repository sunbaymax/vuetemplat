<template>
  <div class="contaiter">
    <div class="machinetop">
      <div>
        <van-nav-bar title left-text="Linke云平台">
          <van-icon name="plus" slot="right" @click="addmachine()" />
          <van-icon name="user-o" slot="right" @click="gousercenter()" />
        </van-nav-bar>
        <div>
          <van-search
            v-model="searchval"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </div>
      </div>
    </div>

    <div class="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        loading-text="加载中..."
        @load="onLoad"
        :offset="10"
      >
        <van-cell class="list-item" v-for="(item,index) in itemList" :key="index" @click="godetail(item.shebeibianhao)">
          <div class="list-item-top">
            <p>
              <span class="tittle">设备号：{{item.shebeibianhao}}</span>
              <span v-show="item.beizhu.length>0" class="beizhu">({{item.beizhu}})</span>
            </p>
            <p>
              <span v-if="item.is_master==1" class="master">主</span>
              <span v-else>副</span>
              <img src="@/assets/img/right_shop_car.png" class="rightimg" />
            </p>
          </div>
          <div class="list-item-center">
            <div>
              <p>
                温度1：
                <span class="temp1">{{item.last_temperature01}}</span>℃
              </p>
              <p>
                温度2：
                <span class="temp2">{{item.last_temperature02}}</span>℃
              </p>
            </div>
            <div>
              <p>
                湿度2：
                <span class="humidity">{{item.last_humidity}}</span>%RH
              </p>
              <p>
                电量：
                <span class="power">{{item.last_power}}</span>%
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
                箱体状态：
                <span class="boxstate">{{item.xiangzistate=='close'?'关闭':"打开"}}</span>
              </p>
            </div>
            <div>
              <p>
                报警温度：
                <span
                  class="alarmArea"
                >{{item.baojingwendu_xiaxian}}-{{item.baojingwendu_shangxian}}℃</span>
              </p>
              <p>
                合格温度：
                <span class="AcceptableArea">-38-38℃</span>
              </p>
            </div>
            <div>
              采集时间：
              <span class="worktime">{{item.last_time}}</span>
            </div>
            <div>
              位置：
              <span class="address">{{item.address}}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
      <div class="no-data" v-if="!this.itemList">
        <!-- <img src="@/assets/img/nothing-img.jpg" alt="暂无记录" class="img" /> -->
        <span >没有更多了</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userobj: '',
      searchval: '',
      loading: false,
      finished: false,
      page: 0,//请求第几页
      pageSize: 5,//每页请求的数量
      total: 0,//总共的数据条数
      itemList: [],
    };
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj = obj;
    this.getroadList();
    //创建组件时，加载第1页数据

  },

  methods: {
    getroadList () {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios.post('/index/device/device_list', this.$qs.stringify({
        openid: this.userobj.copenid,
        offset: this.page
      })).then((res) => {
        let rows = res.data.data.data; //请求返回当页的列表
        this.loading = false;
        this.total = res.data.count;
        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }
        // 将新数据与老数据进行合并
        this.itemList = this.itemList.concat(rows);
        //如果列表数据条数>=总条数，不再触发滚动加载
        if (this.itemList.length >= this.total) {
          this.finished = true;
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
    godetail(index){
      console.log(index);
      this.$router.push({name:'detaillist',params: {id:index}}) 
    },

    //滚动加载时触发，list组件定义的方法
    onLoad () {

      this.page = this.page + 5;
      var that = this;
      setTimeout(function () {

        that.getroadList();

      }, 1500);

    },
    onSearch () {
      console.log("125");
    },
    addmachine () {
      this.$router.push({
        path: '/AddMachine'
      })
    },
    gousercenter(){
       this.$router.push({
        path: '/UserCenter'
      })
    },
    handleChangeName (value) {
      if (value === '') {
        return false;
      }
      console.log(value)
    }
 

  },

watch: {
  searchval (curVal, oldVal) {
  // 实现input连续输入，只发一次请求
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.handleChangeName(curVal)
    }, 500)
  }
},


};
</script>  
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  background: #f2f2f2 !important;
}
.machinetop {
  position: fixed;
  top: 0;
  z-index: 999;
}
/* @import url(); 引入css类 */
.van-nav-bar {
  background: #37c0c4;
  height: 46px;
  width: 100vw;
  line-height: 46px;
}
.van-nav-bar__text {
  color: #fff;
}
.van-nav-bar .van-icon {
  color: #ffffff;
  vertical-align: middle;
  margin-right: 30px;
  font-size: 20px;
}
.van-nav-bar .van-icon:last-child {
  margin: 0;
}
.list-content {
  margin-top: 105px;
  /* overflow: scroll; */
  padding: 0 15px;
}
.list-item {
  background: #ffffff;
  width: 100%;
  height: auto;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.list-item-top {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
}
.list-item-top .tittle {
  color: #1b1b1b;
  font-size: 15px;
  font-weight: bold;
}
.list-item-top .beizhu {
  margin-left: 15px;
  color: #c90000;
  font-size: 12px;
  font-weight: bold;
}
.master {
  margin-right: 15px;
  font-size: 12px;
  color: #37c0c4;
}
.list-item-top .rightimg {
  height: 14px;
  width: 10px;
}
.list-item-center {
  color: #7a7a7a;
}
.list-item-center div {
  display: flex;
  align-items: center;
  height: 30px;
}
.list-item-center div p {
  width: 100%;
  /* overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap; */
}

.address {
  width: 80%;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>