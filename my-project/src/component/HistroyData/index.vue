<template>
  <div id="content">
    <!-- 头部公共搜索框 -->
    <div class="history-top">
      <div class="searchTime">
        <van-cell-group>
          <van-field
            v-model="starttime"
            clearable
            placeholder="请输入开始时间"
            class="starttime"
            @focus="start"
            readonly
          />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="endtime" clearable placeholder="请输入结束时间" @focus="end" readonly />
        </van-cell-group>
      </div>

      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
          @cancel="cancel"
          :formatter="formatter"
        />
      </van-popup>
      <van-popup v-model="show1" position="bottom">
        <van-datetime-picker
          v-model="currentDate1"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm1"
          @cancel="cancel1"
          :formatter="formatter"
        />
      </van-popup>
      <van-row>
        <van-col span="24">
          <van-button type="info" class="search_btn" @click="searchbtnok" size="small">查询</van-button>
        </van-col>
      </van-row>
      <div class="history_bar">
        <van-tabs
          v-model="historyactive"
          title-active-color="#1989fa"
          color="#1989fa"
          @click="barClick"
        >
          <van-tab title="数据列表"></van-tab>
          <van-tab title="温度曲线"></van-tab>
          <van-tab title="行驶轨迹"></van-tab>
          <van-tab title="数据下载"></van-tab>
        </van-tabs>
      </div>
    </div>

    <Scroller
      style="margin-top:100px"
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
      ref="data_List"
    >
      <div v-if="historyactive==0">
        <Historytable v-if="flag" v-bind:itemList="itemList"></Historytable>
        <div class="pullDown" v-else>此时间段暂无数据</div>
      </div>
      <div v-else-if="historyactive==1">
        <div id="myChart" v-if="flag" ref="myCharts"></div>

        <div v-else class="pullDown">此时间段暂无数据</div>
      </div>
      <div v-else-if="historyactive==2">
        <Historymap v-if="itemListMap.length>0" v-bind:itemListMap="itemListMap"></Historymap>
        <div class="pullDown" v-else>此时间段暂无数据</div>
      </div>
      <div v-else>
        <div v-if="flag">
          <van-field v-model="num_m" label="设备号:" />
          <van-field v-model="starttime" label="开始时间:" />
          <van-field v-model="endtime" label="结束时间:" />
          <van-field
            readonly
            clickable
            name="picker"
            :value="wenjian"
            label="文件格式"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>

          <div class="btn2">
            <van-button round class="btnok" color="#37c0c4" @click="exportbtn" ref="btn_ok">导出</van-button>
          </div>
        </div>
        <div v-else class="pullDown">此时间段暂无数据</div>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Historytable from "./Historytable";
