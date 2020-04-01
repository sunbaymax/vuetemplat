<template>
  <div class="container_app">

    <div class="xiandunlogo">
      <img src="../../assets/img/linklogo.png" class="xdlogoimg" />
    </div>
    <div class="formdata">
      <div class="fieldset">
        <van-icon class="iconfont" class-prefix="icon" name="xingmingyonghumingnicheng" />
        <van-cell-group>
          <van-field
            label="账号"
            placeholder="请输入账号"
            label-width="50px"
            v-model="username"
            clearable
            ref="userinput"
          />
        </van-cell-group>
      </div>
      <div class="fieldset">
        <van-icon class="iconfont" class-prefix="icon" name="mima" />
        <van-cell-group>
          <van-field
            type="password"
            label="密码"
            placeholder="请输入密码"
            label-width="50px"
            v-model="password"
            ref="pswinput"
            clearable
          />
        </van-cell-group>
      </div>
      <div class="fieldset lastfieldset">
        <van-button class="loginok" @click="gologin()"></van-button>
      </div>
      <div class="lastfieldset">
        <van-checkbox v-model="checked" icon-size="14px" checked-color="#54C3C9" shape="square">记住账户</van-checkbox>
      </div>
       <div class="loginfooter">
         <router-link :to="{name:'Home'}"> 我要注册</router-link>
          <router-link :to="{name:'forgetpsd'}"> 忘记密码?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { stringify } from "querystring";
import { getUrlKey } from "../../untools/getUrlKey";
export default {
  data() {
    return {
      username: "",
      password: "",
      openId: "",
     
      checked:true
    };
  },
  created() {
    this.openId = getUrlKey("openId");
  },

  methods: {
    // 获取url参数
    gologin() {
      if (this.username == "") {
        this.$toast.fail("用户名不能为空");
        this.$refs.userinput.focus()
        return false;
      } else if (this.password == "") {
        this.$toast.fail("密码不能为空");
         this.$refs.pswinput.focus()
      }else{
      this.$axios
        .post(
          "/index/login",
          this.$qs.stringify({
            username: this.username,
            pwd: this.password,
            weixin_openid: this.openId
          })
        )
        .then(res => {
          console.log(res)
          if(res.data.code==0&&res.data.message=='success'){
          var xduser = {};
          xduser = {
            user: this.username,
            pwd: this.password,
            userType: res.data.data.tag,
            copenid: res.data.data.content.openid,
            duodian: res.data.duodian == undefined ? 0 : _json.data.duodian,
            uid: res.data.data.content.id
          };

          window.localStorage.setItem("useronline", JSON.stringify(xduser));
          this.$toast.success("登录成功");
          var that = this;
          setTimeout(function() {
            that.$router.push({ path: "/MachineList" });
          }, 1500);
          }else{
             this.$toast.fail(res.data.message);
          }

        })
        .catch(function(error) {
          console.log(error);
        });
        }
    }
  },
  activated() {
    let _openid = this.$route.query.openId;
    this.openId = _openid;
    window.localStorage.setItem("openId", _openid);
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#ffffff");
    console.log(this.$route.query.openId);
    if (localStorage.getItem("useronline")) {
      this.$router.push({ path: "/MachineList" });
    }
  }
};
</script>
<style>
.fieldset .van-cell {
  background: none !important;
}
.fieldset .van-cell-group {
  background: none !important;
}
</style>
<style scoped>
.loginfooter{
  margin-top: 50px;
  /* padding: 0 50px; */
  box-sizing: border-box;
  /* position: fixed; */
  /* bottom: 30px; */
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
}
.container_app {
  width: 100%;
  height: 100%;
}
.xiandunlogo {
  width: 100%;
  height: auto;
  margin: 100px auto 72px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.xiandunlogo img {
  width: 72px;
  height: 72px;
  border: 1px solid #cccccc;
  border-radius: 50%;
}
.formdata {
  padding: 0 50px;
  box-sizing: border-box;
}
.fieldset {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fieldset {
  padding: 0 15px;
  width: 100%;
  height: 50px;
  /* position: relative; */
  border: 1px solid #55c1c8;
  border-radius: 5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: inherit;
  align-items: center;
  margin: 20px 0;
}
.lastfieldset {
  padding: 0;
  margin: 15px auto 0px;
  border: 0;
}
.loginok {
  width: 100%;
  height: 50px;
  background: url("~@/assets/img/loginok.png") no-repeat center;
  background-size: cover;
  border: none;
}
</style>