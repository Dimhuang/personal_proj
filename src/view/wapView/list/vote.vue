<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="会议投票">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <div class="m-wap-vote-list-content">
        <yd-cell-group title="这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题这里是一个标题" v-for="(items,index) in 3" :key="index">
          <yd-cell-item>
            <span slot="left">
              <span class="f-fc-black f-ex">我的订单我的订单我的订单我的订单我的订单我的订单我的订单我的订单</span>
              <div>
                <yd-badge bgcolor="#28b464" color="#FFF" scale="0.8" v-if="true">进行中</yd-badge>
                <yd-badge bgcolor="#bbbbbb" color="#FFF" scale="0.8" v-else>已结束</yd-badge>
              </div>

            </span>
            <span slot="right">
              <yd-button bgcolor="#28b464" color="#FFF" shape="circle" v-if="true" @click.native="goSelect">投票</yd-button>
              <yd-button bgcolor="transparent" color="#0092ff" shape="circle" class="f-ex" v-else @click.native="goDetails">查看详情</yd-button>
            </span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
              <span class="f-fc-grey-black f-ex">我的订单我的订单我的订单我的订单我的订单我的订单我的订单我的订单</span>
              <div>
                <yd-badge bgcolor="#28b464" color="#FFF" scale="0.8" v-if="false">进行中</yd-badge>
                <yd-badge bgcolor="#bbbbbb" color="#FFF" scale="0.8" v-else>已结束</yd-badge>
              </div>

            </span>
            <span slot="right">
              <yd-button bgcolor="#28b464" color="#FFF" shape="circle" v-if="false">投票</yd-button>
              <yd-button color="#0092ff" shape="circle" class="f-ex" v-else @click.native="goDetails">查看详情</yd-button>
            </span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </yd-layout>
</template>
<script>
    export default{
      data(){
        return {

        }
      },
      mounted(){
        var _self = this;

      },
      methods: {
        goSelect(){
          var _self = this;
          _self.$router.push({path:'/wap/voteSelect'})
        },
        goDetails(){
          var _self = this;
          _self.$router.push({path:'/wap/voteDetails'})
        },
        back(){
          var _self = this;
          _self.$router.push({path:'/wap/functions'})
        }
      }
    }
</script>
<style>
  .m-wap-vote-list-content .yd-cell-title{
    padding:0.26rem 0.2rem 0.16rem;
    font-family: MicrosoftYaHei;
    font-size: 0.24rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-wap-vote-list-content .yd-cell{
    background-color: transparent;
  }
  .m-wap-vote-list-content .yd-cell-item{
    padding:0.2rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
  }
  .m-wap-vote-list-content .yd-cell-left{
    width: 70%;
    overflow: hidden;
  }
  .m-wap-vote-list-content .yd-cell-left span{
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }
  .m-wap-vote-list-content .yd-cell-left span span.f-ex{
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    width: 4.8rem;
  }
  .m-wap-vote-list-content .yd-cell-left div{
   position: relative;
    height: 0.48rem;
  }
  .m-wap-vote-list-content .yd-cell-left .yd-badge{
    position: absolute;
    left: -0.08rem;
    bottom: 0;
  }
  .m-wap-vote-list-content .yd-cell-right{
    min-height: inherit;
    padding-right: 0;
  }
  .m-wap-vote-list-content .yd-cell-right .yd-btn{
    width: 1.4rem;
    font-size: 0.28rem;
    border:1px solid #28b464;
  }
  .m-wap-vote-list-content .yd-cell-right .yd-btn.f-ex{
    border:1px solid #0092ff;
    background-color: transparent;
  }
</style>
