<template>
  <div class="contaiter">
    <van-nav-bar title="账户设置" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="invitebtn" @click="gochangetel()">
        <p class="item">
          手机号：
          <span class="telitem">
            <label>18519773728</label>
             <van-icon name="edit" slot="right" color="#C3C3C3" size="20" />
          </span>
        </p>
       
      </div>
      <div class="invitebtn" @click="goresetpsd()">
        修改密码
        <van-icon name="edit" slot="right" color="#C3C3C3" size="20" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userobj: '',
      list: []
    }
  },

  activated () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj = obj
    //创建组件时，加载第1页数据
    this.$axios.post('/index/share/membersList', this.$qs.stringify({
      mainname: this.userobj.user,
    })).then((res) => {
      console.log(res.data);
      if (res.data.code == 0) {
        this.list = res.data.data.content;
      } else {
        this.$toast.fail(res.data.message);
      }
    }).catch(function (error) {
      console.log(error);
    });

  },

  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/UserCenter'
      })
    },
    gochangetel(){
       this.$router.push({
        path: '/ChangeVerifyTel'
      })
    },
    goresetpsd () {
      this.$router.push({
        path: '/ResetPsd'
      })
    },
    detail (_name, _tel) {
      console.log(_name, _tel);
      this.$router.push({
        path: '/InviteEditFamily',
        query: { tel: _tel, name: _name }
      })
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
.item {
  display: contents;
}
.telitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
}
.content .van-cell-group {
  margin-top: 10px;
}
h4 {
  margin: 10px 0px 5px 5px;
  font-size: 15px;
  font-weight: bold;
}
.invitebtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  line-height: 56px;
  background: #ffffff;
  margin-top: 10px;
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  /* font-weight: bold; */
  font-size: 14px;
}
.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  background: #ffffff;
  border-radius: 5px;
  padding: 0px 5px;
  font-family: '黑体';
  margin: 5px 0px;
}
.list li p {
  width: 70%;
}

li p .name {
  display: inline-block;
  width: 60px;
  margin-left: 5px;
}
li p .tel {
  margin-left: 14px;
}
.right {
  width: 12px;
  height: 16px;
  margin-right: 2px;
}
</style>

