<template>
  <div class="contaiter">
    <van-nav-bar title="服务费" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <ul>
        <li @click="goupbill()">
          <p>
            <img src="@/assets/img/myshengj.png" class="biaozhu person" />
            <span>流量套餐升级</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="gobill()">
          <p>
            <img src="@/assets/img/mybill.png" class="biaozhu invites" />
            <span>代缴服务费</span>
          </p>
          <p>
            <img src="@/assets/img/right_shop_car.png" class="righticon" />
          </p>
        </li>
        <li @click="gopaylist()">
          <p>
            <img src="@/assets/img/mypaylist.png" class="biaozhu invites" />
            <span>缴费记录</span>
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
        path: "/UserCenter"
      });
    },
    gobill() {
      this.$router.push({
        path: "/Bill"
      });
    },
    gopaylist() {
      this.$router.push({
        path: "/Paylist"
      });
    },

    goupbill() {
      this.$router.push({
        path: "/UpbillList"
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
  width: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
li p:first-child img {
  margin-right: 15px;
}
</style>

