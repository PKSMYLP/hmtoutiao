import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 反序列化 || {}  防止报错
    // tokenObj: JSON.parse(localStorage.getItem('token')) || {}
    // tokenObj: storage.get('token') || {}
    tokenObj: getToken() || {}
  },

  getters: {},
  mutations: {
    CHANGE (state, payload) {
      state.tokenObj = payload
      // 转JSON
      // localStorage.setItem('token', JSON.stringify(payload))
      // storage.set('token', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
