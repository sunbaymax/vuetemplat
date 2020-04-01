import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import choosetime from './choosetime'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    city,
    choosetime
  }
})
