<template>
  <div id="main">

    <van-nav-bar title="温控数据" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="menubar">
      <router-link tag="div" :to="{name:'latedata', params:{ num_m: num_m }}" @click="handtolatadat()">最新数据</router-link>
      <router-link tag="div" :to="{name:'histroydata', params:{ num_m: num_m }}">历史数据</router-link>
      <router-link tag="div" :to="{name:'parameterset', params:{ num_m: num_m }}">设备参数</router-link>
      <router-link tag="div" :to="{name:'warninglist', params:{ num_m: num_m }}">报警信息</router-link>
    </div>
  
    <!-- <div id="content"> -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "detaillist",

  data() {
    return {
      userobj: "",
      num_m: "",
      Tabactive: 0,
      // isLoading: true
    };
  },
  created() {
    document.querySelector("body").setAttribute("style", "background-color:#F2F2F2");
  },
  activated() {
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    this.num_m = this.$route.params.num_m;
    //创建组件时，加载第1页数据
  },

  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/MachineList"
      });
    },
    handtolatadat(){
           window.sessionStorage.setItem("caozuo",'0');
    },
    exit() {
      var mymessage = confirm("请确定是否退出?");
      if (mymessage == true) {
        window.localStorage.removeItem("useronline");
        window.sessionStorage.removeItem("goingpay");
        this.$router.push({
          path: "/"
        });
      } else {
        console.log("取消");
      }
    },
    onClick(name, title) {
      // this.$toast(title);
      console.log(title);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        // this.pullDownMsg = '正在更新中';
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.$refs.data_List.scroll.refresh();
      }
      if (this.$refs.data_List.scroll.maxScrollY > pos.y + 10) {
        //  console.log("加载更多");
        this.pullDownMsg = "加载中...";
        this.getroadList();
      }
    },

  }
};
</script>


<style>
.tempdata {
  width: 100%;
}
.tempdata .van-nav-bar {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 99;
}
.tempdata .van-hairline--top-bottom {
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 99;
  width: 100%;
}
</style>
<style scoped>
.menubar {
  display: flex;
  justify-content: center;
  font-size: 14px;
  height: 44px;
  line-height: 44px;
  background: #ffffff;
}
.menubar div {
  width: 100%;
  text-align: center;
}
.menubar .router-link-active {
  color: #37c0c4;
  border-bottom: 2px #37c0c4 solid;
}

#content .movie_body {
  flex: 1;
  overflow: auto;
}
.latecontent .movie_body ul {
  margin: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.tempdata .movie_body {
  flex: 1;
  overflow: auto;
  margin-top: 100px;
}

.movie_body .temptabs {
  margin: 0px 5px;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
#main #content {
  /* margin-top: 90px; */
}
.content_basic {
  /* margin-top: 100px; */
  /* padding: 0 5px; */
  box-sizing: border-box;
}
.latecontent {
  /* margin-top: 100px; */
}
#content .histroycontent {
  margin-top: 200px;
  /* padding: 0 5px; */
  box-sizing: border-box;
}
.content_basic li {
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

li p:first-child {
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

