<template>
  <div class="content">
    <van-nav-bar title="设备报警设置" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="form">
      <div class="twoc">
        <div>是否开启温度上限报警:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="istempwarnhigh"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>
      <div class="twoc">
        <div>报警上限温度：</div>
        <div class="twoc-right">
          <van-stepper v-model="warnHighval" />
          <span class="wen">℃</span>
        </div>
      </div>
      <div class="twoc">
        <div>是否开启温度下限报警:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="istempwarnlow"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>
      <div class="twoc">
        <div>报警下限温度：</div>
        <div class="twoc-right">
          <van-stepper v-model="warnLowval" />
          <span class="wen">℃</span>
        </div>
      </div>

      <div class="twoc">
        <div>是否开启湿度上限报警:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="ishumiditywarnhigh"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>
      <div class="twoc">
        <div>报警上限湿度：</div>
        <div class="twoc-right">
          <van-stepper v-model="warnhumidityHighval" />
          <span class="wen">%RH</span>
        </div>
      </div>
      <div class="twoc">
        <div>是否开启湿度下限报警:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="ishumiditywarnlow"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>
      <div class="twoc">
        <div>报警下限湿度：</div>
        <div class="twoc-right">
          <van-stepper v-model="warnhumidityLowval" />
          <span class="wen">%RH</span>
        </div>
      </div>

      <div class="twoc">
        <div>是否开启电量下限报警:</div>

        <van-field name="switch">
          <template #input>
            <van-switch
              v-model="ispowerlow"
              size="20"
              active-color="#07c160"
              inactive-color="white"
            />
          </template>
        </van-field>
      </div>
      <div class="twoc">
        <div>报警下限电量：</div>
        <div class="twoc-right">
          <van-stepper v-model="ispowerlowval" />
          <span class="wen">%</span>
        </div>
      </div>

      <div class="btn2" v-show="isOriginHei">
        <van-button
          round
          class="btnok"
          :data-id="GPSStart"
          color="#37c0c4"
          v-model="list.shebeibianhao"
          @click="savebtn(GPSStart)"
          ref="btn_ok"
        >保存</van-button>
        <!-- <button class="btnok">保存</button> -->
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
      istempwarnhigh: false,
      istempwarnlow: false,
      ishumiditywarnhigh: false,
      ishumiditywarnlow: false,
      ispowerlow: false,
      GPSStart: "",
      warnHighval: 8,
      warnLowval: 2,
      warnhumidityLowval: 1,
      warnhumidityHighval: 1,
      ispowerlowval: 15
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
    onClickLeft() {
      this.$router.back(-1);
    },
    savebtn(GPSStart) {
      if (this.istempwarnhigh==true&&this.istempwarnlow==true&&this.warnHighval < this.warnLowval) {
        this.$toast.fail("报警温度上限不能小于报警温度下限值");
        return false;
      } else if (this.ishumiditywarnhigh==true&&this.ishumiditywarnlow==true&&this.warnhumidityLowval > this.warnhumidityHighval) {
        this.$toast.fail("报警湿度上限不能小于报警湿度下限值");
        return false;
      } else {
        this.$axios
          .post(
            "/index/device/update_device",
            this.$qs.stringify({
              devid: this.did,
              GPS_Start: GPSStart,
              yejianshangchuankaiguan: "1",
              UserP: "w",
              baojingwendu_shangxian_baojing:
                this.istempwarnhigh == true ? 1 : 0,
              baojingwendu_shangxian: this.warnHighval,
              baojingwendu_xiaxian: this.warnLowval,
              baojingwendu_xiaxian_baojing: this.istempwarnlow == true ? 1 : 0,
              dianliang_xiaxian: this.ispowerlowval,
              dianliang_xiaxian_baojing: this.ispowerlow == true ? 1 : 0,
              chaogaoshidubaojing: this.ishumiditywarnhigh == true ? 1 : 0,
              chaogaoshidubaojingfazhi: this.warnhumidityHighval,
              chaodishidubaojing: this.ishumiditywarnlow == true ? 1 : 0,
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
      }
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
            this.istempwarnhigh =
              res.data.resultCode.baojingwendu_shangxian_baojing == 0
                ? false
                : true;
            this.istempwarnlow =
              res.data.resultCode.baojingwendu_xiaxian_baojing == 0
                ? false
                : true;
            this.warnHighval = parseInt(
              res.data.resultCode.baojingwendu_shangxian
            );
            this.warnLowval = parseInt(
              res.data.resultCode.baojingwendu_xiaxian
            );

            this.ishumiditywarnhigh =
              res.data.resultCode.chaogaoshidubaojing == 0 ? false : true;
            this.ishumiditywarnlow =
              res.data.resultCode.chaodishidubaojing == 0 ? false : true;
            this.warnhumidityHighval = parseInt(
              res.data.resultCode.chaogaoshidubaojingfazhi
            );
            this.warnhumidityLowval = parseInt(
              res.data.resultCode.chaodishidubaojingfazhi
            );

            this.ispowerlow =
              res.data.resultCode.dianliang_xiaxian_baojing == 0 ? false : true;
            this.ispowerlowval = parseInt(
              res.data.resultCode.dianliang_xiaxian == 0
                ? 1
                : res.data.resultCode.dianliang_xiaxian
            );
          } else {
            this.$toast.error("没有查询到该信息");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
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
</style>