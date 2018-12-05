import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    wapFunType:sessionStorage.getItem('keepWapType'),
    mid:sessionStorage.getItem('keepMid')
  },
  mutations: {
    changeType(state,txt){
      state.wapFunType = txt
      sessionStorage.setItem('keepWapType' , txt)
      if(sessionStorage.getItem('keepWapType')!=null){
        state.wapFunType = sessionStorage.getItem('keepWapType')
      }
    },
    getMid(state,txt){
      state.mid = txt
      sessionStorage.setItem('keepMid' , txt)
      if(sessionStorage.getItem('keepMid')!=null){
        state.mid = sessionStorage.getItem('keepMid')
      }
    }
  }
})
