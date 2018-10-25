<template>
    <yd-layout class="m-wap-index-view">
      <yd-navbar class="m-wap-index-title-logo" slot="navbar">
        <div class="f-ex" slot="left">
          <i></i>
          <span>无纸化微终端</span>
        </div>
        <span slot="right">
            <yd-icon name="user" custom size="0.44rem" color="#fff"></yd-icon>
          </span>
      </yd-navbar>
      <yd-tab active-color="#1791ff">
        <yd-tab-panel label="会议列表">
          <div class="m-wap-index-tabs-content" ref="tabView1">
            <div class="m-wap-main-nav-list" v-for="n in 3" @click.stop="goFunctionList(1)">
              <div class="m-wap-main-nav-list-hd">
                <div class="m-wap-main-nav-list-hd-content">
                  <em></em>
                  <i class="f-restart-ico" v-if="false">未开始</i>
                  <i class="f-load-ico" v-else>进行中</i>
                  <h2>金湾区第七届人大常委会第22次会议</h2>
                </div>
              </div>
              <div class="m-wap-main-nav-list-bd">
                <p>
                  <span class="fl"><span v-text="'时间:'"></span><span v-text="'2018-07-30 13:00'"></span></span>
                  <span class="fr"><span v-text="'主持人:'"></span><span v-text="'啊飒飒'"></span></span>
                </p>
                <p><span v-text="'会议室:'"></span><span v-text="'啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话'"></span></p>
              </div>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="历史会议">
          <div class="m-wap-index-tabs-content" ref="tabView2">
            <div class="m-wap-main-nav-list" v-for="n in 3" @click.stop="goFunctionList(2)">
              <div class="m-wap-main-nav-list-hd f-history">
                <div class="m-wap-main-nav-list-hd-content">
                  <em>1111111111111111111111111111</em>
                  <h2>金湾区第七届人大常委会第22次会议</h2>
                  <div class="f-flex-content">
                        <span class="f-flex-item">
                          <b>15</b>
                          <p>议题</p>
                        </span>
                        <span class="f-flex-item">
                          <b>15</b>
                          <p>资料</p>
                        </span>
                        <span class="f-flex-item">
                          <b>15</b>
                          <p>批注</p>
                        </span>
                        <span class="f-flex-item">
                          <b>15</b>
                          <p>白板</p>
                        </span>
                  </div>
                </div>
              </div>
              <div class="m-wap-main-nav-list-bd">
                <p>
                  <span class="fl"><span v-text="'时间:'"></span><span v-text="'2018-07-30 13:00'"></span></span>
                  <span class="fr"><span v-text="'主持人:'"></span><span v-text="'啊飒飒'"></span></span>
                </p>
                <p><span v-text="'会议室:'"></span><span v-text="'啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话'"></span></p>
              </div>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>


    </yd-layout>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
      created(){
        var _self = this;
        setTimeout(function(){
          let bodyH = document.getElementById('scrollView').clientHeight;
          let navH = document.querySelector('.yd-tab-nav').clientHeight;
          _self.$refs.tabView1.style.maxHeight = bodyH - navH + 'px'
          _self.$refs.tabView2.style.maxHeight = bodyH - navH + 'px'
        },100)

      },
      methods:{
        goFunctionList(type){
          //type=1 =》会议列表，type=2 =》历史会议
          this.$router.push({name:'wapFunctions',params: { listType: type }})
        }
      },
      components: {

      }
    }
</script>
<style>
  .m-wap-index-view .yd-scrollview{
    overflow: hidden;
  }
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
  .m-wap-index-tabs-content{
    overflow-x: hidden;
    overflow-y: auto;
    padding:0.2rem;
    box-sizing: border-box;
  }

  .m-wap-main-nav-list{
    background-color: #fff;
    border-radius: 5px;
    -moz-box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.4rem;
  }
  .m-wap-main-nav-list-hd{
    height: 2rem;
    background: url("../../../assets/img/meeting_bg.jpg") no-repeat;
    background-size: 100%;
    position: relative;
  }
  .m-wap-main-nav-list-hd:after{
    content: '';
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 2rem;
    background-color: rgba(0,0,0,0.4);
  }
  .m-wap-main-nav-list-hd.f-history{
    height: 2.9rem;
  }
  .m-wap-main-nav-list-hd.f-history:after{
    height: 2.9rem;
  }
  .m-wap-main-nav-list-hd{
    color: #fff;
  }
  .m-wap-main-nav-list-hd-content{
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    padding:0 0.2rem;
    box-sizing: border-box;
  }
  .m-wap-main-nav-list-hd-content em{
    display: inline-block;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.28rem;
    color: #f36323;
    margin-top:0.14rem;
    margin-bottom: 0.14rem;
    position: relative;
    background-color: rgba(0,0,0,0.3);
  }
  .m-wap-main-nav-list-hd-content i{
    position: absolute;
    top: 0;
    left:0.4rem;
    width: 0.92rem;
    height: 0.68rem;
    line-height: 0.64rem;
    font-size: 0.22rem;
    color: #fff;
  }
  .m-wap-main-nav-list-hd-content i.f-restart-ico{
    background: url("../../../assets/img/hy_wks_n.png") no-repeat;
    background-size: 0.92rem auto;
  }
  .m-wap-main-nav-list-hd-content i.f-load-ico{
    background: url("../../../assets/img/hy_jxz_n.png") no-repeat;
    background-size: 0.92rem auto;
  }
  .m-wap-main-nav-list-hd-content h2{
    font-size: 0.32rem;
    margin-top:0.2rem;
    height: 0.8rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .m-wap-main-nav-list-hd-content .f-flex-content{
    margin-top: 0.2rem;
  }
  .m-wap-main-nav-list-hd-content .f-flex-item{
    position: relative;
    overflow: hidden;
  }
  .m-wap-main-nav-list-hd-content .f-flex-item:not(:nth-last-of-type(1)):after{
    content:'';
    position: absolute;
    right: 1px;
    top: 50%;
    margin-top: -0.2rem;
    width: 1px;
    height: 0.4rem;
    background-color: #dddddd;
  }
  .m-wap-main-nav-list-bd{
    color: #666;
    font-size: 0.28rem;
    padding:0.28rem 0.2rem 0.28rem;
    overflow: hidden;
  }
  .m-wap-main-nav-list-bd p:nth-of-type(2){
    padding-top: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.4rem;
    width: 100%;
    position: relative;
  }
</style>
