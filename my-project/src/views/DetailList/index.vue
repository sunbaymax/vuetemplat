<template>
  <div class="contaiter">
    <van-nav-bar title="温控数据" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="movie_body">
      <van-tabs v-model="Tabactive" title-active-color="#55CAC4" color="#55CAC4">
        <van-tab title="最新数据">
          <!-- <Loading v-if="isLoading" /> -->
          <Scroller>
            <latesData :msg-father="id"></latesData>
          </Scroller>
        </van-tab>
        <van-tab title="历史数据">内容 2</van-tab>
        <van-tab title="设备参数">
         
            <ul class="content_basic">
              <li>
                <p> 
                  <span>基础信息设置</span>
                </p>
                <p>
                  <img src="@/assets/img/right_shop_car.png" class="righticon" />
                </p>
              </li>
                <li>
                <p> 
                  <span>参数信息设置</span>
                </p>
                <p>
                  <img src="@/assets/img/right_shop_car.png" class="righticon" />
                </p>
              </li>
                <li>
                <p> 
                  <span>设备报警设置</span>
                </p>
                <p>
                  <img src="@/assets/img/right_shop_car.png" class="righticon" />
                </p>
              </li>
                <li>
                <p> 
                  <span>附加参数设置</span>
                </p>
                <p>
                  <img src="@/assets/img/right_shop_car.png" class="righticon" />
                </p>
              </li>
            </ul>
          
        </van-tab>
        <van-tab title="报警信息">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import latesData from "../../component/LatestData"
export default {
  name: "detaillist",
  components: {
    latesData,
    isLoading: true,
  },
  data () {
    return {
      userobj: '',
      id: '123',
      Tabactive:0
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj = obj
    this.id = this.$route.params.id
    //创建组件时，加载第1页数据

  },

  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/MachineList'
      })
    },
    exit () {
      var mymessage = confirm("请确定是否退出?");
      if (mymessage == true) {
        window.localStorage.removeItem('useronline');
        window.sessionStorage.removeItem("goingpay");
        this.$router.push({
          path: '/'
        })
      }
      else {
        console.log("取消")
      }
    },
    onClick (name, title) {
      // this.$toast(title);
      console.log(title)
    },
    handleToScroll (pos) {
      if (pos.y > 30) {
        // this.pullDownMsg = '正在更新中';
      }
    },
    handleToTouchEnd (pos) {
      if (pos.y > 30) {
        this.$refs.data_List.scroll.refresh()
      }
      if (this.$refs.data_List.scroll.maxScrollY > pos.y + 10) {
        //  console.log("加载更多");
        this.pullDownMsg = "加载中...";
        this.getroadList()
      }
    },

  }
}
</script>


<style scoped>
.contaiter {
  width: 100%;
}
#content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
  width: 100vw;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
}

#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body .contant {
  margin: 0px 5px;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.content_basic{
  padding: 0 5px;
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

