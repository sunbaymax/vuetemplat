<template>
  <div class="contaiter">
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <ul>
        <li @click="gomyinfo()">
          <p>
            <img src="@/assets/img/myinfo.png" class="biaozhu person" />
            <span>我的信息</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="goinvite()">
          <p>
            <img src="@/assets/img/myinvite.png" class="biaozhu invites" />
            <span>邀请家人</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="goservicepay()">
          <p>
            <img src="@/assets/img/mybill.png" class="biaozhu bill" />
            <span>服务费用</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="goacount()">
          <p>
            <img src="@/assets/img/mytel.png" class="biaozhu count" />
            <span>账户设置</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="gocomproblem()">
          <p>
            <img src="@/assets/img/myquestions.png" class="biaozhu question" />
            <span>常见问题</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="exit">
          <p>
            <img src="@/assets/img/myexit.png" class="biaozhu question" />
            <span>退出账户</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shebeihao: "",
      userobj: ""
    };
  },
  created() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
  },
  mounted() {
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    //创建组件时，加载第1页数据
  },

  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/MachineList"
      });
    },
    exit() {
      this.$dialog
        .alert({
          title: "提示", //加上标题
          message: "请确定是否退出", //改变弹出框的内容
          showCancelButton: true //展示取水按钮
        })
        .then(() => {
          window.localStorage.removeItem("useronline");
          window.sessionStorage.removeItem("goingpay");
          window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe4302af472b5c225&redirect_uri=http://www.ccsc58.cc/IceKnight/hly/oauth2-linkeplate.php?response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        })
        .catch(() => {
          //点击取消按钮后的调用
          console.log("点击了取消按钮噢");
        });

      // var mymessage = confirm("请确定是否退出?");
      // if (mymessage == true) {
      //   window.localStorage.removeItem("useronline");
      //   window.sessionStorage.removeItem("goingpay");
      //   this.$router.push({
      //     path: "/"
      //   });
      // } else {
      //   console.log("取消");
      // }
    },
    gomyinfo() {
      this.$router.push({
        path: "/MyInfo"
      });
    },
    gocomproblem() {
      this.$router.push({
        path: "/CommonProblem"
      });
    },
    goinvite() {
      this.$router.push({
        path: "/InviteFamily"
      });
    },
    goacount() {
      this.$router.push({
        path: "/AcountSet"
      });
    },
    goservicepay() {
      this.$router.push({
        path: "/ServePay"
      });
    }
  }
};
</script>


<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  background: #f2f2f2 !important;
}
ul {
  padding: 0px 5px;
}
ul li {
  list-style: none;
  background: #ffffff;
  padding: 0 15px;
  margin-top: 10px;
  font-size: 14px;
  height: 54px;
  line-height: 54px;
  margin: 10px 0px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.righticon {
  width: 10px;
  height: 16px;
  margin-right: 0px;
}
.biaozhu {
  width: 14px;
  height: 16px;
}
.invites {
  width: 18px;
  height: 16.5px;
}
.bill {
  width: 13.5px;
  height: 16.5px;
}
.count {
  width: 13.5px;
  height: 16.5px;
}
.question {
  width: 16px;
  height: 16.5px;
}
li p:first-child {
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

