<template>
  <div class="container_app">
    <div>
      <van-row type="flex" justify="end" >
        <van-col span="4"  algin="right">
           <van-icon class="iconfont" class-prefix="icon" name="xingmingyonghumingnicheng" />
        </van-col>
        <van-col span="16">
          <van-cell-group>
            <van-field v-model="username" clearable label="账号" placeholder="请输入账号" />
          </van-cell-group>
        </van-col>
        <van-col span="2"></van-col>
      </van-row>
      <van-row  type="flex" justify="center">
        <van-col span="4"  algin="left" >
          <van-icon class="iconfont" class-prefix="icon" name="mima" />
        </van-col>
        <van-col span="16" >
          <van-cell-group>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" clearable />
          </van-cell-group>
        </van-col>
        <van-col span="2">
          <!-- <van-icon class="iconfont" class-prefix="icon" name="mima" /> -->
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { Icon } from "vant";
import { Row, Col } from "vant";

Vue.use(Row).use(Col);

Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);

Vue.use(Image);
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style scoped>
.oo {
  width: 200px;
  height: 200px;
  border: 1px solid #222;
}
</style>