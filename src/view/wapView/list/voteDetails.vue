<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="会议投票">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <div class="m-wap-vote-select-view">
      <div class="m-wap-vote-select-title">
        <h2 class="f-clamp-line-2" v-html="name"></h2>
        <div class="m-wap-vote-select-title-bd">
          <div>
            <span class="fl">投票描述</span>
            <span class="fr" v-if="false">
               <yd-button size="large" type="hollow" shape="circle" @click.native="titleToggle=!titleToggle" v-if="voteList.description!=''">
                 <span v-if="titleToggle">展开</span>
                 <span v-else>收起</span>
               </yd-button>
            </span>
          </div>
          <!--<p :class="{'f-clamp-line-2':titleToggle}" v-text="voteList.description"></p>-->
          <p v-text="voteList.description"></p>
        </div>
      </div>
      <div class="m-wap-vote-select-content">
        <div class="m-wap-vote-select-content-title">
          <span>投票选项</span>
          <span v-if="voteList.is_multiple==0">单选</span>
          <span v-else>多选</span>
          <span v-if="voteList.is_countdown==1">
            <yd-countdown :time="voteTime" format="{%d}天  {%h}:{%m}:{%s}"></yd-countdown>
          </span>
        </div>
        <div>
          <ul>
            <li class="vote-detail-progressbar-list" v-for="item in voteList.options" >
              <yd-progressbar type="line" :progress="(item.num/voteList.all_user)" trail-width="10" trail-color="#8bc34a"> </yd-progressbar>
              <div class="f-text">
                <span>{{item.o_name.replace(/\s/g,'&nbsp;')}}</span>
                <span class="f-ex" v-text="(item.num/voteList.all_user*100).toFixed(2)+'% ('+item.num+')'"></span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <!--<yd-button size="large" bgcolor="#1791ff" color="#fff" shape="angle" slot="bottom" class="f-bottom-btn">备注</yd-button>-->
  </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        titleToggle:true,
        voteList:[],
        name:'',
        v_id:''
      }
    },
    computed: {
      ...mapState(["mid"])
    },
    mounted(){
      var _self = this;
      _self.v_id = _self.$route.query.id
      _self.getList()
    },
    methods: {
      getList(){
        this.$fetch('/wap/meeting/vote',{
          m_id:this.mid,
          v_id:this.v_id
        }).then(result=>{
          let res = result.data
          this.voteList = res
          this.name = res.vote_title.replace(/\s/g,'&nbsp;')
          if(res.is_countdown==1){
            this.voteTime = res.time_limit.replace(/-/g,"/")
          }
        })
      },
      back(){
        var _self = this;
        _self.$router.push({path:'/wap/vote'})
      }

    }
  }
</script>
<style>

  .m-wap-vote-select-title{
    padding:0.2rem 0.3rem;
    background-color: #fff;
  }
  .m-wap-vote-select-view h2{
    font-family: MicrosoftYaHei;
    font-size: 0.4rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 0.52rem;
    text-align: center;
    padding:0 0.2rem;
  }
  .m-wap-vote-select-title-bd{
    margin-top: 0.2rem;
    border-top: 1px solid #ddd;
    overflow: hidden;
  }
  .m-wap-vote-select-title-bd div{
    overflow: hidden;
    padding: 0.3rem 0;
  }
  .m-wap-vote-select-title-bd div span.fl{
    font-family: MicrosoftYaHei;
    font-size: 0.3rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    line-height: 0.56rem;
  }
  .m-wap-vote-select-title-bd div span.fr .yd-btn-block{
    border:1px solid #0092ff;
    color:#0092ff;
    background-color: transparent;
    margin-top: 0 !important;
    height: 0.56rem;
    width: 1rem;
  }
  .m-wap-vote-select-title-bd p{
    word-break: break-all;
    font-size: 0.3rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 0.48rem;
  }
  .m-wap-vote-select-content{
    padding:0.3rem;
  }

  .m-wap-vote-select-content-title{
    padding-bottom: 0.24rem;
  }
  .m-wap-vote-select-content-title span{
    font-family: MicrosoftYaHei;
    font-size: 0.3rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    margin-right: 0.3rem;
  }
  .m-wap-vote-select-content-title span:nth-of-type(1){
    color: #999;
  }
  .m-wap-vote-select-content-title span.f-ex{
    color:#f36323;
    float: right;
    margin-right: 0;
  }
  .vote-detail-progressbar-list{
    position: relative;
    margin-bottom: 0.3rem;
    overflow: hidden;
  }
  .vote-detail-progressbar-list .f-text{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    line-height: 0.72rem;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 0.34rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }

  .vote-detail-progressbar-list .f-ex{
    position: absolute;
    right:0.3rem;
    top:0;

  }
</style>
