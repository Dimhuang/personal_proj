<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <yd-cell-group class="m-wap-folder-list-bd">
      <yd-cell-item v-for="(n,index) in 4" :key="index">
        <i class="f-wap-pdf-icon" slot="icon"></i>
        <span slot="left">我的订我的订我的订我的订我的订我的订单</span>
      </yd-cell-item>
    </yd-cell-group>
  </yd-layout>
</template>
<script>

  export default{
    data(){
      return {
        showType:'1',
        title:''
      }
    },
    mounted(){
      var _self = this;
      _self.showType = _self.$route.query.type
      _self.title = _self.$route.query.title
    },
    methods: {
      back(){
        var _self = this;
        _self.$router.push({path:'/wap/topicFolderList',query: {type: _self.showType}})
      }
    }
  }
</script>
<style>
  .m-wap-folder-list-hd{
    padding:0.2rem 0.5rem;
    background-color: #fff;
    margin-bottom: 0;
  }
  .m-wap-folder-list-hd .yd-cell-item,
  .m-wap-folder-list-hd .yd-cell-right,
  .m-wap-folder-list-bd .yd-cell-right{
    padding: 0;
  }
  .m-wap-folder-list-hd .yd-cell-left,
  .m-wap-folder-list-bd .yd-cell-left{
    white-space: normal;
  }
  .m-wap-folder-list-hd h2{
    font-family: MicrosoftYaHei;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0px;
    color: #333333;
  }
  .m-wap-folder-list-hd .yd-cell-left p{
    font-family: MicrosoftYaHei;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    line-height: 0.44rem;
  }
  .m-wap-folder-list-hd .yd-cell-left p.f-ex{
    margin: 0.2rem 0;
  }
  .m-wap-folder-list-hd .yd-cell-left p span:nth-of-type(1){
    width: 1.48rem;
    text-align: right;
  }

  .m-wap-folder-list-bd{
    padding: 0.2rem;
  }
  .m-wap-folder-list-bd .yd-cell{
    background-color: transparent;
  }
  .m-wap-folder-list-bd .yd-cell-item{
    padding:0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .m-wap-folder-list-bd i{
    display: inline-block;
  }
  .m-wap-folder-list-bd .yd-cell-left{
    line-height: 0.48rem;
    font-size: 0.28rem;
  }
</style>
