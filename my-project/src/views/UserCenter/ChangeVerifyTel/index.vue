<template>
  <div class="contaiter">
    <van-nav-bar title="修改手机号" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="item">
        <van-cell-group>
          <van-field type="tel" v-model="telphone" maxlength="11" placeholder="请输入手机号" readonly />
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
      <div class="btn" v-show="isOriginHei">
        <van-button round class="btnok" color="#37c0c4" @click="submitbtn">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      telphone: '',
      verifycode: '',
      codeText: '获取',
      disabledCodeBtn: true,
      isOriginHei: true,  //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight,  //默认屏幕高度
    }
  },
  activated () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
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
    this.userobj = obj
    this.telphone = this.userobj.user
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 向后台要验证码方法
    async sendVerifycode () {
      if (this.verifyPhone()) {
        this.$toast.fail("手机号不能为空");
        return false;
      } else {      
        this.$axios.post('/index/register/sendCode', this.$qs.stringify({
          phone: this.userobj.user
        })).then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.countDown(60);
          } else {
            this.$toast.fail(res.data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });

      }
    },
    // 表单校验方法
    verifyPhone () {
      if (!this.telphone) {
        return '请输入手机号'
      } else if (this.telphone.length !== 11) {
        return '请输入11位手机号'
      } else {
        return false
      }
    },
    // 倒计时方法
    countDown (time) {
      if (time === 0) {
        this.disabledCodeBtn = true
        this.codeText = "获取"
        return
      } else {
        this.disabledCodeBtn = false;
        this.codeText = '重新发送(' + time + ')'
        time--
      }
      setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
    // 登录
    submitbtn () {
        if(this.verifycode==''){
            this.$toast.fail("手机号不能为空");
            return false;
        }
        this.$axios.post('/index/register/yanzheng_code', this.$qs.stringify({
          phone: this.userobj.user,
          code: this.verifycode
        })).then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$router.push({
              path: '/ChangeTel'
          })
          } else {
            this.$toast.fail(res.data.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
    }
  },
}
</script>

<style scoped>
.content {
  margin: 10px 0px;
}
.content .item {
  margin: 10px 5px;
  padding: 0px 5px !important;
  box-sizing: border-box !important;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 5px;
}
.content .item2 {
  margin: 10px 5px;
  padding: 0px 5px !important;
  box-sizing: border-box !important;

  background: #fff;
  border-radius: 5px;
}
</style>