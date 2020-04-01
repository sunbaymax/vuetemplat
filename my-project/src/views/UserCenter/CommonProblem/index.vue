<template>
  <div class="contaiter">
    <van-sticky>
      <header>
        <van-nav-bar title="常见问题" left-text="返回" left-arrow @click-left="onClickLeft" />
      </header>
    </van-sticky>
    <div class="content">
      <ol>
        <li v-for="(item,index) in problems" :key="index">
          <span class="title">{{item.title}}</span>
          <p class="problem-content" v-html="item.content"></p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      problems: [
        {
          title: "设备刚拿到该怎么用？",
          content:
            "a、通过微信扫描设备正面二维码，可打开“鲜盾管家”微信小程序，满足您日常查看温湿度实时数据、参数修改的需求<br/> b、通过小程序“账户设备”功能注册您的手机号，可通过“中集智冷”公众号登录“云平台”享受更多功能，如：历史数据下载（PDF、EXCEL），设备运动轨迹查询等。"
        },
        {
          title: "如何更改设备昵称？",
          content:
            "点击“我的”进入“我的设备”列表栏，点击需要备注的设备号，在“参数”栏下的“设备昵称”后填写您想要备注的昵称。"
        },
        {
          title: "第一次开机屏幕显示“go”是什么意思？",
          content:
            "'设备开机后开始自检并进行时间同步，同步成功后设备会显示“go”字样，稍等2分钟设备即可正常使用。"
        },
        {
          title: "一个手机账号如何同时查看多个设备？",
          content:
            "在“我的设备”列表栏内点击屏幕右下角的“+”号，输入您想要绑定的设备号，设备号是设备背面的6位数字。"
        },
        {
          title: "设备连续充电几个小时电量图标为什么还是空格？",
          content:
            "如果设备直充时出现此类情况，请充完电后拔掉连接线，并拔出电池10秒后重新插入。"
        },
        {
          title: "设备夜间怎么没有上传数据？",
          content:
            "您的设备可能关闭了夜间上传（24:00-7:00）功能，在“我的设备”里点击您需要修改的设备号，在“参数”列表下的“参数信息”里将“夜间上传功能”开关打开即可。"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
/* @import url(); 引入css类 */
.content {
  margin-top: 46px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 14px;
}

ol li {
  list-style-type: decimal;
  list-style-position: inside;
  background: #fff;
  padding: 15px 0px;
  border-bottom: 1px solid #cccccc;
  margin: 5px 0px;
  border-radius: 5px;
}
.title {
  color: rgba(34, 34, 34, 1);
  font-size: 15px;
  font-weight: bold;
  /* padding-left: 5px; */
}
.problem-content {
  /* text-indent: 5px; */
  padding: 5px;
  box-sizing: border-box;
}
</style>