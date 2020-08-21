<template>
  <el-container class="m-content">
    <m-header></m-header>
    <m-body>
      <div class="m-list-nav">

        <div class="f-view-width">
          <span class="m-back-btn" @click.stop="back">
            <i class="el-icon-arrow-left"></i>
            <em :class="{'f-is-russian':is_russian}" v-text="$lang.tips.back_index"></em>
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
              <!--  <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hydd_n"></i>
                  <div>
                    <span>会议地点：</span>
                    <p>广东省珠海市金湾区区政府</p>&lt;!&ndash;<p style="visibility: hidden">a</p>&ndash;&gt;
                  </div>
                </li>-->
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_time_n"></i>
                  <div>
                    <span v-text="$lang.history.title.m_time+'：'"></span>
                    <p class="f-fc-orange" v-text="meetingMsg.start_time + $lang.history.title.begin_txt"></p>
                  </div>
                </li>
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
                <li class="m-history-list" v-show="meetingMsg.agenda_path!=''" @click="openViewA(meetingMsg.agenda_path,meetingMsg)" style="display: none">
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
            <!--会议纪要-->
            <el-tab-pane :label="$lang.history.title.meet_summary">
              <router-view/>
            </el-tab-pane>
            <!--批注白板-->
            <el-tab-pane :label="$lang.history.title.meet_white">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$lang.history.title.meet_white}}</el-breadcrumb-item>
              </el-breadcrumb>

              <div class="m-white-view">
                <el-tabs v-model="whiteBoardActive">
                  <el-tab-pane  name="1">
                    <div slot="label">
                      <span v-text="fileNum"></span>
                      <p v-text="$lang.history.title.m_file"></p>
                    </div>
                    <div>
                      <el-row :gutter="12">
                        <el-col :span="8" v-for="(o, index) in docList" :key="index">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover" :title="o.filename" @click.native="openView(o.filepath,o)">
                            <div class="m-white-item-hd">
                              <span :class="getType(o.filename,1)"></span>
                            </div>
                            <div class="f-text-ellipsis" v-text="o.filename"></div>
                          </el-card>
                        </el-col>
                      </el-row>
                      <div class="f-load-box" v-infinite-scroll="loadMoreDoc" infinite-scroll-disabled="docBusy" infinite-scroll-distance="30">
                        <i class="el-icon-loading" v-if="!docBusy"></i>
                        <span v-else v-text="$lang.tips.no_data"></span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="2">
                    <div slot="label">
                      <span v-text="handNum"></span>
                      <p v-text="$lang.history.title.m_hand"></p>
                    </div>
                    <div class="m-ele-white-view">
                      <el-row :gutter="12">
                        <el-col :span="8"  v-for="n,o in handList" :key="o">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img preview="1" :src="n.filepath">
                          </el-card>
                        </el-col>
                      </el-row>
                      <div class="f-load-box" v-infinite-scroll="loadMoreHand" infinite-scroll-disabled="handBusy" infinite-scroll-distance="30">
                        <i class="el-icon-loading" v-if="!handBusy"></i>
                        <span v-else v-text="$lang.tips.no_data"></span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="3">
                    <div slot="label">
                      <span v-text="elecNum"></span>
                      <p v-text="$lang.history.title.m_electron"></p>
                    </div>
                    <div class="m-ele-white-view">
                      <el-row :gutter="12">
                        <el-col :span="8"  v-for="n,o in elecList" :key="o">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img preview="1" :src="n.filepath">
                          </el-card>
                        </el-col>
                      </el-row>
                      <div class="f-load-box" v-infinite-scroll="loadMoreElec" infinite-scroll-disabled="elecBusy" infinite-scroll-distance="30">
                        <i class="el-icon-loading" v-if="!elecBusy"></i>
                        <span v-else v-text="$lang.tips.no_data"></span>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>

           <!-- <el-tab-pane :label="'会议决定事项通知'">
              <router-view/>
            </el-tab-pane>-->
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
  import { QWebChannel } from  '@/assets/js/qwebchannel.js'
  export default{
    data(){
      return{
        meetingMsg:[],
        name:'',
        whiteBoardActive:'1',
        fileNum:'0',
        handNum:'0',
        elecNum:'0',
        docPage:1,
        docList:[],
        docBusy:true,
        handPage:1,
        handList:[],
        handBusy:true,
        elecPage:1,
        elecList:[],
        elecBusy:true,
        dialogTableVisible:false,
        list: [
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s1.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s2.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s3.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s4.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s5.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s6.jpg'}
        ],
        srcPath:'',
        is_kehu:false,
        is_russian:sessionStorage.getItem('lang')=='russian'?true:false
      }
    },
    computed: {
      ...mapState(["mid"])
    },
    mounted(){
      if(sessionStorage.getItem('keepMid')==null){
        this.$store.commit('getMid',this.$route.query.mid)
      }

    if(typeof jsObj !== "undefined"){
      this.is_kehu = true
    }else if(typeof qt !== "undefined"){
      this.is_kehu = true
    }else{
      this.is_kehu = false
    }

      this.getMsg(this.mid)
      this.getFileNum(5,()=>{
        this.getDocFile()
      })
      this.getFileNum("7,13",()=>{
        this.getElecFile()
      })
      this.getFileNum("11,12",()=>{
        this.getHandFile()
      })


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
      getFileNum(num,func){
        let _self = this;
        _self.$fetch('/wap/meeting/fileCount',{
          m_id:_self.mid,
          file_use:num
        }).then(result=>{
          let res = result.data;
          if(num == '5'){
            if(res.length==0){
              _self.fileNum = 0
            }else{
              _self.fileNum = res[num]
            }
          }else if(num == '7,13'){
            if(res.length==0){
              _self.elecNum =  '0'
            }else{
              if(res[13]==undefined){
                _self.elecNum =  res[7].toString()
              }else if(res[7]==undefined){
                _self.elecNum =  res[13].toString()
              }else{
                _self.elecNum = res[13].toString() + res[7].toString()
              }
            }
          }else if(num == '11,12'){
            if(res.length==0){
              _self.handNum =  '0'
            }else{
              if(res[11]==undefined){
                _self.handNum = res[12].toString()
              }else if(res[12]==undefined){
                _self.handNum = res[11].toString()
              }else{
                _self.handNum = res[11].toString() + res[12].toString()
              }
            }
          }
          func()
        })
      },
      getDocFile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'whiteboard',
          file_use:5,
          pagesize:9,
          page:this.docPage
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            if(flag){
              this.docList = this.docList.concat(res.data)
              if(res.total<this.docPage*9){
                this.docBusy=true
              }else{
                this.docBusy=false
              }
            }else{
              this.docList = res.data
              this.docBusy=false
            }
          }else{
            this.docList = []
          }
        })
      },
      loadMoreDoc(){
        this.docBusy = true;
        setTimeout(() => {
          this.docPage++;
          this.getDocFile(true)
        }, 500);
      },
      getElecFile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'whiteboard',
          file_use:"7,13",
          pagesize:9,
          page:this.elecPage
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            if(flag){
              this.elecList = this.elecList.concat(res.data)
              if(res.total<this.elecPage*9){
                this.elecBusy=true
              }else{
                this.elecBusy=false
              }
            }else{
              this.elecList = res.data
              this.elecBusy=false
            }
          }else{
            this.elecList = []
          }
        })
      },
      loadMoreElec(){
        this.elecBusy = true;
        setTimeout(() => {
          this.elecPage++;
          this.getElecFile(true)
        }, 500);
      },
      getHandFile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'whiteboard',
          file_use:"11,12",
          pagesize:9,
          page:this.handPage
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            if(flag){
              this.handList = this.handList.concat(res.data)
              if(res.total<this.handPage*9){
                this.handBusy=true
              }else{
                this.handBusy=false
              }
            }else{
              this.handList = res.data
              this.handBusy=false
            }
          }else{
            this.handList = []
          }
        })
      },
      loadMoreHand(){
        this.handBusy = true;
        setTimeout(() => {
          this.handPage++;
          this.getHandFile(true)
        }, 500);
      },
      handleClick(tab, event){
        if(tab.label == this.$lang.history.title.meet_topic){
          this.$router.push({path:'/list/historyList/topics'})
        }else if(tab.label == this.$lang.history.title.meet_means){
          this.$router.push({path:'/list/historyList/stmpfile'})
        }else if(tab.label == this.$lang.history.title.meet_summary){
          this.$router.push({path:'/list/historyList/summary'})
        }
        /*else if(tab.label == '会议决定事项通知'){
          this.$router.push({path:'/list/historyList/decision'})
        }*/
      },
      back(){
        this.$router.push({path:'/index'})
      },
      openView(path,data) {
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
       /* }else if(_self.getType(path) == 'f-pdf-icon'){
          _self.srcPath = path
          /!*_self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          })*!/
          _self.dialogTableVisible=true*/
        }else if((_self.getType(path) == 'f-png-icon'||_self.getType(path) == 'f-jpg-icon')&&!_self.is_kehu){

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
                _self.srcPath = data.filepath
                window.location.href = _self.srcPath
              }
            }else{
              var parems = {"fileName":data.filename,"fileId":data.id,"downloadPath":data.filepath,"iSize":0}
              jsObj.downloadFile(JSON.stringify(parems))
            }
          }else{
            if(typeof qt === "undefined") {
              _self.srcPath = data.filepath
              window.location.href = _self.srcPath
            }else{
              var parems = {"fileName":data.filename,"fileId":data.id,"downloadPath":data.filepath,"iSize":0}

              new QWebChannel(qt.webChannelTransport,function(channel) {
                var jsObj = channel.objects.jsObj;
                jsObj.downloadFile(JSON.stringify(parems))
              });
            }
          }
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
      }
    },
    components: {
      mHeader,
      mBody
    }
  }
