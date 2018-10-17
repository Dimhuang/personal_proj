<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title">
      <!--<router-link to="#" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>-->
    </yd-navbar>
    <div class="g-wap-welcome-content">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
              <yd-icon name="hyxx_hydd_n" custom size="0.42rem" color="#1791ff"></yd-icon>
          </span>
          <span slot="left">
            <span>会议地点:</span>
            <p>广东省珠海市金湾区区政府</p>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
              <yd-icon name="hyxx_hycs_n" custom size="0.42rem" color="#1791ff"></yd-icon>
          </span>
          <span slot="left">
            <span>会议场所:</span>
            <p>区政府25号楼南阶梯会议室</p>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
              <yd-icon name="hyxx_zcr_n" custom size="0.42rem" color="#1791ff"></yd-icon>
          </span>
          <span slot="left">
            <span>主持人:</span>
            <p>关吉宫</p>
          </span>
        </yd-cell-item>
        <yd-cell-item class="f-ex">
          <span slot="left">
              <yd-icon name="hyxx_hyjj_n" custom size="0.42rem" color="#1791ff"></yd-icon>
          </span>
          <span slot="left">
            <span>会议简介:</span>
            <p>主要讨论重要领导人任免、政府工作报告、两院报告、财政预算、重要法律和区大政方针的制定，主要讨论重要领导人任免、政府工作报告、两院报告、财政预算、重要法律和区大政方针的制定，主要讨论重要领导人任免、政府工作报告、两院报告、财政预算、重要法律和区大政方针的制定，</p>
          </span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="m-wap-welcome-tabbar" slot="tabbar">
      <yd-button size="large" bgcolor="#1791ff"  shape="circle" @click.native="goLogin">进入会议</yd-button>
    </div>
  </yd-layout>
</template>
<script>

  export default{
    data(){
      return{
        title:'金湾区第七届人大常委会第24次会议'
      }
    },
    created(){

    },
    methods:{
      goLogin(){
        this.$router.push({name:'wapLogin'})
      }
    },
    components:{

    }
  }
</script>
<style>

  .g-wap-welcome-content .yd-cell{
    background-color: transparent;
  }
  .g-wap-welcome-content .yd-cell-item{
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .g-wap-welcome-content .yd-cell-left{
    padding: 0.2rem 0;
    white-space: normal;
  }
  .g-wap-welcome-content .f-ex .yd-cell-left{
    align-items: flex-start;
  }
  .g-wap-welcome-content .f-ex .yd-cell-left span i{
    margin-top: 0.16rem;
    float: left;
  }
  .g-wap-welcome-content .yd-cell-left span:nth-of-type(2){
      margin-left: 0.2rem;
  }
  .g-wap-welcome-content .yd-cell-left span:nth-of-type(2) span{
    font-size: 0.3rem;
    color: #333;

  }
  .g-wap-welcome-content .yd-cell-left span:nth-of-type(2) p{
    font-size: 0.28rem;
    color: #666;
    margin-top: 0.2rem;
    word-break: break-all;
    line-height: 0.4rem;
  }
  .m-wap-welcome-tabbar{
    padding:0.4rem 1.04rem;
    background-color: #fff;
  }
  .m-wap-welcome-tabbar button.yd-btn-block{
    margin-top:0;
    color: #fff;
    font-size: 0.34rem;
    font-weight: 700;
    font-family: "Microsoft YaHei";
  }
</style>
