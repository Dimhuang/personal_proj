<template>
  <yd-layout>
    <yd-navbar class="m-wap-index-title-logo" :class="{'f-ex':is_device==2}" slot="navbar">
      <div class="f-ex" slot="left" v-if="is_device!=2">
        <i></i>
        <span>无纸化微终端</span>
      </div>
      <div slot="left" @click.stop="goBack" v-if="is_device==2">
        <yd-navbar-back-icon size="0.44rem" style="margin-left: 0"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
      <div slot="center" v-if="is_device==2">
        <span style="font-size: 0.34rem">无纸化微终端</span>
      </div>
        <span slot="right" style="font-size: 0.24rem !important;" v-if="is_device!=2">
           欢迎您,<span style="font-size: 0.24rem !important;" v-text="userName"></span>
          </span>
    </yd-navbar>
    <div class="m-wap-function-list-box">
      <div class="yd-gridstitle">{{mettingTitle.replace(/\s/g,'&nbsp;')}}</div>
      <yd-grids-group :rows="3">
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
          <span slot="text">临时资料</span>
        </yd-grids-item>
        <!--<yd-grids-item @click.native="goVote" v-if="wapFunType==1">-->
        <yd-grids-item @click.native="goVote" v-if="false">
          <img slot="icon" src="../../../assets/img/but_hytp.png">
          <span slot="text">会议投票</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goBoard" v-if="wapFunType==2">
          <img slot="icon" src="../../../assets/img/but_pzbb.png">
          <span slot="text">批注白板</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goSummary">
          <img slot="icon" src="../../../assets/img/but_hyjy.png">
          <span slot="text">会议纪要</span>
        </yd-grids-item>
        <!--<yd-grids-item @click.native="goNote" v-if="wapFunType==2">-->
          <yd-grids-item @click.native="goNote" v-if="false">
          <img slot="icon" src="../../../assets/img/but_hysxtz.png">
          <span slot="text">决定事项通知</span>
        </yd-grids-item>
        <yd-grids-item @click.native="goBack" v-if="is_device!=2">
          <img slot="icon" src="../../../assets/img/but_fhlb.png">
          <span slot="text">返回会议列表</span>
        </yd-grids-item>
      </yd-grids-group>
    </div>

    <!--<yd-tabbar slot="tabbar" style="padding: 0;">
      <yd-button size="large" :type="signBtnType" shape="angle" style="margin: 0" v-text="signTxt" v-if="is_start" @click.native="signIn()"></yd-button>
    </yd-tabbar>-->
  </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        userName:sessionStorage.getItem('userName'),
        mettingTitle:'',
        signBtnType:'blue',
        signTxt:'签到',
        is_sign:true,
        is_start:false,
        is_device:'0'
      }
    },
    computed: {
      ...mapState(["wapFunType","mid"])
    },
    mounted(){
    var _self = this;
      _self.getMetName()
      _self.getSignStatus()
      if(sessionStorage.getItem('adType')!=null){
        _self.is_device = sessionStorage.getItem('adType')
      }
    },
    methods:{
      getMetName(){
        this.$fetch('/wap/meeting/data',{
          m_id:this.mid
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            this.mettingTitle = res.name
          }else{
            this.mettingTitle = ''
          }
        })
      },
      getSignStatus(){
        var _self = this;
        _self.$fetch('/wap/Sign/sign_flag',{
          m_id:_self.mid
        }).then(result=>{
          let res = result.data;
          if(res.status==0){
            _self.is_start = false
          }else{
            _self.is_start = true
            if(res.is_sign==0){
              _self.signBtnType = 'blue'
              _self.signTxt = '签到'
              _self.is_sign = true
            }else{
              _self.signBtnType = 'disabled'
              _self.signTxt = '已签到'
              _self.is_sign = false
            }
          }
        })
      },
      signIn(){
        var _self = this;
        if(_self.is_sign == true){
          _self.$fetch('/wap/Sign/sign',{
            m_id:_self.mid
          }).then(result=>{
            _self.getSignStatus()
          })
        }
      },
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
      goNote(){
        var _self = this;
        _self.$router.push({path:'/wap/decision'});
      },
      goBoard(){
        var _self = this;
        _self.$router.push({path:'/wap/board'});
      },
      goSummary(){
        var _self = this;
        _self.$router.push({path:'/wap/summary'});
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
  .m-wap-index-title-logo.f-ex .yd-navbar-item{
    overflow: inherit;
    padding:0 0.2rem;
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
  .m-wap-index-title-logo.f-ex span{
    margin-left: 0.07rem;
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
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
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
  .yd-btn-blue:not(.yd-btn-loading) {
    background-color: #1791ff;
  }
  .yd-btn-blue{
    color: #fff;
  }
</style>
