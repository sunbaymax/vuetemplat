<template>
  <div class="contaiter">
    <van-nav-bar title="邀请家人" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="invitebtn" @click="addinvite()">
        邀请家人
        <van-icon name="plus" slot="right"  color="#C3C3C3" size="20" />
      </div>
      <div class="iscunzai" v-if="list.length>0">
      <h4>家人列表</h4>
      <ul class="list">
        <li v-for="(item,index) in list" :key="index" @click="detail(item.relation_name,item.phone)">
          <p>
            <span class="name">{{item.relation_name}}</span>
            <span class="tel">{{item.phone}}</span>
          </p>
          <img src="@/assets/img/right_shop_car.png" class="right" />
        </li>
      </ul>
       </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userobj: '',
      list:[]
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
          this.list=res.data.data.content;
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
        path:'/UserCenter'
      })
    },
    addinvite(){
      this.$router.push({
          path:'/InviteAddFamily'
      })
    },
    detail(_name,_tel){
    console.log(_name,_tel);
     this.$router.push({
          path:'/InviteEditFamily',
          query:{tel:_tel,name:_name}
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
.content .van-cell-group {
  margin-top: 10px;
}
h4{
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
  font-size: 15px;
}
.list li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  background: #ffffff;
  border-radius: 5px;
  padding: 0px 5px;
  font-family: "黑体";
  margin: 5px 0px;

}
.list li p{
  width: 70%;
}

li p .name{
  display: inline-block;
  width: 60px;
  margin-left: 5px;
}
li p .tel{
  margin-left: 15px;
}
.list li .right{
  width: 12px;
  height: 16px;
}
</style>

