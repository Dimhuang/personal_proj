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
              <p v-text="meetingMsgList.name"></p>
            </span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
                <yd-icon name="hyxx_time_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议时间:</span>
              <p class="f-fc-orange" v-text="meetingMsgList.start_time"></p>
            </span>
          </yd-cell-item>
        <!--  <yd-cell-item>
            <span slot="left">
                <yd-icon name="hyxx_hydd_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议地点:</span>
              <p>广东省珠海市金湾区区政府</p>
            </span>
          </yd-cell-item>-->
          <yd-cell-item>
            <span slot="left">
                <yd-icon name="hyxx_hycs_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议场所:</span>
              <p v-text="meetingMsgList.room_name"></p>
            </span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
                <yd-icon name="hyxx_zcr_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>主持人:</span>
              <p v-text="meetingMsgList.moderator"></p>
            </span>
          </yd-cell-item>
          <yd-cell-item class="f-ex">
            <span slot="left">
                <yd-icon name="hyxx_hyjj_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议简介:</span>
              <p v-text="meetingMsgList.description"></p>
            </span>
          </yd-cell-item>
          <yd-cell-item class="f-ex" v-if="meetingMsgList.agenda_path!=''"  @click.native="openView(meetingMsgList.agenda_path,meetingMsgList.agenda_id)">
            <span slot="left">
                <yd-icon name="hyxx_hyfa_n" custom size="0.42rem" color="#1791ff"></yd-icon>
            </span>
            <span slot="left">
              <span>会议方案:</span>
               <div class="m-history-list-flie f-flex-content">
                 <div :class="getType(meetingMsgList.agenda_name)"></div>
                 <div class="f-flex-item" v-text="meetingMsgList.agenda_name"></div>
               </div>
            </span>
          </yd-cell-item>
        </yd-cell-group>
        <yd-popup v-model="showRight" position="right" class="f-popup-view" width="100%">
          <yd-navbar slot="top" title="查看">
            <div slot="left" @click.stop="cencel">
              <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
              <span>返回</span>
            </div>
          </yd-navbar>
          <iframe :src='srcPath' width='100%' height='100%' frameborder='1' v-show="!is_pdf"></iframe>
          <embed width="100%" height="100%" name="plugin" id="plugin" :src="srcPath" type="application/pdf" internalinstanceid="3" v-show="is_pdf">
        </yd-popup>
      </div>
    </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  import { fileType } from '@/utils/utils'
    export default{
        data(){
            return {
              meetingMsgList:[],
              srcPath:'',
              showRight:false,
              is_pdf:true
            }
        },
        computed: {
          ...mapState(["wapFunType","mid"])
        },
        mounted(){
          this.getMsg()
        },
        methods: {
          getType(name){
            var file = fileType(name,2)
            return file;
          },
          getMsg(){
            this.$fetch('/wap/meeting/data',{
              m_id:this.mid
            }).then(result=>{
              let res = result.data;
            if(result.msg=='success'){
              this.meetingMsgList = res
            }else{
              this.meetingMsgList = []
            }
          })
          },
          back(){
            this.$router.push({path:'/wap/functions'})
          },
          cencel:function(){
            var _self = this;
            _self.srcPath = ''
            _self.showRight = false
          },
          openView(path,id,data) {
            var _self = this
            if(_self.getType(_self.meetingMsgList.agenda_name) == 'f-wap-na-icon'){
              _self.$dialog.toast({
                mes: '格式不支持！',
                timeout: 1500
              });
            }else{
              if(sessionStorage.getItem('adType')!=null){
                window.location.href = 'wzh://itc?id='+id+'&path='+path
                return
              }else{
                if (_self.getType(path) == 'f-wap-pdf-icon'||_self.getType(path) == 'f-wap-txt-icon'||_self.getType(path) == 'f-wap-video-icon'||_self.getType(path) == 'f-wap-mp3-icon') {
                  _self.srcPath = path
                  _self.showRight = true
                }else if(_self.getType(path) == 'f-wap-png-icon'||_self.getType(path) == 'f-wap-jpg-icon'){

                }else {
                  _self.srcPath = path
                  window.location.href = _self.srcPath
                }
              }
            }
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
    width: 100%;
    padding-right: 0.2rem;
  }
  .g-wap-welcome-content .f-ex .yd-cell-right{
    display: none;
  }
  .g-wap-welcome-content .f-ex .yd-cell-left span i{
    margin-top: 0.16rem;
    float: left;
  }
  .g-wap-welcome-content .yd-cell-left span:nth-of-type(2){
    margin-left: 0.2rem;
    width: 100%;
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
