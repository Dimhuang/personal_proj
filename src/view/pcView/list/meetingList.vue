<template>
  <el-container class="m-content">
    <m-header></m-header>
    <m-body>
      <div class="m-meeting-nav">

        <div class="f-view-width">
          <span class="m-back-btn" @click="back">
            <i class="el-icon-arrow-left"></i>
            <em v-text="$lang.tips.back_index"></em>
          </span>
          <el-tabs @tab-click="handleClick">
            <!--会议信息-->
            <el-tab-pane :label="$lang.history.title.meet_msg">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$lang.history.title.meet_msg}}</el-breadcrumb-item>
              </el-breadcrumb>
              <ul>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hymc_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_name+'：'"></span>
                    <p v-html="name"></p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_time_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_time+'：'"></span>
                    <p class="f-fc-orange" v-text="meetingMsg.start_time + $lang.history.title.begin_txt"></p>
                  </div>
                </li>
                <!--<li class="m-history-list">
                  <i class="iconfont pl-hyxx_hydd_n"></i>
                  <div>
                    <span>会议地点：</span>
                    <p>广东省珠海市金湾区区政府</p>
                  </div>
                </li>-->
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hycs_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_place+'：'"></span>
                    <p v-text="meetingMsg.room_name"></p><p v-if="meetingMsg.room_name==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_zcr_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_host+'：'"></span>
                    <p v-text="meetingMsg.moderator"></p><p v-if="meetingMsg.moderator==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hyjj_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_mark+'：'"></span>
                    <p v-text="meetingMsg.description"></p><p v-if="meetingMsg.description==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hymd_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_users+'：'"></span>
                    <p v-text="meetingMsg.userString"></p>
                  </div>
                </li>
                <li class="m-history-list" v-if="meetingMsg.agenda_path!=''" @click="openViewA(meetingMsg.agenda_path,meetingMsg)">
                  <img preview="4" :src="meetingMsg.agenda_path" class="f-msg-hide-img" v-if="(getType(meetingMsg.agenda_path)=='f-png-icon'||getType(meetingMsg.agenda_path)=='f-jpg-icon')&& !is_kehu">
                  <i class="iconfont pl-hyxx_hyfa_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_case+'：'"></span>
                    <div class="m-history-list-flie f-flex-content">
                      <div :class="getType(meetingMsg.agenda_name)"></div>
                      <div class="f-flex-item">
                        <span class="f-ellipsis" :title="meetingMsg.agenda_name" v-text="meetingMsg.agenda_name"></span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <!--会议议题-->
            <el-tab-pane :label="$lang.history.title.meet_topic">
              <router-view/>
            </el-tab-pane>
            <!--临时资料-->
            <el-tab-pane :label="$lang.history.title.meet_means">
              <router-view/>
            </el-tab-pane>
          </el-tabs>
          <el-dialog class="f-watch-dialog" :title="$lang.tips.see" :visible.sync="dialogTableVisible" :append-to-body="true" v-if="dialogTableVisible" width="70%">
            <iframe :src="srcPath"  width='100%' height='100%' frameborder='1'></iframe>
          </el-dialog>
        </div>
      </div>
    </m-body>
  </el-container>
