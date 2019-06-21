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
            <span class="fr">
               <yd-button size="large" type="hollow" shape="circle" @click.native="titleToggle=!titleToggle" v-if="voteList.description!=''">
                 <span v-if="titleToggle">展开</span>
                 <span v-else>收起</span>
               </yd-button>
            </span>
          </div>
          <p :class="{'f-clamp-line-2':titleToggle}" v-text="voteList.description"></p>
        </div>
      </div>
      <div class="m-wap-vote-select-content">
        <div class="m-wap-vote-select-content-title">
          <span>投票选项</span>
          <span v-if="voteList.is_multiple==0">单选</span>
          <span v-else>多选</span>
          <span v-if="voteList.is_countdown==1">
            <yd-countdown :time="voteTime" format="{%d}天  {%h}:{%m}:{%s}" :callback="timeOff()"></yd-countdown>
          </span>
        </div>
        <!--单选-->
        <div v-show="voteList.is_multiple==0">
          <yd-radio-group v-model="voteRadio">
            <yd-radio :val="items.id" v-for="items,index in voteList.options" :key="index" :class="{'f-active':items.id == voteRadio}">
              <span>{{items.o_name.replace(/\s/g,'&nbsp;')}}</span>
              <yd-icon name="yes_line" custom color="#fff"></yd-icon>
            </yd-radio>
          </yd-radio-group>
        </div>
        <!--多选-->
        <div v-show="voteList.is_multiple==1">
          <yd-checkbox-group v-model="voteCheckbox">
            <yd-checkbox :val="items.id" v-for="items,index in voteList.options" :key="index" :class="'f-active-'+items.id">
              <span>{{items.o_name.replace(/\s/g,'&nbsp;')}}</span>
              <yd-icon name="yes_line" custom color="#fff"></yd-icon>
            </yd-checkbox>
          </yd-checkbox-group>
        </div>
      </div>
    </div>
    <yd-button size="large" bgcolor="#1791ff" color="#fff" shape="angle" slot="bottom" class="f-bottom-btn" @click.native="confirm">确定</yd-button>
  </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        titleToggle:true,
        voteRadio:'',
        voteList:[],
        voteCheckbox:[],
        name:'',
        v_id:'',
        voteTime:''
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
      confirm(){
        var _self = this;
        var parmes = {}
        if(_self.voteList.is_multiple==0){
          parmes = {
            v_id:_self.v_id,
            o_id:_self.voteRadio
          }
        }else{
          parmes = {
            v_id:_self.v_id,
            o_id:_self.voteCheckbox
          }
        }

        _self.$post('/wap/meeting/cast_vote',parmes).then(result=>{
          if(result.msg=='success'){
            _self.$router.push({path:'/wap/voteDetails',query:{id:_self.v_id}})
          }else{
            _self.$dialog.notify({
              mes: result.message,
              timeout: 2000,})
          }
        })
      },
      timeOff(){
        if(this.voteList.is_countdown==1){
          _self.$router.push({path:'/wap/voteDetails',query:{id:_self.v_id}})
        }
      },
      back(){
        var _self = this;
        _self.$router.push({path:'/wap/vote'})
      }
    },
    watch:{
      'voteCheckbox'(){
        var _self = this;
        if(_self.voteCheckbox.length!=0){
          for(var j=0;j<_self.voteList.options.length;j++){
            document.querySelector('.f-active-'+_self.voteList.options[j].id).classList.remove('f-active')
            for(var i=0;i<_self.voteCheckbox.length;i++){
              document.querySelector('.f-active-'+_self.voteCheckbox[i]).classList.add('f-active')
            }
          }
        }else{
          for(var j=0;j<_self.voteList.options.length;j++){
            document.querySelector('.f-active-'+_self.voteList.options[j].id).classList.remove('f-active')
          }
        }
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
    padding: 0 0.2rem;
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
  .m-wap-vote-select-content .yd-radio,
  .m-wap-vote-select-content .yd-checkbox{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #fff;
    margin-bottom:0.2rem;
    border-radius: 3px;
    font-family: PingFang-SC-Medium;
    font-size:0.34rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    position: relative;
    padding-right: 0;
  }
  .m-wap-vote-select-content .yd-radio.f-active,
  .m-wap-vote-select-content .yd-checkbox.f-active{
    background-color: #8bc34a;
  }
  .m-wap-vote-select-content .yd-radio .icon-custom-yes_line,
  .m-wap-vote-select-content .yd-checkbox .icon-custom-yes_line{
    position: absolute;
    right:0.2rem;
  }
  .m-wap-vote-select-content .yd-radio .yd-radio-icon,
  .m-wap-vote-select-content .yd-checkbox .yd-checkbox-icon{
    display: none;
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
</style>
