<template>
  <div class="content">
    <van-nav-bar title="基础信息设置" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="form">
      <div>
        <span>设备编号：</span>
        <input
          type="number"
          class="shebeihao read"
          v-model="list.shebeibianhao"
          readonly="readonly"
          biao="0"
          yejian="0"
          disabled
        />
      </div>
      <div>
        <span>设备名称：</span>
        <input type="text" class="shebeihaoname read" v-model="list.device_name" readonly="readonly" disabled />
      </div>
     
      <div class="twoc divjihuo">
        <span>激活时间：</span>
        <input type="text" class="activeTime read" v-model="list.jihuoshijian" readonly="readonly" disabled  />
      </div>
      <div>
        <span>到期时间：</span>
        <input type="text" class="daoqiTime read" v-model="list.daoqishijian" readonly="readonly" disabled  />
      </div>
       <div class="twoc">
        <span>设备昵称：</span>
        <input type="text" class="bieming " v-model="list.beizhu" placeholder="如一号大门" />
      </div>
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
      did:''
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
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
      // alert("123");
      this.$axios.post('/index/device/update_device', this.$qs.stringify({
        devid: this.did,
        beizhu: this.list.beizhu,
        GPS_Start: GPSStart,
        yejianshangchuankaiguan: '1',
        openid: this.userobj.copenid

      })).then((res) => {
     
        if (res.data.code == 0) {
         this.$toast.success("参数同步成功");
         setTimeout(() =>{
           location.reload();
        },1500);
         //this.$router.go(0);
        } else {
          this.$toast.error("没有查询到该信息")

        }


      }).catch(function (error) {
        console.log(error);
      });
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

<style scoped>
.form {
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 14px;
}
.form div {
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  background: #ffffff;
  border-bottom: 1px solid #f2f5f8;
  margin: 5px 0;
  border-radius: 5px;
}
.form div input {
  border: none;
  text-align: right;
  /* background: none; */
}

</style>