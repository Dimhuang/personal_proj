<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="会议议题">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <div class="m-wap-topic-list-view">
        <yd-list theme="5">
          <yd-list-item v-for="item, key in 3" :key="key" @click.native="goList">
            <span slot="title">adasdaaaaaaaaaa111111111111111111111111111111111111111111111111111111111111111111</span>
            <yd-list-other class="f-ex" slot="other">
              <div>
                <span>汇报人：</span>
                <span>asda1111111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
              </div>
            </yd-list-other>
            <yd-list-other slot="other">
              <div class="m-wap-topic-statu-box">
                <span class="f-end" v-if="key == 0">已结束</span>
                <span class="f-load" v-if="key == 1">进行中</span>
                <span class="f-restar" v-if="key == 2">未开始</span>
              </div>
              <div class="f-fc-blue">
                <span>查看材料 (</span>
                <span>{{key+1}}</span>
                <span> ) ></span>
              </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
      </div>
    </yd-layout>
</template>
<script>
  export default{
    data(){
      return {
        listType: ''
      }
    },
    mounted(){
      var _self = this;
      _self.listType = _self.$route.params.listType
    },
    methods: {
      goList(){
        var _self = this;
        _self.$router.push({name:'wapTopicFolderList',params: { listType: _self.listType ,type:1}});
      },
      back(){
        var _self = this;
        _self.$router.push({name:'wapFunctions',params: { listType: _self.listType }})
      }
    }
  }
</script>
<style>
  .m-wap-topic-list-view .yd-list-theme5{
    background-color: transparent;
  }
  .m-wap-topic-list-view .yd-list-img{
    display: none;
  }
  .m-wap-topic-list-view .yd-list-item{
    padding:0.2rem 0.2rem 0.1rem;
  }
  .m-wap-topic-list-view .yd-list-mes{
    padding:0.2rem !important;
    border-radius: 5px;
    -moz-box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .m-wap-topic-list-view .yd-list-title{
    word-break: break-all;
    font-family: MicrosoftYaHei;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .m-wap-topic-list-view .yd-list-other div{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .m-wap-topic-list-view .yd-list-other.f-ex div{
    font-family: MicrosoftYaHei;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin: 0.24rem 0 0.18rem;
    color: #666666;
  }

  .m-wap-topic-statu-box span{
    display: inline-block;
    height: 0.4rem;
    line-height: 0.46rem;
    padding-left:0.4rem;
    font-size: 0.24rem;
  }
  .m-wap-topic-statu-box span.f-end{
    background: url("../../../assets/img/ico_yjs_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #999;
  }
  .m-wap-topic-statu-box span.f-load{
    background: url("../../../assets/img/ico_jxz_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #28b365;
  }
  .m-wap-topic-statu-box span.f-restar{
    background: url("../../../assets/img/ico_wks_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #66beff;
  }
  .m-wap-topic-list-view .f-fc-blue{
    font-size: 0.28rem;
  }
</style>
