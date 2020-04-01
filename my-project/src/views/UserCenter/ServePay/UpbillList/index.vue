<template>
  <div class="contaiter">
    <!-- <van-nav-bar title="流量套餐升级" left-text="返回" left-arrow @click-left="onClickLeft"    /> -->

    <van-nav-bar
      title="流量套餐升级"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="info-o" slot="right" />
    </van-nav-bar>
  
    <Loading v-if="isLoading" />
  

    
    <Scroller
      v-else
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
      ref="data_List"
    >
      <keep-alive>
        <div class="itemcontent">
          <van-cell-group
            v-for="item in tableData"
            class="everydevice"
            :key="item.shebeihao"
            @tap="detailupbiii(item.shebeihao,item.name)"
          >
            <div class="item-title">
              <van-cell title="设备号:">{{item.shebeihao}}</van-cell>
              <van-cell title="套餐名:">{{item.name}}</van-cell>
            </div>
            <van-cell title="到期时间:">{{item.daoqishijian}}</van-cell>
          </van-cell-group>
           <div class="pullDown">{{ pullDownMsg }}</div>
        </div>
       
      </keep-alive>
    </Scroller>
   
    <van-popup v-model="infoshow">
      <div class="collectSucc_top">
        <h3>说明</h3>
        <p>1: A套餐可以立即升级为B套餐，B套餐不可更改为 A套餐。</p>
        <p>2: 套餐到期日期前一个月内，在代缴服务费列表 可以重新选择套餐。</p>
        <p>3: 在参数设置模块的采集间隔，A套餐设置为5分钟及 以上，B套餐设置为1分钟及以上。</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        page: 1,
        limit: 10
      },
      infoshow: false,
      tableData: [],
      isLoading: true,
      pullDownMsg: ""
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
    this.getData();
    //创建组件时，加载第1页数据
  },
  methods: {
    onClickRight() {
      this.infoshow = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getData() {
      this.$axios
        .post(
          "/index/flow_package/device_flow_list",
          this.$qs.stringify({
            u_id: this.userobj.uid,
            page: this.query.page,
            limit: this.query.limit
          })
        )
        .then(res => {
          console.log(res.data);
          this.isLoading = false;
          if(res.data.data.content.lenght<10){
            this.tableData =res.data.data.content.reverse();
             this.pullDownMsg = "没有更多数据";
          }else{
            if (this.tableData.lenght=10) {
            this.tableData = this.tableData.concat(res.data.data.content).reverse();
            this.query.page=this.query.page+1;
            this.pullDownMsg = "没有更多数据";
          }
          }

          
      
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    detailupbiii(index,name) {
      let _fid=name
      if(_fid=='A'){
          _fid=1
      }else{
        _fid=2
      }
      this.$router.push({
        path: "/OneUpbill",
        query: {
          num_m: index,
          fid:_fid

        }
      });
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
        this.getData();
      }
    }
  }
};
</script>

<style  scoped>
.itemcontent {
  margin-top: 5px;
  padding: 0 5px;
  box-sizing: border-box;
}
.item-title {
  display: flex;
}
.everydevice {
  margin: 15px 0;
}
.everydevice:first-child {
  margin: 0;
}
.collectSucc_top {
  padding: 15px;
  box-sizing: border-box;
  width: 240px;
}
.collectSucc_top h3 {
  text-align: center;
  margin: 5px 0;
}
.pullDown {
  text-align: center;
  background: none;
  height: 20px;
  line-height: 20px;
  color: #666666;
  padding: 0;
  margin: 0;
}
</style>