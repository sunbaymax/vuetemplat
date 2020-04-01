<template>
  <div class="content">
    <van-nav-bar title="基础信息设置" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <div class="twoc">
        <van-field
          readonly
          clickable
          label="采集间隔："
          :value="value1"
          placeholder="请选择"
          @click="mqinAi1"
        />
        <div v-if="myIf1">
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              title="采集间隔(分钟)"
              show-toolbar
              :columns="columns1"
              :default-index="value1-1"
              @cancel="showPicker = false"
              @confirm="onConfirm1"
            />
          </van-popup>
        </div>
        <span class="wen">分钟</span>
      </div>

      <div class="twoc divjihuo">
        <van-field
          readonly
          clickable
          label="上传间隔"
          :value="value2"
          placeholder="请选择"
          @click="mqinAi2"
        />
        <div v-if="myIf2">
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              title="上传间隔(分钟)"
              show-toolbar
              :columns="columns2"
              :default-index="value2-1"
              @cancel="showPicker = false"
              @confirm="onConfirm2"
            />
          </van-popup>
        </div>
        <span class="wen">分钟</span>
      </div>
      <div v-if="istaocan==1" class="message">
        <span>*该为A套餐设置为5分钟及以上</span>
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
        <!-- <button class="btnok">保存</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userobj: '',
      list: {},
      isOriginHei: true,  //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight,  //默认屏幕高度
      GPSStart: '',
      did: '',
      myIf1: false,
      myIf2: false,
      value1: '',
      value2: '',
      columns1: [],
      columns2: [],
      showPicker: false,
      istaocan: ''
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
    let count = 60;
    for (var i = 1; i <= count; i++) {
      this.columns1.push(i);
      this.columns2.push(i);
    }
    window.onresize = () => {
      return (() => {
        if (this.documentHeight > document.documentElement.clientHeight) {
          this.isOriginHei = false
        } else {
          this.isOriginHei = true
        }
      })()
    }
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj = obj;
    this.did = this.$route.query.num_m;
    this.getdata(this.did)
  },
  methods: {
    onClickLeft () {
      this.$router.back(-1);
    },
    savebtn (GPSStart) {
      if(this.istaocan==1&&this.value2<5){
          this.$toast.fail("上传不能小于5分钟，请需升级套餐");
          return false;
      }
      this.$axios.post('/index/device/update_device', this.$qs.stringify({
        devid: this.did,
        GPS_Start: GPSStart,
        yejianshangchuankaiguan: '1',
        openid: this.userobj.copenid,
        UserP: "w",
        caiji_jiange_minute: this.value1,
        fasong_jiange_minute: this.value2


      })).then((res) => {

        if (res.data.code == 0) {
          this.$toast.success("参数同步成功");
        
          setTimeout(() => {
            location.reload();
          }, 1500);
        
        } else {
          this.$toast.fail("没有查询到该信息")

        }


      }).catch(function (error) {
        console.log(error);
      });
    },
    onConfirm1 (e) {
      this.value1 = e
      this.showPicker = false
    },
    onConfirm2 (e) {
      this.value2 = e
      this.showPicker = false
    },
    mqinAi1 () {
      this.myIf1 = true
      this.myIf2 = false
      this.showPicker = true
    },
    mqinAi2 () {
      this.myIf1 = false
      this.myIf2 = true
      this.showPicker = true

    },
    getdata (did) {
      // var that=this;
      this.$axios.post('/index/device/get_device_param', this.$qs.stringify({
        admin_permit: "zjly8888",
        UserP: "w",
        controller: "update",
        SheBeiBianHao: did,
        openid: this.userobj.copenid,
        admin_user: this.userobj.user,
        admin_pass: this.userobj.pwd

      })).then((res) => {
        console.log(res.data);
        if (res.data.code == 10000) {
          this.list = res.data.resultCode;
          console.log(res.data.resultCode.GPS_Start, 8888)
          this.GPSStart = res.data.resultCode.GPS_Start;
          this.value1 = parseInt(res.data.resultCode.caiji_jiange_minute);
          this.value2 = parseInt(res.data.resultCode.fasong_jiange_minute);
          this.istaocan = res.data.resultCode.flow_type;
          // this.$refs.btn_ok.attr("a",res.data.resultCode.GPS_Start)
        } else {
          this.$toast.error("没有查询到该信息")

        }


      }).catch(function (error) {
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
  background: #ffffff;
  border-bottom: 1px solid #f2f5f8;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.form .twoc .wen {
  display: inline-block;
  width: 60px;
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
</style>