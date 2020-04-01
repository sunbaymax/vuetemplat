<template>
  <div id="contaiter">
    <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="aui-mine-box">
        <div class="aui-mine-img line">
          <van-image round :src="imgsrc" />
        </div>
        <div class="weninfo">
          <div class="line">
            <span>昵称：</span>
            <h3 class="nickname">{{nickname}}</h3>
          </div>
          <div class="line">
            <span>手机号：</span>
            <h3 class="nickname">{{tel}}</h3>
          </div>
        </div>

        <!--<h3>1855221521</h3>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgsrc: '',
      nickname: '',
      tel: ''
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    var _openid = window.localStorage.getItem('freshDunOpenid');
    this.userobj = obj
    //创建组件时，加载第1页数据
    this.$axios.post('/index/Tb_Wei_User/index', this.$qs.stringify({
      openid: _openid
    })).then((res) => {
      console.log(res);
      this.imgsrc = res.data.data.headimgurl;
      this.nickname = res.data.data.nickname;
      this.tel = obj.user;
    }).catch(function (error) {
      console.log(error);
    });

  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.aui-mine-img .van-image__img {
  display: block;
  width: 80px;
  height: 80px;
}
</style>
<style scoped>
.content {
  padding: 0px 5px;
  box-sizing: border-box;
}
.content span {
  font-size: 14px;
}
.content .line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
}
.weninfo {
  margin-top: 15px;
}
.aui-mine-box {
  text-align: center;
  background: #ffffff;
  height: 240px;
  border-radius: 5px;

  padding: 10px 0;
}
.nickname {
  font-size: 14px;
  font-weight: bold;
  line-height: 2;
}
</style>