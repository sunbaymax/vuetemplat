<template>
  <div>
    <!-- <van-field v-model="exportdata" label="设备编号：" /> -->
    111
  </div>
</template>

<script>
export default {
  props: {
    exportdata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  create(){
    console.log(this.exportdata,333)
  },
};
</script>

<style lang="scss" scoped>
</style>