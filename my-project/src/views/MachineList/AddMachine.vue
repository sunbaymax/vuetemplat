<template>
  <div class="contaiter">
    <van-nav-bar title=" 添加设备 " left-text="返回" left-arrow  @click-left="onClickLeft"
 />
    <div>
      <van-cell-group>
        <van-field v-model="shebeihao" placeholder="请输入设备编号" />
      </van-cell-group>
      <div class="btn">
      <van-button round  class="btnok" color='#37c0c4'  @click="addsubmit">提交</van-button>
       <van-button round size="normal" @click="cancel()" class="btncancel" color='#37c0c4'>取消</van-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      shebeihao:'',
      userobj:''
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2');
  },
  mounted () {
    var obj = JSON.parse(window.localStorage.getItem('useronline'));
    this.userobj=obj
    //创建组件时，加载第1页数据

  },

  methods: {
    onClickLeft(){
      this.$router.push({
        path:'/MachineList'
      })
    },
    cancel(){
      window.location.reload()
    },
    addsubmit(){
      console.log(this.userobj.user)
       this.$axios.post('/index/Device/bind_device',this.$qs.stringify({
        mainname: this.userobj.user,
        devicenumber:this.shebeihao
      }) ).then((res) => {
        console.log(res.data);
        if(res.data.code==0){
            this.$toast.success('设备绑定成功');
            this.shebeihao=''
        }else{
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

</style>

