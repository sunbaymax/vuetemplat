<template>
  <div class="contaiter">
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="item">
        <van-icon class="iconfont" class-prefix="icon" name="phone_icon" />
        <van-field v-model="telphone" label="手机号码：" readonly />
      </div>
      <div class="item">
        <van-icon class="iconfont" class-prefix="icon" name="mima" />
        <van-field v-model="oldpsd" clearable label="原始密码：" type="password" placeholder="请输入原密码" />
      </div>
      <div class="item">
        <van-icon name="replay" size="16" color="#666666" />
        <van-field v-model="newpsd" clearable label="最新密码：" type="password" placeholder="请输入新密码" />
      </div>
      <div class="item">
        <!-- <van-icon class="iconfont" class-prefix="icon" name="querenmima1" /> -->
       <van-icon name="replay" size="16" color="#666666" />
        <van-field v-model="newpsdagain" clearable label="确认密码：" type="password" placeholder="请确认新密码" />
      </div>
      <div class="btn" v-show="isOriginHei">
        <van-button round class="btnok" color="#37c0c4" @click="addsubmit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

      telphone: '',
      oldpsd: '',
      newpsd: '',
      newpsdagain: '',
      userobj: '',
      isOriginHei: true,  //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight,  //默认屏幕高度
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  activated () {
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
    //创建组件时，加载第1页数据

  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    addsubmit () {
      if (this.telphone == '') {
        this.$toast.fail("手机号码不能为空");
        return false;
      } else if (this.oldpsd == '') {
        this.$toast.fail("原密码不能为空");
        return false;
      }
       else if (this.newpsd == '') {
        this.$toast.fail("新密码不能为空");
        return false;
      }
       else if (this.newpsdagain == '') {
        this.$toast.fail("确认密码不能为空");
        return false;
      }
       else if (this.newpsdagain != this.newpsd) {
        this.$toast.fail("两次密码输入不一致");
        return false;
      }
      this.$axios.post('/index/register/update_pwd', this.$qs.stringify({
        phone: this.userobj.user,
        old_pwd: this.oldpsd,
        new_pwd: this.newpsd
      })).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$toast.success('修改成功');
          this.userobj.pwd=this.newpsd;
          window.localStorage.setItem("useronline", JSON.stringify(this.userobj))
        } else {
          this.$toast.fail(res.data.message);


        }


      }).catch(function (error) {
        console.log(error);
      });
    }


  }
}
</script>


<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  background: #f2f2f2 !important;
}

.content .van-cell-group {
  margin-top: 10px;
}
.content .item {
  margin: 10px 5px;
  padding: 0px 5px !important;
  box-sizing: border-box !important;
  display: flex;
  align-items: center;
  background: #fff;
}
</style>

