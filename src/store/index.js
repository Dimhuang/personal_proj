import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    breakList:[]
  },
  mutations: {
    pushBreak(state,txt){
      if(state.breakList.length!=0){
        for(var i=0;i<state.breakList.length;i++){
          if(state.breakList[i].breadNum != txt.breadNum){
            state.breakList.push(txt)
            return
          }else{
            return
          }
        }
      }else{
        state.breakList.push(txt)
      }
    },
    tabBreak(state,txt){
      //点击tab
      state.breakList = []
      setTimeout(function(){
        state.breakList.push(txt)
      },50)
    },
    tapBreak(state,txt){
      //点击面包屑
      if(txt.breadNum == 2){
        state.breakList.splice(2,1)
        return
      }else if(txt.breadNum == 1){
        state.breakList = []
        setTimeout(function(){
          state.breakList.push(txt)
        },500)
      }else{
        return false
      }
    }
  }
})
