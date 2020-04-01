 
<template>
  <div id="allmap" class="Map" />
</template>
 
<script>
/* eslint-disable*/

export default {
  props:["itemListMap"],
  // porps:{
  //    itemListMap: {
  //     type: Array,
  //     default: function() {
  //       return [];
  //     }
  //   }
  // },
  name: "Mapbox",
  data() {
    return {};
  },
  create(){
          // console.log(66,this.itemListMap)
  },

  mounted(){
   
    this.initMap()
    
  },
  methods: {
    initMap() {
//  console.log(66,this.itemListMap)
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.addControl(new BMap.ScaleControl());
      // var datas = [
      //   { latitude: "31.228535", longitude: "121.512903" },
      //   { latitude: "31.228529", longitude: "121.512861" },
      //   { latitude: "31.228521", longitude: "121.512908" },
      //   { latitude: "31.228608", longitude: "121.513078" },
      //   { latitude: "31.228556", longitude: "121.513047" },
      //   { latitude: "31.2195", longitude: "121.516652" },
      //   { latitude: "31.226149", longitude: "121.513098" }
      // ];
      var datas =this.itemListMap
      var PointArr = [];
      if (datas.length != 0) {
        for (let is in datas) {
          PointArr.push({ lat: datas[is].weidu, lng: datas[is].jingdu });
        }
        addStartMarker(
          new BMap.Point(PointArr[0].lng, PointArr[0].lat),
          "起点",
          map
        );
        addMarkerEnd(
          new BMap.Point(
            PointArr[PointArr.length - 1].lng,
            PointArr[PointArr.length - 1].lat
          ),
          "终点",
          map
        );
      } else {
        PointArr.push({ lat: 39.9152108931, lng: 116.4039006839 });
        //addStartMarker(new BMap.Point(PointArr[0].lng, PointArr[0].lat),'起点',map) ;
      }

      map.centerAndZoom(PointArr, 13); //根据经纬度显示地图的范围
      map.setViewport(PointArr); //根据提供的地理区域或者坐标设置地图的视野

      // 百度地图API功能
      var MapIcon = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#ffffff", //设置矢量图标线填充颜色
        strokeWeight: "1" //设置线宽
      });

      var icons = new BMap.IconSequence(MapIcon, "10", "30");
      var pois = [];
      var i = 0;
      for (let i in PointArr) {
        pois.push(new BMap.Point(PointArr[i].lng, PointArr[i].lat));
      }
      var polyline = new BMap.Polyline(pois, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: "5", //折线的宽度，以像素为单位
        strokeOpacity: 1, //折线的透明度，取值范围0 - 1
        strokeColor: "#349c00" //折线颜色
      });

      map.addOverlay(polyline);

      //添加起点图标
      function addStartMarker(point, name, mapInit) {
        var myIcon = new BMap.Icon(
          "http://www.ccsc58.cc/leng/FreshShield/images/startbiao.png",
          new BMap.Size(45, 45),
          {
            anchor: new BMap.Size(20, 45), //这句表示图片相对于所加的点的位置mapStart
            imageSize: new BMap.Size(45, 45) //图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
          }
        );
        window.marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
        mapInit.addOverlay(marker);
      }
      //添加结束图标
      function addMarkerEnd(point, name, mapInit) {
        var myIcon = new BMap.Icon(
          "http://www.ccsc58.cc/leng/FreshShield/images/endbiao.png",
          new BMap.Size(45, 45),
          {
            anchor: new BMap.Size(20, 45), //这句表示图片相对于所加的点的位置mapStart
            imageSize: new BMap.Size(45, 45) //图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
          }
        );
        window.marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
        mapInit.addOverlay(marker);
      }
    }
  }
};
</script>
 
<style>
.Map {
  height: calc(100vh - 200px);
  width: 100%;
}
</style>