</script>
<style>
  .m-list-nav:after{
    content: '';
    position: absolute;
    top:0;
    left:0;
    height: 54px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .m-list-nav .el-tabs__header{
    background-color: #fff;
    height: 54px;
  }
  .m-list-nav .el-tabs__nav-wrap::after{
    height: 0;
  }
  .m-list-nav .el-tabs__nav-wrap{
    padding-left: 179px;
    margin-top:-1px;
  }
  .m-list-nav .el-tabs__item{
    font-size: 18px;
    line-height: 54px !important;
    height: 100%;
    color: #999;
  }
  .m-list-nav .el-tabs__item.is-active{
    color:#409EFF !important;
  }
  .m-list-nav .f-view-width{
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
    line-height: 20px;
    color: #666;
    margin-top: 5px;
    word-break: break-all;
  }
  .m-history-list-flie{
    height: 60px;
    align-items: center;
    background-color: #f5f5f5;
  }
  .m-history-list-flie span{
    width: 700px;
    font-size: 16px;
    display: inline-block;
  }

  .m-white-view .el-tabs__header{
    height: auto;
  }
  .m-white-view .el-tabs__item{
    line-height: normal !important;
    position: relative;
  }
  .m-white-view .el-tabs__item div{
    padding: 0 30px;
  }
  .m-white-view .el-tabs__item:after{
    content: '';
    position: absolute;
    height: 20px;
    top:16px;
    right:0;
    border-left:2px solid #dddddd;;
  }
  .m-white-view .el-tabs__item span{
    font-size: 24px;
    font-weight: 700;
  }

  .m-white-view .el-tabs__nav-wrap{
    padding: 10px;
  }
  .m-white-view .el-tabs__nav-scroll{
    text-align: center;
  }
  .m-white-view .el-tabs__nav{
    float: inherit;
  }
  .m-white-view .el-tabs__active-bar,
  .m-white-view .el-tabs__item:nth-last-of-type(1):after{
    display: none;
  }
  .m-white-view .el-card__body{
    border-radius: 8px;
  }
  .m-white-view .el-col{
    margin-bottom: 20px;
    cursor: pointer;
    height: 150px;
    /*overflow: hidden;*/
  }
  .m-white-view .el-col .el-card,
  .m-white-view .el-col .el-card__body,
  .m-white-view .el-col .el-card__body img{
    height: 100%;
  }
  .m-white-view .el-card{
    border: 0;
    background-color: transparent;
    text-align: center;
  }
  .m-white-view .el-card{
    overflow: inherit;
  }

  .m-white-item-hd{
    height: 140px;
    width: 100%;
    background-color: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    /*垂直居中*/
    align-items:center;
    -webkit-align-items:center;
    box-align:center;
    -moz-box-align:center;
    -webkit-box-align:center;
    /*水平居中*/
    -webkit-justify-content:center;
    justify-content:center;
    -moz-box-pack:center;
    -webkit--moz-box-pack:center;
    box-pack:center;
  }

  .m-white-item-hd span{
    display: inline-block;
    width: 45px;
    height: 54px;
    background-size: 45px auto;
    margin-right: 0;
  }
  .m-white-item-hd+.f-text-ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:14px;
    color: #333;
    font-size: 14px;
  }
  .m-ele-white-view .el-card__body{
    padding: 0.1rem !important;
    background-color: #fff;
  }

  .f-watch-dialog .el-message-box{
    width: 70% !important;
  }
  .f-watch-dialog .el-message-box__content,
  .f-watch-dialog .el-message-box__message ,
  .f-watch-dialog  .el-message-box__message p,
  .f-watch-dialog  .el-dialog__body{
    height: 600px;
  }

  .f-watch-dialog  .el-message-box__btns{
    padding-top: 22px;
  }
  .f-msg-hide-img{
    width: 100%;
    height:100%;
    position: absolute;
    right:0;top:0;
    filter:alpha(opacity=0); /* IE */
    -moz-opacity:0; /* 老版Mozilla */
    -khtml-opacity:0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
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
  .f-is-russian{
    width:120px;
    word-break:break-all;
    display:inline-block;
    line-height:16px;
    margin-top:10px;
  }
  /*.el-tabs__item{
    padding:0 10px !important;
  }*/
</style>
