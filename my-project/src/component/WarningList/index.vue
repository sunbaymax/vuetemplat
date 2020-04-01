<template>
  <div id="content">
    <div class="movie_body" ref="movie_body">
      <Loading v-if="isLoading" />
      <div v-else-if="itemList.length==0" class="warnno">暂无报警信息</div>
      <Scroller
        v-else
        :handleToScroll="handleToScroll"
        :handleToTouchEnd="handleToTouchEnd"
        ref="data_List"
      >
        <ul>
          <li class="details_now warning_list" v-for="(item,index) in  itemList" :key="index">
            <div class="list_tittle">
              <p class="baojingwen">
                <img class="warningimg" src="img/baojin.png" alt />
                <span class="shebeihao">{{item.shebeibianhao}}</span>
              </p>

              <p>
                <span class="worktime">{{item.time}}</span>
              </p>
            </div>
            <div class="list-content">
              <div>
                <p>
                  温度：
                  <span class="temp1">{{item.temperature01}}</span>℃
                </p>
                <p>
                  温度阀值：
                  <label for>
                    <span
                      class="temp2"
                    >{{item.baojingwendu_xiaxian}}~{{item.baojingwendu_shangxian}}</span>℃
                  </label>
                </p>
              </div>
              <div>
                <p>
                  湿度：
                  <span class="humidity">{{item.humidity}}</span>%RH
                </p>
                <p>
                  湿度阀值：
                  <label for>
                    <span class="temp2" v-if="item.chaodishidubaojingfazhi=='-99999.9'">-</span>
                    <span class="temp2" v-else>{{item.chaodishidubaojingfazhi}}</span>
                    ~
                    <span class="temp2" v-if="item.chaogaoshidubaojingfazhi=='99999.9'">-</span>
                    <span class="temp2" v-else>{{item.chaogaoshidubaojingfazhi}}</span>%RH
                  </label>
                </p>
              </div>
              <div>
                <p>
                  电量：
                  <span class="power">{{item.power}}</span>%
                </p>
                <p>
                  电量阀值：
                  <span class="power">{{item.dianliang_xiaxian}}</span>%
                </p>
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
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [],
      isLoading: true,
      num_m: "",
      prevCityId: -1
    };
  },

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
    this.isLoading = true;
    this.$nextTick(() => {
      this.getroadList(this.$route.params.num_m);
    });

    this.num_m = this.$route.params.num_m;
  },

  methods: {
    getroadList(val) {
      console.log(val);
      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "http://www.ccsc58.com/json/xiandun_baojing.php",
          this.$qs.stringify({
            UserP: "w",
            admin_permit: "zjly8888",
            SheBeiBianHao: val,
            StartNo: this.page,
            Length: this.pageSize,
            admin_user: this.userobj.user,
            admin_pass: this.userobj.pwd
          })
        )
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.prevCityId = this.$store.state.city.id;
          if (res.data.code == "10000" && res.data.message == "nodata") {
            this.itemList = "";
            return false;
          } else {
            let rows = res.data.resultCode; //请求返回当页的列表
            // 将新数据与老数据进行合并
            if (this.itemList.length < 5) {
              this.itemList = rows;
              this.page = this.page + 10;
            } else {
              this.itemList = this.itemList.concat(rows);
              this.page = this.page + 10;
            }

            //如果列表数据条数>=总条数，不再触发滚动加载
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
      if (pos.y > 30) {
        this.$refs.data_List.scroll.refresh();
      }
      if (this.$refs.data_List.scroll.maxScrollY > pos.y + 10) {
        //  console.log("加载更多");
        this.pullDownMsg = "加载中...";
        // this.getroadList(this.num_m)

        this.getroadList(this.num_m);
      }
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
  margin: 0 12px;
  overflow: hidden;
}
/* @import url(); 引入css类 */
.details_now {
  height: 140px;
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
.warnno {
  width: 100%;
  text-align: center;
  margin: 10px 0px;

  color: #333;
  text-align: center;
  background: none;
  height: 20px;
  line-height: 20px;
  color: #666666;
  padding: 0;
}
.warning_list .list_tittle .shebeihao {
  color: #c42c19;
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
.baojingwen {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.warningimg {
  height: 16px;
  width: 16px;
  margin-right: 5px;
}
.list-content div p {
  width: 50%;
  text-align: left;
}
</style>