<template>
  <div class="contaiter">
    <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div v-if="!istongguo">
        <div class="item">
          <van-cell-group>
            <van-field
              type="tel"
              v-model="telphone"
              maxlength="11"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '手机号不能为空' }]"
            />
          </van-cell-group>
        </div>
        <div class="item2">
          <van-cell-group>
            <van-field v-model="verifycode" center clearable placeholder="请输入验证码">
              <van-button
                slot="button"
                size="small"
                type="primary"
                color="#37C0C4"
                @click="sendVerifycode()"
                :disabled="!disabledCodeBtn"
              >{{codeText}}</van-button>
            </van-field>
          </van-cell-group>
        </div>
        <div class="item">
          <van-field
            type="text"
            placeholder="请输入动态验证码"
            class="code"
            @blur="checkLpicma"
            v-model="code"
            autocomplete="off"
          />
          <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="item">
          <van-cell-group>
            <van-field type="password" v-model="newpsd" placeholder="请输入新密码，数字或字母20位以内" />
          </van-cell-group>
        </div>
        <div class="item">
          <van-cell-group>
            <van-field type="password" v-model="psw" placeholder="请确认新密码" />
          </van-cell-group>
        </div>
      </div>

      <div class="btn" v-show="isOriginHei">
        <van-button v-if="!istongguo" round class="btnok" color="#37c0c4" @click="goyangzheng">验证</van-button>
        <van-button v-else round class="btnok" color="#37c0c4" @click="sumbitok">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "../../../component/Vsidentify";
export default {
  name: "sidentify",
  components: {
    "s-identify": SIdentify
  },
  data() {
    return {
      istongguo: false,
      yanzhengma: "",
      sidentify: "",
      telphone: "",
      verifycode: "",
      codeText: "获取",
      disabledCodeBtn: true,
      isOriginHei: true, //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight, //默认屏幕高度
      loginFailedNum: 1,
      identifyCodes: "1234567890", //ABCDEFG
      identifyCode: "",
      code: "", // text框输入的验证码
      VerificationCode: false,
      psw: "",
      newpsd: ""
    };
  },
  mounted() {
    this.refreshCode();
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  activated() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
    window.onresize = () => {
      return (() => {
        if (this.documentHeight > document.documentElement.clientHeight) {
          this.isOriginHei = false;
        } else {
          this.isOriginHei = true;
        }
      })();
    };
  },
  methods: {
    // 图片验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    checkLpicma() {
      if (this.code == "") {
        this.$toast.fail("请输入验证码");
        this.VerificationCode = false;
      } else if (this.code !== this.identifyCode) {
        this.$toast.fail("验证码不正确");
        this.refreshCode();
        this.code = "";
        this.VerificationCode = false;
      } else {
        this.$toast.success("验证码正确");
        this.VerificationCode = true;
      }
      return this.VerificationCode;
    },
    goyangzheng() {
      this.checkLpicma();
      if (this.telphone == "") {
        this.$toast.fail("手机号不能为空");
        return false;
      } else if (this.verifycode == "") {
        this.$toast.fail("验证不能为空");
        return false;
      } else if (!this.VerificationCode) {
        this.$toast.fail("动态验证码不正确");
        return false;
      } else {
        this.$axios
          .post(
            "/index/register/yanzheng_code",
            this.$qs.stringify({
              phone: this.telphone,
              code: this.verifycode
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
              this.istongguo = true;
              this.$toast.success("ok");
            } else {
              this.istongguo = false;
              this.$toast.fail(res.data.message);
              return false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    sumbitok() {
      if (this.psw == "") {
        this.$toast.fail("密码不能为空");
        return false;
      } else if (this.newpsd == "") {
        this.$toast.fail("确认密码不能为空");
        return false;
      } else if (this.newpsd != this.psw) {
        this.$toast.fail("二次密码不一致");
        return false;
      } else {
        this.$axios
          .post(
            "/index/register/forget_pwd",
            this.$qs.stringify({
              phone: this.telphone,
              code: this.verifycode,
              new_pwd: this.newpsd
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
             
              this.$toast.success("重置成功");
              setTimeout(function (){
                   location.reload();
              }, 1500);
             
            } else {
             
              this.$toast.fail(res.data.message);
              return false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 向后台要验证码方法
    async sendVerifycode() {
      if (this.verifyPhone()) {
        this.$toast.fail("手机号不能为空");
        return false;
      } else {
        this.$axios
          .post(
            "/index/register/sendCode",
            this.$qs.stringify({
              phone: this.telphone
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
              this.countDown(60);
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 表单校验方法
    verifyPhone() {
      if (!this.telphone) {
        return "请输入手机号";
      } else if (this.telphone.length !== 11) {
        return "请输入11位手机号";
      } else {
        return false;
      }
    },
    // 倒计时方法
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true;
        this.codeText = "获取";
        return;
      } else {
        this.disabledCodeBtn = false;
        this.codeText = "重新发送(" + time + ")";
        time--;
      }
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
    },
    // 登录
    submitbtn() {
      if (this.verifycode == "") {
        this.$toast.fail("手机号不能为空");
        return false;
      }
      // this.$axios.post('/index/register/yanzheng_code', this.$qs.stringify({
      //   phone: this.userobj.user,
      //   code: this.verifycode
      // })).then((res) => {
      //   console.log(res.data);
      //   if (res.data.code == 0) {
      //     this.$router.push({
      //       path: '/ChangeTel'
      //   })
      //   } else {
      //     this.$toast.fail(res.data.message);
      //   }
      // }).catch(function (error) {
      //   console.log(error);
      // });
    }
  }
};
</script>

<style scoped>
.code {
  width: 70% !important;
  float: left;
}
.login-code {
  width: 20%;
  float: left;
  cursor: pointer;
}
.content {
  margin: 10px 10px;
}
.content .item {
  margin: 10px 0px;
  padding: 0px 5px !important;
  box-sizing: border-box !important;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 5px;
}
.content .item2 {
  margin: 10px 0px;
  padding: 0px 5px !important;
  box-sizing: border-box !important;

  background: #fff;
  border-radius: 5px;
}
</style>