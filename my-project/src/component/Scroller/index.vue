<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: 'Scroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function () { }
    },
    handleToTouchEnd: {
      type: Function,
      default: function () { }
    },
    handleToPullingUp: {
      type: Function,
      default: function () { }
    }
  },
  mounted () {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1,
       snap: {  // 滑动切换的一些配置
        speed: 800,  // 滑动切换的速度
        
       }
      // useTransition: false,
      // scrollY: true,
      // pullUpLoad: {
      //   threshold: 744
      // }


    });

    this.scroll = scroll;

    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos);
    });

    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos);
    });
    scroll.on('pullingUp', (pos) => {
      this.handleToPullingUp(pos);
    });
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y);
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
