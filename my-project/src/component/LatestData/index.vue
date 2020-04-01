<template>
  <div id="content">
    <div class="movie_body" ref="movie_body">
      <!-- <button @click="ceshi">确定</button> -->
      <Loading v-if="isLoading" />
      <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
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
                <!-- <span class="lng hidden">109.32699585</span>
                <span class="lat hidden">22.77074814</span>-->
              </div>
            </div>
          </li>
        </ul>
      </Scroller>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msgFather"],
  data() {
    return {
      userobj: "",
      finished: false,
      page: 0, //请求第几页
      pageSize: 20, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [],
      isLoading: true,
      num_m: "",
      prevCityId: -1
    };
  },
  // computed:{
  //   idList() {
  //       return this.itemList.map(each => each.jingdu)
  //   }
  // },

  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  activated() {
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    var cityId = this.$store.state.city.id;
    console.log("store" + cityId);

    if (this.prevCityId === cityId) {
      console.log("deng");
      return;
    }
    // this.isLoading = true;
    this.getroadList(this.$route.params.num_m);
    this.num_m = this.$route.params.num_m;
  },
  //过滤器
  methods: {
  
    getroadList(val) {
      //获取时间
      var date = new Date();

      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();

      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();

      //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      let ctime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      let _this = this;
      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "/index/device/get_history_data",
          this.$qs.stringify({
            openid: this.userobj.copenid,
            offset: this.page,
            UserP: "w",
            admin_permit: "zjly8888",
            SheBeiBianHao: val,
            StartTime: "2000-08-26 00:00:00",
            EndTime: ctime,
            StartNo: this.page,
            Length: this.pageSize,
            admin_user: this.userobj.user,
            admin_pass: this.userobj.pwd
          })
        )
        .then(res => {
          // console.log(res.data.resultCode);
          //sessionStorage.setItem("key", JSON.stringify(res.data.resultCode));
          this.isLoading = false;
          this.prevCityId = this.$store.state.city.id;
         
          let rows = res.data.resultCode; //请求返回当页的列表

          if (rows == null || rows.length === 0) {
            // 加载结束
            this.isLoading = false;
            return;
          }
          // 将新数据与老数据进行合并
        
          this.itemList = rows;

          //如果列表数据条数>=总条数，不再触发滚动加载
          // if (this.itemList.length >= this.total) {
          //     this.itemList = this.itemList.concat(rows);
          //   this.finished = true;
          //   this.isLoading = false;
          // }
          this.baiduMap();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    baiduMap() {
      let _this = this;
      _this.itemList.forEach(function(e) {
        let point = new BMap.Point(e.jingdu, e.weidu);
        let gc = new BMap.Geocoder();
        let dizhi = "";
        gc.getLocation(point, function(rs) {
          // console.log(rs.address);
          dizhi = rs.address;
          _this.$set(e, "dizhi", dizhi);
        });
      });
      // console.log(this.itemList);
    },
    onlinepengdun(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      console.log("5555");
      // if (pos.y > 30) {
      //   this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
      //     var msg = res.data.msg;
      //     if (msg === 'ok') {
      //       this.pullDownMsg = '更新成功';
      //       setTimeout(() => {
      //         this.movieList = res.data.data.movieList;
      //         this.pullDownMsg = '';
      //       }, 1000);

      //     }
      //   });
      // }
    }
  }
};
</script>

<style scoped>
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