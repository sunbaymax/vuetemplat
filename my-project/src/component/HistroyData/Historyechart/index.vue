<template>
  <div>
    <div class="HelloWorld echart-box" ref="myechart"></div>
  </div>
</template>

<script>
export default {
  props: {
    historyechair: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      option: {
        backgroundColor: "lightblue",
        title: {
          backgroundColor: "lightyellow",
          show: true,
          text: "测试练习",
          textStyle: {
            fontSize: 25,
            fontWeight: 900,
            color: "red"
          },
          subtext: "测试小标题",
          subtextStyle: {
            color: "green",
            fontSize: 20,
            fontWeight: 600
          }
        },
        xAxis: {
          type: "category",
          data: [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [50, 54, 82, 97, 150, 240, 68],
            type: "line"
          },
          {
            data: [20, 58, 34, 108, 250, 150, 300],
            type: "line"
          }
        ]
      }
    };
  },
activated() {
  console.log("555")
  console.log(this.historyechair)
      //  console.log(this.$echarts)
          this.$nextTick(() => {
      let myechart = this.$echarts.init(this.$refs.myechart) //初始化一个echarts
  
      myechart.setOption(this.option)  //setOption 用this.option中的数据开始作图
       })
  },
};
</script>

<style scoped>
.HelloWorld{   
  width: 100%;
  height:300px;
  background: #cce6f0;
  margin: 0 auto;
}
</style>