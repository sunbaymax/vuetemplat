<template>
  <div class="contaiter">
    <van-nav-bar title="编辑成员" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <van-cell-group>
        <van-field v-model="telphone" placeholder="请输入手机号码" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入昵称" />
      </van-cell-group>
      <div class="btn" v-show="isOriginHei">
        <van-button round class="btnok" color="#37c0c4" @click="editsubmit">修改</van-button>
        <van-button round class="btnok" color="#37c0c4" @click="delsubmit">删除</van-button>
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
    this.telphone = this.$route.query.tel
    this.nickname = this.$route.query.name
    //创建组件时，加载第1页数据

  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    cancel () {
      window.location.reload()
    },
    editsubmit () {
      if (this.telphone == '') {
        this.$toast.fail("请输入手机号码");
        return false;
      } else if (this.nickname == '') {
        this.$toast.fail("请输入昵称");
        return false;
      } else {
        var mymessage = confirm("您确定要修改吗?");
        if (mymessage == true) {
          this.$axios.post('/index/share/edit', this.$qs.stringify({
            mainname: this.userobj.user,
            aftername: this.telphone,
            nickname: this.nickname
          })).then((res) => {
            console.log(res.data);
            if (res.data.code == 0) {
              this.$toast.success('修改成功');
              var that = this;
              setTimeout(function () {
                that.$router.push({ path: "/InviteFamily" });
              }, 1500);


            } else {
              this.$toast.fail(res.data.message);


            }


          }).catch(function (error) {
            console.log(error);
          });
        }
        else { console.log("取消"); }
      }
    },
    delsubmit () {
      var mymessage = confirm("您确定要修改吗?");
       if (mymessage == true) {
      this.$axios.post('index/share/delete', this.$qs.stringify({
        mainname: this.userobj.user,
        aftername: this.telphone
      })).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$toast.success('删除成功');
            var that = this;
              setTimeout(function () {
                that.$router.push({ path: "/InviteFamily" });
              }, 1500);

         
        } else {
          this.$toast.fail(res.data.message);


        }


      }).catch(function (error) {
        console.log(error);
      });
       }else{
          console.log("取消删除");
       }
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
.content {
  padding: 0px 5px;
  box-sizing: border-box;
}
.content .van-cell-group {
  margin-top: 10px;
}
</style>

