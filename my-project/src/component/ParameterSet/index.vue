<template>
  <div class="deviceparameter">
    <ul class="content_basic">
      <li @click="basicset()">
        <p>
          <span>基础信息设置</span>
        </p>
        <p>
          <img src="@/assets/img/right_shop_car.png" class="righticon" />
        </p>
      </li>
      <li @click="parmset()">
        <p>
          <span>参数信息设置</span>
        </p>
        <p>
          <img src="@/assets/img/right_shop_car.png" class="righticon" />
        </p>
      </li>
      <li @click="warningset()">
        <p>
          <span>设备报警设置</span>
        </p>
        <p>
          <img src="@/assets/img/right_shop_car.png" class="righticon" />
        </p>
      </li>
      <li @click="addset()">
        <p>
          <span>附加参数设置</span>
        </p>
        <p>
          <img src="@/assets/img/right_shop_car.png" class="righticon" />
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    basicset() {
      this.$router.push({
        path: "/BasicSet",
        query: {
          num_m: this.$store.state.city.id
        }
      });
    },
    parmset() {
      this.$router.push({
        path: "/ParaminfoSet",
        query: {
          num_m: this.$store.state.city.id
        }
      });
    },
    warningset() {
      this.$router.push({
        path: "/WarningSet",
        query: {
          num_m: this.$store.state.city.id
        }
      });
    },
    addset() {
      this.$router.push({
        path: "/AdditionalSet",
        query: {
          num_m: this.$store.state.city.id
        }
      });
    }
  }
};
</script>

<style scoped>
.deviceparameter {
  padding: 0 10px;
  box-sizing: border-box;
}
.content_basic li {
  list-style: none;
  background: #ffffff;
  padding: 0 15px;
  margin-top: 10px;
  font-size: 14px;
  height: 54px;
  line-height: 54px;
  margin: 10px 0px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.righticon {
  width: 10px;
  height: 16px;
  margin-right: 0px;
}
</style>