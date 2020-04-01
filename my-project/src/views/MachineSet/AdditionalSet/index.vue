<template>
  <div class="content">
    <van-nav-bar title="设备报警设置" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="form">
      <div class="twoc">
        <div>解除绑定:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="isbanding"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>

      <div class="seller" v-for="(item,index) in tuisongTime" :key="index">
        <van-cell
          :title="`定时推送时间:${index+1}`"
          :value-class="className"
          :value="item"
          @click="showPopup(index)"
        />
        <van-icon name="add-o" v-if="index==0" @click="addtime" size="20px" />

        <van-icon name="close" v-else @click="jiantime(index)" size="20px" />
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择时间"
            :loading="isLoadingShow"
            :formatter="formatter"
            @cancel="show = false"
            @confirm="confirmPicker(currentDate,index)"
          />
        </van-popup>
      </div>

      <div class="btn" v-show="isOriginHei">
        <van-button
          round
          class="btnok"
          :data-id="GPSStart"
          color="#37c0c4"
          v-model="list.shebeibianhao"
          @click="savebtn(GPSStart)"
          ref="btn_ok"
        >保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userobj: "",
      list: {},
      isOriginHei: true, //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight, //默认屏幕高度
      isbanding: false,
      GPSStart: "",
      tuisongTime: ["请选择时间"],

      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      timeValue: "请选择时间",
      show: false,
      isLoadingShow: true,
      currentDate: new Date(),
      className: ""
    };
  },
  created() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        if (this.documentHeight > document.documentElement.clientHeight) {
          this.isOriginHei = false;
        } else {
          this.isOriginHei = true;
        }
      })();
    };
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    this.did = this.$route.query.num_m;
    this.getdata(this.did);
  },
  methods: {
    endTimeChange(e) {
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]
      this.userListForm.end_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`;
    },
    addtime() {
      this.tuisongTime.push("请选择时间");
    },
    jiantime(i) {
      this.tuisongTime.splice(i, 1);
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    savebtn(GPSStart) {
      if (this.isbanding) {
        this.$axios
          .post(
            "/index/Device/remove_bind",
            this.$qs.stringify({
              mainname: this.userobj.user,
              devicenumber: this.did
            })
          )
          .then(res => {
            console.log(res);
            this.$router.push({
              path: "/MachineList"
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.$axios
        .post(
          "/index/device/update_device",
          this.$qs.stringify({
            devid: this.did,
            GPS_Start: GPSStart,
            yejianshangchuankaiguan: "1",
            UserP: "w",
            dingshifasong:this.tuisongTime,
            chaodishidubaojingfazhi: this.warnhumidityLowval,
            openid: this.userobj.copenid
          })
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success("参数同步成功");

            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            this.$toast.fail("没有查询到该信息");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getdata(did) {
      // var that=this;
      this.$axios
        .post(
          "/index/device/get_device_param",
          this.$qs.stringify({
            admin_permit: "zjly8888",
            UserP: "w",
            controller: "update",
            SheBeiBianHao: did,
            openid: this.userobj.copenid,
            admin_user: this.userobj.user,
            admin_pass: this.userobj.pwd
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 10000) {
            this.list = res.data.resultCode;
            this.GPSStart = res.data.resultCode.GPS_Start;
            this.tuisongTime=res.data.resultCode.dingshifasong
           

     
          } else {
            this.$toast.error("没有查询到该信息");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 显示弹窗
    showPopup(index) {
      console.log(index)
      this.$store.commit("choosetime/CITY_INFO", { curttennm: index});
      this.show = true;
      this.isLoadingShow = true;
      setTimeout(() => {
        this.isLoadingShow = false;
      }, 500);
    },
    // 确认选择的时间
    confirmPicker(val, index) {
      //  this.$store.commit("choosetime/CITY_INFO", { curttennm: index});
      console.log(val, index);
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      // this.$store.state.city.id;

     let chooseid= this.$store.state.choosetime.curttennm;
     console.log(chooseid)
      this.tuisongTime[chooseid] = `${year}-${month}-${day} ${hour}:${minute}`;
      this.show = false;
    },
    // 选项格式化函数
    formatter(type, value) {
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
      } else if (type === "second") {
        return `${value}`;
      }
      return value;
    }
  }
};
</script>
<style>
.seller .van-cell {
  padding-left: 10px;
}
.seller .van-icon {
  color: #cccccc;
}
.twoc .van-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  text-align: right;
  background-color: transparent;
  border: 0;
  resize: none;
  padding-right: 5px;
}
.twoc .van-cell {
  width: auto;
  background: none;
}
.form .van-field__label {
  display: flex;
  justify-content: space-between;
}
</style>
<style scoped>
.form {
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 14px;
}
.form .twoc {
  height: 46px;
  line-height: 46px;
  padding: 0 10px;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 1px solid #f2f5f8;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form .twoc .twoc-right {
  display: flex;
}
.form .twoc .wen {
  margin: 0 5px;
  width: 30px;
  text-align: center;
}
.twoc .van-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  text-align: center !important;
  background-color: transparent;
  border: 0;
  resize: none;
}
.message {
  text-align: center;
  color: #999999;
  font-size: 13px;
  height: 40px;
  line-height: 40px;
}
.btn2 {
  margin: 15px auto;
  text-align: center;
}
.seller {
  display: flex;
  background: #ffffff;
  align-items: center;
  padding-right: 5px;
}
</style>