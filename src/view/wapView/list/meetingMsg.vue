<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="会议信息">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <div class="g-wap-welcome-content">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">
                <yd-icon name="hyxx_hymc_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议名称:</span>
              <p>金湾区第七届人大常委会第24次会议</p>
            </span>
          </yd-cell-item>
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
          <yd-cell-item class="f-ex">
            <span slot="left">
                <yd-icon name="hyxx_hyfa_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议方案:</span>
               <div class="m-history-list-flie f-flex-content">
                 <div class="f-wap-pdf-icon"></div>
                 <div class="f-flex-item">金湾区第七届人大常委会第24次会议方案.pdf</div>
               </div>
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
              listType: ''
            }
        },
        mounted(){
          var _self = this;
          _self.listType = _self.$route.params.listType
        },
        methods: {
          back(){
            var _self = this;
            _self.$router.push({name:'wapFunctions',params: { listType: _self.listType }})
          }
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
  .m-history-list-flie{
    height: 1rem;
    margin-top:0.1rem;
    align-items: center;
    background-color: #f5f5f5;
  }
  .m-history-list-flie .f-flex-item{
    font-size: 0.24rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
