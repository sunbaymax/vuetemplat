<template>
  <div class="contant">
    <div class="details_now" v-for="(item,index) in  itemList" :key="index">
      <div class="list_tittle">
        <p>
          <span class="shebeihao">{{item.shebeibianhao}}</span>
        </p>
        <p>
          <span class="worktime">{{item.servicetime}}</span>
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
          <span class="address">{{item.shebeibianhao}}</span>
          <!-- <span class="lng hidden">109.32699585</span>
          <span class="lat hidden">22.77074814</span>-->
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msgFather'],
  data () {
    return {
      userobj: '',
      loading: false,
      finished: false,
      page: 0,//请求第几页
      pageSize: 20,//每页请求的数量
      total: 0,//总共的数据条数
      itemList: [],


    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj = obj
    this.getroadList(this.msgFather)
  },

  methods: {
    getroadList (val) {

      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios.post('/index/device/get_history_data', this.$qs.stringify({
        openid: this.userobj.copenid,
        offset: this.page,
        UserP: "w",
        admin_permit: "zjly8888",
        SheBeiBianHao: val,
        StartTime: "2000-08-26 00:00:00",
        EndTime: "2019-12-31 11:20:45",
        StartNo: this.page,
        Length: this.pageSize,
        admin_user: this.userobj.user,
        admin_pass: this.userobj.pwd


      })).then((res) => {
        console.log(res);

        let rows = res.data.resultCode; //请求返回当页的列表
        this.loading = false;
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

    onLoad () {

      this.page = this.page + 5;
      var that = this;
      setTimeout(function () {

        that.getroadList();

      }, 1500);

    },
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.details_now {
  height: 160px;
  width: 100vw;
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