</template>
<script>
  import mHeader from '@/components/header.vue'
  import mBody from '@/components/body.vue'
  import '@/assets/css/pcScrollBar.css'
  import { fileType , global_} from '@/utils/utils'
  import {mapState} from 'vuex'
  export default{
    data(){
      return{
        meetingMsg:[],
        name:'',
        dialogTableVisible:false,
      }
    },
    computed: {
      ...mapState(["mid"])
     },
    mounted(){
    if(typeof jsObj !== "undefined"){
      this.is_kehu = true
    }else if(typeof qt !== "undefined"){
      this.is_kehu = true
    }else{
      this.is_kehu = false
    }
      if(sessionStorage.getItem('keepMid')==null){
        this.$store.commit('getMid',this.$route.query.mid)
      }
      this.getMsg(this.mid)



    setTimeout(function(){
      console.log( document.querySelector('.m-main').clientHeight)
      document.querySelector('.el-tabs__content').style.height = document.querySelector('.m-main').clientHeight - 70 + 'px'
    },500)



    },
    methods:{
      getType(name){
        var file = fileType(name,1)
        return file;
      },
      getMsg(id){
        this.$fetch('/wap/meeting/data',{
          m_id:id
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            this.meetingMsg = res
            this.name = res.name.replace(/\s/g,'&nbsp;')
          }else{
            this.meetingMsg = []
          }
        })
      },
      handleClick(tab, event){
        if(tab.label == this.$lang.history.title.meet_topic){
          this.$router.push({path:'/list/meetingList/topics'})
        }else if(tab.label == this.$lang.history.title.meet_means){
          this.$router.push({path:'/list/meetingList/stmpfile'})
        }
      },
      openViewA(path,data) {
        var _self = this;
        if (_self.getType(path) == 'f-video-icon'||_self.getType(path) == 'f-mp3-icon') {
          _self.srcPath = path
          _self.dialogTableVisible=true
          /*  _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
           dangerouslyUseHTMLString: true
           }).then(action => {
           _self.srcPath = ''
           }).catch(action => {
           _self.srcPath = ''
           });*/
          /*   }else if(_self.getType(path) == 'f-pdf-icon'){
           _self.srcPath = path
           /!*_self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
           dangerouslyUseHTMLString: true
           })*!/
           _self.dialogTableVisible=true*/
          /*}else if(_self.getType(path) == 'f-png-icon'||_self.getType(path) == 'f-jpg-icon'){*/

        }else {
          /* _self.$alert(" <iframe src='https://view.officeapps.live.com/op/view.aspx?src=" + path + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
           dangerouslyUseHTMLString: true
           });*/
          if(sessionStorage.getItem('globalObj')==1){
            if(typeof jsObj === "undefined") {
              if(_self.getType(path) == 'f-pdf-icon'){
                _self.srcPath = path
                _self.dialogTableVisible=true
              }else{
                _self.srcPath = path
                window.location.href = _self.srcPath
              }
            }else{
              var parems = {"fileName":data.agenda_name,"fileId":data.id,"downloadPath":data.agenda_path,"iSize":0}
              jsObj.downloadFile(JSON.stringify(parems))
            }
          }else{
            if(typeof qt === "undefined") {
              if(_self.getType(path) == 'f-pdf-icon'){
                _self.srcPath = path
                _self.dialogTableVisible=true
              }else{
                _self.srcPath = path
                window.location.href = _self.srcPath
              }
            }else{
              var parems = {"fileName":data.agenda_name,"fileId":data.id,"downloadPath":data.agenda_path,"iSize":0}
              new QWebChannel(qt.webChannelTransport,function(channel) {
                var jsObj = channel.objects.jsObj;
                jsObj.downloadFile(JSON.stringify(parems))
              });
            }
          }
        }
      },
      back(){
        this.$router.push({path:'/index'})
      }
    },
    components: {
      mHeader,
      mBody
    }
  }
</script>
<style>
  .m-meeting-nav:after{
    content: '';
    position: absolute;
    top:0;
    left:0;
    height: 54px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .m-meeting-nav .el-tabs__header{
    background-color: #fff;
    height: 53px;
  }

  .m-meeting-nav .el-tabs__nav-scroll{
    /*text-align: center;*/
  }
  .m-meeting-nav .el-tabs__nav{
    float: inherit;
  }
  .m-meeting-nav .el-tabs__nav-wrap{
    padding-left: 179px;
    margin-top:-1px;
  }
  .m-meeting-nav .el-tabs__nav-wrap::after{
    height: 0;
  }
  .m-meeting-nav .el-tabs__item{
    font-size: 18px;
    line-height: 54px !important;
    height: 100%;
    color: #999;
  }
  .m-meeting-nav .el-tabs__item.is-active{
    color:#409EFF !important;
  }
  .m-meeting-nav .el-tabs__active-bar{
   /* left: 50%;
    margin-left: -35.5px;*/
  }
  .m-meeting-nav .f-view-width{
    position: relative;
    z-index: 2;
  }
  .m-back-btn{
    position: absolute;
    top: 0;
    left:0;
    z-index: 3;
    height:54px;
    line-height: 54px;
    color: #666;
    font-size: 16px;
    cursor: pointer;
  }
  .m-back-btn .el-icon-arrow-left{
    font-size: 24px;
    float: left;
    height: 100%;
    line-height: 54px;
    font-weight: 700;
  }
  .m-history-list{
    padding:5px 10px 5px 74px;
    position: relative;
    background-color: #fff;
    margin-top: 4px;
  }
  .m-history-list i{
    position: absolute;
    top: 20px;
    left:30px;
    font-size: 22px;
    color: #1792ff;
  }
  .m-history-list span{
    font-size: 18px;
    line-height: 24px;
    color: #111;
  }
  .m-history-list p{
    font-size: 16px;
    line-height: 24px;
    color: #666;
    margin-top: 5px;
    word-break: break-all;
  }
  .m-history-list p.f-fc-orange{
    color: #f36323;
  }
  .m-history-list-flie{
    height: 60px;
    align-items: center;
    background-color: #f5f5f5;
  }
.el-tabs__content{
  overflow-y: auto !important;
}
  .el-breadcrumb .el-breadcrumb__item{
    margin-top: 6px;
  }
  .el-breadcrumb{
    height: 28px;
    margin-bottom: 10px;
  }
</style>
