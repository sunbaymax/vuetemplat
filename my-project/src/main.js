import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import 'amfe-flexible/index.js'
import './assets/iconfont/iconfont.css'
import { Image } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { Icon } from "vant";
import { Row, Col } from "vant";
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Search } from 'vant';
import { List } from 'vant';
import { Tab, Tabs } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(Tab).use(List);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Search);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Row).use(Col);
Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Image);
import Scroller from '@/component/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/component/Loading'
Vue.component('Loading',Loading);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://www.zjcoldcloud.com/xiandun/public/index.php'  // api 即上面 vue.config.js 中配置的地址
let instance = axios.create({
  timeout: 6000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
