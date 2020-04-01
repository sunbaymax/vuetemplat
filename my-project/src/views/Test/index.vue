<template>
    <div>
<div class="baidumap" id="allmap"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // longitude: 121.833138, 
            // latitude: 39.081725,
            longitude: 116.12503052,
latitude: 37.06930923,
        }
    },
    name: 'pm-distribution',
    components: {
      
    },
    mounted() {
        this.baiduMap()
    },
    methods: {
        baiduMap() {
            let point = new BMap.Point(this.longitude, this.latitude)
            let gc = new BMap.Geocoder()
            gc.getLocation(point, function(rs){
                console.log(rs)
            const addComp = rs.addressComponents
            // 可以通过addComp对象获取到省、市、县、区、街道多少号等信息
            const province = addComp.province
        
            console.log('addComp json: ' + JSON.stringify(addComp))
            console.log('province' + addComp.province)
    })

        }
    }
}
</script>

<style lang="scss" scoped>
.baidumap {
    width: 1000px;
    height: 500px;
    border: 1px solid red;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
    display: none !important;
}
.baidumap > .anchorBL {
    display: none !important;
}
</style>