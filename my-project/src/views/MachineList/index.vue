<template>
  <div id="main">
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
    <div id="content">
      <div class="movie_body">
        <Loading v-if="isLoading" />

        <Scroller
          v-else
          :handleToScroll="handleToScroll"
          :handleToTouchEnd="handleToTouchEnd"
          ref="data_List"
        >
          <keep-alive>
            <ul>
              <li v-for="(item,index) in itemList" :key="index">
                <div class="list-item-top">
                  <p class="listtoleft">
                    <span class="tittle" @tap="godetail(item.shebeibianhao)">
                      设备号：{{item.shebeibianhao}}
                      <span v-if="item.is_master==1" class="master">(主)</span>
                      <span v-else>(副)</span>
                    </span>
                    <span
                      v-show="item.beizhu.length>0"
                      class="beizhu"
                      @tap="gobackup(item.shebeibianhao,item.beizhu)"
                    >备注：{{item.beizhu}}</span>
                  </p>
                  <p class="listtopright">
                    <!-- <img src="@/assets/img/right_shop_car.png" class="rightimg" /> -->
                    <van-button
                      type="danger"
                      size="mini"
                      @click="cancel(item.shebeibianhao,item.is_master)"
                    >解绑</van-button>
                  </p>
                </div>
                <div class="list-item-center" @tap="godetail(item.shebeibianhao)">
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
                      <span
                        class="signal"
                        v-else-if="item.xinhaoqiangdu>5&&item.xinhaoqiangdu<=13"
                      >弱</span>
                      <span
                        class="signal"
                        v-else-if="item.xinhaoqiangdu>13&&item.xinhaoqiangdu<=20"
                      >良</span>
                      <span
                        class="signal"
                        v-else-if="item.xinhaoqiangdu>20&&item.xinhaoqiangdu<=26"
                      >好</span>
                      <span
                        class="signal"
                        v-else-if="item.xinhaoqiangdu>26&&item.xinhaoqiangdu<=100"
                      >强</span>
                      <span class="signal" v-else>无信号</span>
                    </p>
                    <p>
                      报警温度：
                      <span
                        class="alarmArea"
                      >{{item.baojingwendu_xiaxian}}-{{item.baojingwendu_shangxian}}℃</span>
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
              </li>

              <li class="pullDown" v-show="pullDownMsg">{{ pullDownMsg }}</li>
            </ul>
          </keep-alive>
        </Scroller>
      </div>
    </div>
    <van-dialog v-model="isShow" show-cancel-button :beforeClose="beforeClose">
      <van-field v-model="beizhu" maxlength="6" placeholder="请输入备注" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userobj: "",
      searchval: "",
      itemList: [],
      pullDownMsg: "",
      isLoading: true,
      prevCityId: -1,
      page: 0,
      total: 0,
      isShow: false,
      beizhu: ""
    };
  },

  activated() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    var cityId = this.$store.state.city.id;
    console.log("store" + cityId);

    if (this.prevCityId === cityId) {
      console.log("deng");
      return;
    }
    this.isLoading = true;
    this.page = 0;
    this.itemList = [];
    this.getroadList();
    //创建组件时，加载第1页数据
  },

  methods: {
    getroadList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "/index/device/device_list",
          this.$qs.stringify({
            openid: this.userobj.copenid,
            offset: this.page
          })
        )
        .then(res => {
          this.isLoading = false;
          let rows = res.data.data.data; //请求返回当页的列表
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.pullDownMsg = "没有更多了";
            this.$refs.data_List.scroll.refresh();
            return;
          } else if (rows.length < 5 && this.total < 5) {
            this.pullDownMsg = "没有更多了";
            this.itemList = rows;
            this.$refs.data_List.scroll.refresh();
            return;
          } else {
            this.isLoading = false;
            this.page = this.page + 5;
            this.total = res.data.data.count;

            // 将新数据与老数据进行合并
            this.itemList = this.itemList.concat(rows);
            //如果列表数据条数>=总条数，不再触发滚动加载
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gobackup(shebei, wen) {
      var nm = "北京";
      this.$store.commit("city/CITY_INFO", { id: shebei, nm });
      console.log(wen);
      this.isShow = true;
      this.beizhu = wen;
    },
    //解绑
    cancel(index, is_master) {
      let _jiebangurl = "";
      if (is_master == 0) {
        _jiebangurl = "/index/device/remove_scend_device";
      } else {
        _jiebangurl = "/index/Device/remove_bind";
      }

      this.$dialog
        .alert({
          title: "提示", //加上标题
          message: "确定是否对" + index + "设备号解绑？", //改变弹出框的内容
          showCancelButton: true //展示取水按钮
        })
        .then(() => {
          //点击确认按钮后的调用
          console.log("点击了确认按钮噢");

          // this.itemList.some((item, i) => {
          //   console.log(item);
          //   if (item.shebeibianhao == index) {
          //     this.itemList.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          //     return true;
          //   }
          // });
          // return false;

          this.$axios
            .post(
              _jiebangurl,
              this.$qs.stringify({
                mainname: this.userobj.user,
                devicenumber: index
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 0) {
                this.$toast.success("解绑成功");

                this.itemList.some((item, i) => {
                  console.log(item);
                  if (item.shebeibianhao == index) {
                    this.itemList.splice(i, 1); //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
                    return true;
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          //点击取消按钮后的调用
          console.log("点击了取消按钮噢");
        });
    },
    beforeClose(action, done) {
      let shebeihao=this.$store.state.city.id;
      if (action === "confirm") {
        setTimeout(done, 1000);
        this.$axios
          .post(
            "/index/device/update_device",
            this.$qs.stringify({
              devid: shebeihao,
              beizhu: this.beizhu,
              openid: this.userobj.copenid
            })
          )
          .then(res => {
             this.itemList.forEach((item,index) => {
                 if (item.shebeibianhao == shebeihao) {
                   this.$set(item,"beizhu",this.beizhu)
                 }
              })
          })
          .catch(error => {
            console.log(error);
          });
      } else if (action === "cancel") {
        done();
        console.log("cancel");
      }
    },
    godetail(index) {
      var nm = "北京";
      this.$store.commit("city/CITY_INFO", { id: index, nm });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", index);
      this.$router.push({ name: "latedata", params: { num_m: index } });
    },

    //滚动加载时触发，list组件定义的方法

    onSearch() {
      // this.isLoading = true;
      let params = {
        UserP: "w",
        admin_permit: "zjly8888",
        admin_user: this.userobj.user,
        admin_pass: this.userobj.pwd,
        SheBeiBianHao: this.searchval,
        StartTime: "2000-08-26 00:00:00",
        EndTime: "3000-01-01 00:00:00",
        StartNo: 0,
        Length: 1
      };
      this.$axios
        .post(
          "http://www.ccsc58.com/json/01_00_tb_history_data.php",
          this.$qs.stringify(params)
        )
        .then(res => {
          console.log(res);
          this.isLoading = false;
          if (res.data.code == "1") {
            this.$toast.fail("没有查询到该信息");
          } else if (res.data.code == "10000") {
            var nm = "北京";
            this.$store.commit("city/CITY_INFO", { id: this.searchval, nm });
            window.localStorage.setItem("nowNm", nm);
            window.localStorage.setItem("nowId", this.searchval);
            this.$router.push({
              name: "latedata",
              params: { num_m: this.searchval }
            });
            // this.itemList = res.data.resultCode.slice(0,1); //请求返回当页的列表
          } else {
            this.$toast.fail("没有查询到该信息");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addmachine() {
      this.$router.push({
        path: "/AddMachine"
      });
    },
    gousercenter() {
      this.$router.push({
        path: "/UserCenter"
      });
    },
    handleChangeName(value) {
      if (value === "") {
        return false;
      }
      console.log(value);
    },
    handleToDetail(movieId) {
      //console.log(movieId);
      this.$router.push("/movie/detail/1/" + movieId);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        // this.pullDownMsg = '正在更新中';
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 60) {
        this.$toast.loading({
          mask: true,
          message: "正在更新.."
        });

        setTimeout(() => location.reload(), 500);

        // this.$refs.data_List.scroll.refresh();
        console.log("上拉加载。。。");
      }
      if (this.$refs.data_List.scroll.maxScrollY > pos.y + 10) {
        this.pullDownMsg = "加载中...";
        this.getroadList();
      }
    }
  }

  // watch: {
  //   searchval (curVal, oldVal) {
  //     // 实现input连续输入，只发一次请求
  //     clearTimeout(this.timeout)
  //     this.timeout = setTimeout(() => {
  //       this.handleChangeName(curVal)
  //     }, 500)
  //   }
  // },
};
</script> 
<style>
</style> 
<style scoped>
li .list-item-top .listtoleft{
  display: flex;
  align-items: center;
}
li .list-item-top .beizhu {
  margin-left: 0.4rem;
  /* color: #c90000; */
  font-size: 0.32rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  /* width: 110px; */

  max-width: 110px;
}
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
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
.content {
  margin-top: 110px;
}
.movie_body {
  flex: 1;
  overflow: auto;
  margin-top: 100px;
}
/* .movie_body ul {
  padding: 0 15px;
  box-sizing: border-box;
} */
ul li {
  font-size: 14px;
  background: #ffffff;
  padding: 0 10px;
  border-radius: 5px;
}

ul li .list-content {
  /* margin-top: 105px; */
  /* overflow: scroll; */
  padding: 0 15px;
  box-sizing: border-box;
}
ul li .list-item {
  background: #ffffff;
  width: 100%;
  height: auto;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
ul li .list-item-top {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
}
li .list-item-top .tittle {
  color: #1b1b1b;
  font-size: 15px;
  font-weight: bold;
}
li .list-item-top .listtopright {
  display: flex;
  align-items: center;
}
li .list-item-top .beizhu {
  margin-left: 15px;
  /* color: #c90000; */
  font-size: 12px;
  font-weight: bold;
}
li .master {
  margin-right: 15px;
  font-size: 12px;
  color: #37c0c4;
}
li .list-item-top .rightimg {
  height: 14px;
  width: 10px;
}
li .list-item-center {
  color: #7a7a7a;
}
li .list-item-center div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.list-item-center div p {
  width: 180px;
}

.address {
  width: 80%;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
ul .pullDown {
  text-align: center;
  background: none;
  height: 20px;
  line-height: 20px;
  color: #666666;
  padding: 0;
  margin: 0;
}
</style>