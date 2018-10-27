<template>
  <yd-layout>
    <yd-navbar class="m-wap-index-title-logo" slot="navbar">
      <div class="f-ex" slot="left">
        <i></i>
        <span>无纸化微终端</span>
      </div>
        <span slot="right" style="font-size: 0.24rem !important;">
           欢迎您,<span style="font-size: 0.24rem !important;">下小时</span>
          </span>
    </yd-navbar>
    <div class="m-wap-function-list-box">
      <yd-grids-group :rows="3" title="金湾区第七届人大常委会第24次会议">
        <yd-grids-item @click.native="goMsg">
          <img slot="icon" src="../../../assets/img/but_hyxx.png">
          <span slot="text">会议信息</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goUser" v-if="wapFunType==1">
          <img slot="icon" src="../../../assets/img/but_chmd.png">
          <span slot="text">参会名单</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goTopic">
          <img slot="icon" src="../../../assets/img/but_hyyt.png">
          <span slot="text">会议议题</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goFolder">
          <img slot="icon" src="../../../assets/img/but_lswj.png">
          <span slot="text">临时文件</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goVote" v-if="wapFunType==1">
          <img slot="icon" src="../../../assets/img/but_hytp.png">
          <span slot="text">会议投票</span>
        </yd-grids-item>
        <yd-grids-item v-if="wapFunType==2">
          <img slot="icon" src="../../../assets/img/but_pzbb.png">
          <span slot="text">批注白板</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goBack">
          <img slot="icon" src="../../../assets/img/but_fhlb.png">
          <span slot="text">返回会议列表</span>
        </yd-grids-item>
      </yd-grids-group>
    </div>
  </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {

      }
    },
    computed: {
      ...mapState(["wapFunType"])
    },
    mounted(){

    },
    created(){

    },
    methods:{
      goMsg(){
        var _self = this;
        _self.$router.push({path:'/wap/meetingMsg'});
      },
      goUser(){
        var _self = this;
        _self.$router.push({path:'/wap/userList'});
      },
      goTopic(){
        var _self = this;
        _self.$router.push({path:'/wap/topicList'});
      },
      goFolder(){
        var _self = this;
        _self.$router.push({path:'/wap/topicFolderList',query: { type:2}});
      },
      goVote(){
        var _self = this;
        _self.$router.push({path:'/wap/vote'});
      },
      goBack(){
        this.$router.push({path:'/wap/meetingList'});
      }
    },
    components: {

    }
  }
</script>
<style>
  .m-wap-index-title-logo .yd-navbar-item{
    overflow: inherit;
    padding:0 0.3rem;
  }
  .m-wap-index-title-logo .f-ex i{
    display: inline-block;
    width:0.8rem;
    height: 0.8rem;
    background: url("../../../assets/img/logo.png") no-repeat center;
    background-size: 100%;
  }
  .m-wap-index-title-logo span{
    margin-left: 0.2rem;
  }
  .m-wap-index-title-logo .yd-navbar-item div{
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    height: 100%;
  }
  .m-wap-function-list-box .yd-gridstitle{
    padding:0.24rem;
    background-color: #fff;
    margin-top:0.2rem;
    text-align: center;
    font-size: 0.3rem;
    color: #333;
    border-bottom: 1px solid #ddd;
  }

  .m-wap-function-list-box .yd-grids-3 .yd-grids-item{

    border-bottom: 1px solid #ddd;
  }
  .m-wap-function-list-box .yd-grids-3 .yd-grids-item:not(:nth-child(3n+3)){
    border-right: 1px solid #ddd;
  }

  .m-wap-function-list-box .yd-grids-3 .yd-grids-item .yd-grids-icon{
    height: 1.4rem;
  }
  .m-wap-function-list-box .yd-grids-3 .yd-grids-item .yd-grids-icon img{
    height:100%;
  }
  .m-wap-function-list-box .yd-grids-3 .yd-grids-item .yd-grids-txt{
    font-size: 0.28rem;
    margin-top: 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
</style>
