<template>
  <div class="contaiter">
    <van-nav-bar title=" 添加成员 " left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="item">
        <van-cell-group>
          <van-field v-model="telphone" placeholder="请输入手机号码" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="nickname" placeholder="请输入昵称" />
        </van-cell-group>
        <div class="btn" v-show="isOriginHei">
          <van-button round class="btnok" color="#37c0c4" @click="addsubmit">分享</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      telphone: '',
      nickname: '',
      userobj: '',
      isOriginHei: true,  //显示或者隐藏button
      documentHeight: document.documentElement.clientHeight,  //默认屏幕高度
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
    this.userobj = obj
    //创建组件时，加载第1页数据

  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    cancel () {
      window.location.reload()
    },
    addsubmit () {
      if (this.telphone == '') {
        this.$toast.fail("请输入手机号码");
        return false;
      } else if (this.nickname == '') {
        this.$toast.fail("请输入昵称");
        return false;
      }
      this.$axios.post('/index/share', this.$qs.stringify({
        mainname: this.userobj.user,
        aftername: this.telphone,
        nickname: this.nickname
      })).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$toast.success('设备绑定成功');
          this.$router.push({
            path: '/InviteFamily'
          })
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
.content .item{
  padding: 0px 5px !important;
  box-sizing: border-box !important;
}
</style>

