<template>
  <div>
    <van-nav-bar title="缴费记录" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <Loading v-if="isLoading" />

    <Scroller
      v-else
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
      ref="data_List"
    >
      <keep-alive>
        <ul id="content">
          <li class="item" v-for="(item,index) in itemList" :key="index">
            <div>
              <span>设备号：</span>
              <span class="shebeihao">{{item.shebeihao}}</span>
            </div>
            <div>
              <span>套餐名：</span>
              <span class="shebeihao">{{item.name}}</span>
            </div>
            <div>
              <span>缴费时间：</span>
              <span class="nowtime">{{item.addtime}}</span>
            </div>
            <div>
              <span>缴费金额：</span>
              <span class="money">{{item.money}}</span>
            </div>
          </li>
        </ul>
      </keep-alive>
    </Scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      page:1,
      size:5,
      itemList:[]
    };
  },
  activated() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    this.page=1;
    this.getdata()
  },
  methods: {
    getdata() {
      this.$axios
        .post(
          "/index/flow_package/service_record_list",
          this.$qs.stringify({
            u_id: this.userobj.uid,
            page: this.page,
            limit: this.size,
          })
        )
        .then(res => {
          console.log(res);
           this.isLoading = false;
          let rows = res.data.data.content; //请求返回当页的列表      
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.pullDownMsg = "没有更多了";
            this.$refs.data_List.scroll.refresh();
            return;
          } else if (rows.length < 5 && this.total < 5) {
            this.pullDownMsg = "没有更多了";
            this.itemList = rows;
            this.$refs.data_List.scroll.refresh();
            return;
          } else {
            this.isLoading = false;
            this.page = this.page + 5;
            this.total = res.data.data.count;

            // 将新数据与老数据进行合并
            this.itemList = this.itemList.concat(rows);
            //如果列表数据条数>=总条数，不再触发滚动加载
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        // this.pullDownMsg = '正在更新中';
      }
    },
    handleToTouchEnd(pos) {
      if (this.$refs.data_List.scroll.maxScrollY > pos.y + 10) {
        this.pullDownMsg = "加载中...";
        // this.getroadList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
    max-height: 100%;
}
#content {
  padding: 5px;
  box-sizing: border-box;
}
.item {
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 14px;
  background: #fff;
  border-radius: 5px;
  margin: 5px 0px;
}
.item div {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>