import Historyechart from "./Historyechart";
import Historymap from "./Historymap";
export default {
  name: "HistoryData",
  components: {
    Historytable,
    Historyechart,
    Historymap
  },
  data() {
    return {
      wenjian: "pdf",
      columns: ["pdf", "excel"],
      showPicker: false,
      show: false, //开始时间弹窗
      show1: false, //结束时间弹窗
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "", //结束时间时间戳
      historyactive: 0,
      tableData: [],
      itemList: [],
      isLoading: true,
      prevCityId: -1,
      page: 0,
      pageSize: 5,
      flag: false,
      num_m: "",
      historyechair: [],
      itemListMap: [],
      exportdata: {}
    };
  },
  activated() {
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    this.starttime = this.dateFormat(new Date() - 24 * 60 * 60 * 1000);
    this.endtime = this.dateFormat(new Date());

    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {
      console.log("deng");
      return;
    }
    this.isLoading = true;
    this.historyactive = 0;
    this.num_m = this.$route.params.num_m;
    this.getroadList(this.starttime, this.endtime);
  },
  mounted() {},
  methods: {
    onConfirm(value) {
      this.wenjian = value;
      this.showPicker = false;
    },
    getroadList(starttime, endtime) {
      this.$axios
        .post(
          "http://www.ccsc58.com/json/xiandun_history_data.php",
          this.$qs.stringify({
            StartTime: starttime,
            EndTime: endtime,
            UserP: "w",
            admin_permit: "zjly8888",
            SheBeiBianHao: this.num_m,
            StartNo: this.page,
            Length: this.pageSize,
            admin_user: this.userobj.user,
            admin_pass: this.userobj.pwd
          })
        )
        .then(res => {
          // console.log(res);
          this.isLoading = false;
          this.prevCityId = this.$store.state.city.id;
          let rows = res.data.resultCode;
          if (res.data.resultCode == "null") {
            if (this.itemList.length == 0) {
              this.itemList = [];
              this.flag = false;
              return false;
            } else {
              this.itemList = this.itemList.concat(rows);
            }
          } else if (res.data.code == 30000) {
            if (this.itemList.length == 0) {
              this.itemList = [];
              this.flag = false;
              return false;
            } else {
              this.itemList = this.itemList.concat(rows);
            }
          } else {
            this.flag = true;
            this.itemList = this.itemList.concat(rows);
            this.pageSize = this.pageSize + 10;
            this.page = this.page + 5;
            this.baiduMap();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    exportbtn() {
      if (this.wenjian == "pdf") {
        window.location.href =
          "http://www.ccsc58.com/tcpdf/pdf/pdf_out.php?s=" +
          this.num_m +
          "&t1=" +
          this.starttime +
          "&t2=" +
          this.endtime;
      } else {
        window.location.href =
          "http://www.ccsc58.com/PHPExcel/PHPExcel/xls_out.php?s=" +
          this.num_m +
          "&t1=" +
          this.starttime +
          "&t2=" +
          this.endtime;
      }
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
    barClick(name, title) {
      console.log(name, title);
      if (title == "温度曲线") {
        this.page = 0;
        this.$axios
          .post(
            "http://www.ccsc58.com/json/09_00_tb_draw_line.php",
            this.$qs.stringify({
              StartTime: this.starttime,
              EndTime: this.endtime,
              UserP: "w",
              admin_permit: "zjly8888",
              SheBeiBianHao: this.num_m,
              StartNo: this.page,
              Length: this.pageSize,
              admin_user: this.userobj.user,
              admin_pass: this.userobj.pwd
            })
          )
          .then(res => {
            if (res.data.code == 10000 && res.data.message == "noData") {
              this.flag = false;
              this.historyechair = [];
              return false;
            } else {
              this.historyechair = res.data.resultCode;
              this.flag = true;
              this.$nextTick(() => {
                this.drawLine();
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (title == "行驶轨迹") {
        let that=this;
        this.page = 0;
        this.$axios
          .post(
            "http://www.ccsc58.com/json/01_01_tb_history_data_map.php",
            this.$qs.stringify({
              StartTime: this.starttime,
              EndTime: this.endtime,
              UserP: "w",
              admin_permit: "zjly8888",
              SheBeiBianHao: this.num_m,
              StartNo: this.page,
              Length: this.pageSize,
              admin_user: this.userobj.user,
              admin_pass: this.userobj.pwd
            })
          )
          .then(res => {
            console.log(res.data)
            if (res.data.code == 10000 && res.data.message == "noDate") {
              this.flag = false;
              this.itemListMap = [];
              return false;
            } else {
               this.flag = true;

                // this.itemListMap = res.data.resultCode;
                 this.$nextTick(function () {
                     that.itemListMap = res.data.resultCode;
                       console.log(1, this.itemListMap);
                    })
                              

            
            }
          })
          .catch(function(error) {
            console.log(error);
          });

        console.log("行驶轨迹");
      } else if (title == "数据下载") {
        let obj = {
          num: this.num_m,
          starttime: this.starttime,
          endtime: this.endtime,
          type: "pdf"
        };
        this.exportdata = obj;
      }
    },
    // 选择开始时间
    start() {
      this.show = true;
    },
    // 选择结束时间
    end() {
      this.show1 = true;
    },
    // 点击确定
    confirm() {
      this.show = false;

      this.starttime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1 >= 10
          ? Number(this.currentDate.getMonth()) + 1
          : "0" + (Number(this.currentDate.getMonth()) + 1)) +
        "-" +
        (Number(this.currentDate.getDate()) + 0 >= 10
          ? Number(this.currentDate.getDate()) + 0
          : "0" + (Number(this.currentDate.getDate()) + 0)) +
        " " +
        (Number(this.currentDate.getHours()) + 0 >= 10
          ? Number(this.currentDate.getHours()) + 0
          : "0" + (Number(this.currentDate.getHours()) + 0)) +
        ":" +
        (Number(this.currentDate.getMinutes()) + 0 >= 10
          ? Number(this.currentDate.getMinutes()) + 0
          : "0" + (Number(this.currentDate.getMinutes()) + 0)) +
        ":" +
        (Number(this.currentDate.getSeconds()) + 0 >= 10
          ? Number(this.currentDate.getSeconds()) + 0
          : "0" + (Number(this.currentDate.getSeconds()) + 0));
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    searchbtnok() {
      this.getroadList(this.starttime, this.endtime);
    },
    confirm1() {
      this.show1 = false;
      this.endtime =
        this.currentDate1.getFullYear() +
        "-" +
        (Number(this.currentDate1.getMonth()) + 1 >= 10
          ? Number(this.currentDate1.getMonth()) + 1
          : Number(this.currentDate1.getMonth()) + 1) +
        "-" +
        (Number(this.currentDate1.getDate()) + 0 >= 10
          ? Number(this.currentDate1.getDate()) + 0
          : "0" + (Number(this.currentDate1.getDate()) + 0)) +
        " " +
        (Number(this.currentDate1.getHours()) + 0 >= 10
          ? Number(this.currentDate1.getHours()) + 0
          : "0" + (Number(this.currentDate1.getHours()) + 0)) +
        ":" +
        (Number(this.currentDate1.getMinutes()) + 0 >= 10
          ? Number(this.currentDate1.getMinutes()) + 0
          : "0" + (Number(this.currentDate1.getMinutes()) + 0)) +
        ":" +
        (Number(this.currentDate1.getSeconds()) + 0 >= 10
          ? Number(this.currentDate1.getSeconds()) + 0
          : "0" + (Number(this.currentDate1.getSeconds()) + 0));
      this.starttime1 = new Date(this.currentDate1).getTime() / 1000;
    },
    cancel1() {
      this.show1 = false;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      const myCharts = this.$echarts.init(this.$refs.myCharts);
      let servertime = [];
      let wendu = [];
      let shidu = [];
      this.historyechair.forEach(function(val) {
        servertime.push(val.time);
        wendu.push(parseFloat(val.temperature01).toFixed(1));
        shidu.push(parseFloat(val.humidity).toFixed(1));
      });

      let options = {
        tooltip: {
          //鼠标悬浮框的提示文字
          trigger: "axis"
        },

        legend: {
          data: ["温度", "湿度"]
        },
        xAxis: [
          {
            //x轴坐标数据
            type: "category",
            boundaryGap: false,
            data: servertime
          }
        ],
        yAxis: [
          {
            //y轴坐标数据
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
          {
            name: "温度",
            type: "line", //pie->饼状图  line->折线图  bar->柱状图
            data: wendu
          },
          {
            name: "湿度",
            type: "line", //pie->饼状图  line->折线图  bar->柱状图
            data: shidu
          }
        ]
      };
      myCharts.setOption(options);
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}`;
      } else if (type === "month") {
        return `${value}`;
      } else if (type === "day") {
        return `${value}`;
      } else if (type === "hour") {
        return `${value}`;
      } else if (type === "minute") {
        return `${value}`;
      } else if (type === "seconds") {
        return `${value}`;
      }
      return value;
    },
    dateFormat: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
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
        this.pullDownMsg = "加载中...";
        this.getroadList(this.starttime, this.endtime);
      }
    }
  }
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
#content #myChart {
  width: 100%;
  height: 300px;
  background: #cce6f0;
  /* margin: 100px auto 0px; */
}
</style>
<style  scoped>
.history-top {
  width: 100%;
  position: absolute;
  top: 0px;
  z-index: 999;
  background: #fff;
}
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
.pullDown {
  text-align: center;
  background: none;
  height: 30px;
  line-height: 30px;
  color: #666666;
  padding: 0;
  margin: 0;
}
.btn2 {
  text-align: center;
  margin: 15px 0;
}
</style>
