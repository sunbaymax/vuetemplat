<template>
  <div class="contaiter">
   <van-nav-bar title="变更流量套餐" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
   <div class="itemcontent">
    <div v-if="fid==1">
      <div v-for="item in tableData" :key="item.shebeihao"  :class="[{ notclick: item.name=='A'}, 'everydevice']" @click="gopay(shebeihao,item.name)">
        <p>
          <span>套餐名：{{item.name}}</span>
          <span>
            金额：{{item.price}}元
          </span>
        </p>
        <p>
          <span>{{item.name=="A"?'说明：设备上传间隔5分钟及以上':'说明：设备上传间隔1分钟及以上'}}</span>
        </p>
      </div>
       <div class="msg">{{shebeihao}}为A套餐，剩余{{oldmoney}}元，升级套餐B应付<span ref="shifu">{{24-oldmoney}}</span>元</div>
       <div class="btn1">
            <van-button round class="btnok" color="#37c0c4" @click="gopay(shebeihao,2)">提交</van-button>
       </div>
    </div>

    <div v-else>
      <div v-for="item in tableData" :key="item.shebeihao"  class="notclick everydevice" >
        <p>
          <span>套餐名：{{item.name}}</span>
          <span>
            金额：{{item.price}}元
          </span>
        </p>
        <p>
          <span>{{item.name=="A"?'说明：设备上传间隔5分钟及以上':'说明：设备上传间隔1分钟及以上'}}</span>
        </p>
      </div>
      <div class="msg">{{shebeihao}}该套餐已是最高级</div>
    </div>
  </div>
 </div> 
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      shebeihao: "",
      fid: "",
      oldmoney:0
    };
  },
  created() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
  },
  activated() {
    var obj = JSON.parse(window.localStorage.getItem("useronline"));
    this.userobj = obj;
    this.fid = this.$route.query.fid;
    this.shebeihao = this.$route.query.num_m;
    this.getData();
    this.$nextTick(function() {
      this.getIspay()
    });

    //创建组件时，加载第1页数据
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getData() {
      this.$axios
        .post("/index/flow_package",)
        .then(res => {
        //   console.log(res.data);
          this.tableData = res.data.data.reverse();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gopay(index,name) {
        console.log(this.$refs.shifu.innerText);
        if(name=='A'){
              
               return false
        }else{
                 let shifu=this.$refs.shifu.innerText
     	         let sjuser={
					u_id:this.userobj.uid,
					f_id:2,
					money:shifu,
					shebeihao:this.shebeihao
                };
                // alert('11')
				window.sessionStorage.setItem("sjgoingpay", JSON.stringify(sjuser));
				window.location.href = 'http://www.ccsc58.cc/leng/weixin/zhifu/example/freshdun_flowpay.php?total=' + parseFloat(shifu*100);
            
        }
       
 
    },
    getIspay(){
        let params={
            f_id: 2,
            shebeihao: this.shebeihao
        }
         this.$axios
        .post("/index/flow_package/device_flow_money",this.$qs.stringify({ f_id: 2,
            shebeihao: this.shebeihao}))
        .then(res => {
          console.log(res.data);
          this.oldmoney=res.data.data
        //   this.tableData = res.data.data.reverse();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style  scoped>
.itemcontent{
 /* margin-top: 5px; */
  padding: 0 5px;
  box-sizing: border-box;
}
.everydevice {
  height: 100px;
 background: #ffffff;
 padding: 0 5px;
  box-sizing: border-box;
 border-radius: 5px;
}
.everydevice p{
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 10px 0;
    box-sizing: border-box;
  /* height: 80px; */
 
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
.notclick{
    background: #ccc!important;
}
.msg {
  height: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  font-family:Georgia, 'Times New Roman', Times, serif
}
.btn1{
    text-align: right;
    margin: 15px 0 5px;
} 

/* .itemcontent .van-cell__value{
    text-align: left;
} */
</style>