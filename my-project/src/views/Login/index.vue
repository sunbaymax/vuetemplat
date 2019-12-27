<template>
  <div class="container_app">
    <div class="xiandunlogo">
      <img src="@/assets/img/xiandunlogo.png" class="xdlogoimg" />
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
            clearable
          />
        </van-cell-group>
      </div>
      <div class="fieldset lastfieldset">
        <van-button class="loginok" @click="gologin()"></van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { stringify } from 'querystring';

export default {
  data () {
    return {
      username: "18519773728",
      password: "123456",
      openId: 'owUdO5T21jOqFKWm5mKcZHl7jTBw'
    };
  },
  methods: {
    gologin () {
      this.$axios.post('/index/login', this.$qs.stringify({
        username: this.username,
        pwd: this.password,
        weixin_openid: this.openId
      })).then((res) => {
        console.log(res.data);
        var xduser = {};
        xduser = {
          "user": this.username,
          "pwd": this.password,
          "userType": res.data.data.tag,
          "copenid":res.data.data.content.openid,
          "duodian": res.data.duodian == undefined ? 0 : _json.data.duodian
        }

        window.localStorage.setItem("useronline", JSON.stringify(xduser))
        this.$router.push({
          path: '/MachineList'
        });

      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted () {
    let _openid = this.$route.query.openId;
    this.openId = _openid
    document.querySelector('body').setAttribute('style', 'background-color:#ffffff');
  }

};
</script>

<style scoped>
.xiandunlogo {
  width: 100%;
  height: auto;
  margin: 146px auto 72px;
  text-align: center;
}
.xiandunlogo img {
  width: 72px;
  height: 72px;
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
  margin: 0;
  border: 0;
}
.loginok {
  width: 100%;
  height: 50px;
  background: url('~@/assets/img/loginok.png') no-repeat center;
  background-size: cover;
  border: none;
}
</style>