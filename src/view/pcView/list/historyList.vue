<template>
  <el-container class="m-content">
    <m-header></m-header>
    <m-body>
      <div class="m-list-nav">

        <div class="f-view-width">
          <span class="m-back-btn" @click.stop="back">
            <i class="el-icon-arrow-left"></i>
            <em v-text="'返回'"></em>
          </span>
          <el-tabs @tab-click="handleClick">
            <!--会议信息-->
            <el-tab-pane label="会议信息">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>会议信息</el-breadcrumb-item>
              </el-breadcrumb>
              <ul>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hymc_n"></i>
                  <div>
                    <span>会议名称：</span>
                    <p v-text="meetingMsg.name"></p>
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
                  <i class="iconfont pl-hyxx_hycs_n"></i>
                  <div>
                    <span>会议场所：</span>
                    <p v-text="meetingMsg.room_name"></p><p v-if="meetingMsg.room_name==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_zcr_n"></i>
                  <div>
                    <span>主持人：</span>
                    <p v-text="meetingMsg.moderator"></p><p v-if="meetingMsg.moderator==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hyjj_n"></i>
                  <div>
                    <span>会议简介：</span>
                    <p v-text="meetingMsg.description"></p><p v-if="meetingMsg.description==''" style="visibility: hidden">a</p>
                  </div>
                </li>
                <li class="m-history-list" v-if="meetingMsg.agenda_path!=''" @click="openView(meetingMsg.agenda_path)">
                  <img preview="4" :src="meetingMsg.agenda_path" class="f-msg-hide-img" v-if="getType(meetingMsg.agenda_path)=='f-png-icon'||getType(meetingMsg.agenda_path)=='f-jpg-icon'">
                  <i class="iconfont pl-hyxx_hyfa_n"></i>
                  <div>
                    <span>会议方案：</span>
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
            <el-tab-pane label="会议议题">
              <router-view/>
            </el-tab-pane>
            <!--临时资料-->
            <el-tab-pane label="临时资料">
              <router-view/>
            </el-tab-pane>
            <!--批注白板-->
            <el-tab-pane label="批注白板">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>批注白板</el-breadcrumb-item>
              </el-breadcrumb>

              <div class="m-white-view">
                <el-tabs v-model="whiteBoardActive">
                  <el-tab-pane  name="1">
                    <div slot="label">
                      <span v-text="fileNum"></span>
                      <p>文档批注</p>
                    </div>
                    <div>
                      <el-row :gutter="12">
                        <el-col :span="8" v-for="(o, index) in docList" :key="index">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover" :title="o.filename" @click.native="openView(o.filepath)">
                            <div class="m-white-item-hd">
                              <span :class="getType(o.filename,1)"></span>
                            </div>
                            <div class="f-text-ellipsis" v-text="o.filename"></div>
                          </el-card>
                        </el-col>
                      </el-row>
                      <div class="f-load-box" v-infinite-scroll="loadMoreDoc" infinite-scroll-disabled="docBusy" infinite-scroll-distance="30">
                        <i class="el-icon-loading" v-if="!docBusy"></i>
                        <span v-else>暂无更多数据</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="2">
                    <div slot="label">
                      <span v-text="handNum"></span>
                      <p>手写批注</p>
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
                        <span v-else>暂无更多数据</span>
                      </div>
                    </div>
                  </el-tab-pane>
                  <!--<el-tab-pane label="电子白板" name="3">
                    <div slot="label">
                      <span v-text="elecNum"></span>
                      <p>电子白板</p>
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
                        <span v-else>暂无更多数据</span>
                      </div>
                    </div>
                  </el-tab-pane>-->
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>

          <el-dialog title="查看" :visible.sync="dialogTableVisible" :append-to-body="true" v-if="dialogTableVisible" width="90%">
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
  import { fileType } from '@/utils/utils'
  import {mapState} from 'vuex'
  export default{
    data(){
      return{
        meetingMsg:[],
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
        srcPath:''
      }
    },
    computed: {
      ...mapState(["mid"])
    },
    mounted(){
      if(sessionStorage.getItem('keepMid')==null){
        this.$store.commit('getMid',this.$route.query.mid)
      }
      this.getMsg(this.mid)
      this.getFileNum(5,()=>{
        this.getDocFile()
      })
      this.getFileNum(7,()=>{
        this.getElecFile()
      })
      this.getFileNum(11,()=>{
        this.getHandFile()
      })
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
            }else{
              this.meetingMsg = []
            }
          })
      },
      getFileNum(num,func){
        this.$fetch('/wap/meeting/fileCount',{
          m_id:this.mid,
          file_use:num
        }).then(result=>{
          let res = result.data;
          if(num == '5'){
            if(res.length==0){
              this.fileNum = 0
            }else{
              this.fileNum = res[num]
            }
          }else if(num == '7'){
            if(res.length==0){
              this.elecNum = 0
            }else{
              this.elecNum = res[num]
            }
          }else if(num == '11'){
            if(res.length==0){
              this.handNum = 0
            }else{
              this.handNum = res[num]
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
          file_use:7,
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
          file_use:11,
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
        if(tab.label == "会议议题"){
          this.$router.push({path:'/list/historyList/topics'})
        }else if(tab.label == "临时资料"){
          this.$router.push({path:'/list/historyList/stmpfile'})
        }
      },
      back(){
        this.$router.push({path:'/index'})
      },
      openView(path) {
        var _self = this;
        if (_self.getType(path) == 'f-txt-icon'||_self.getType(path) == 'f-video-icon'||_self.getType(path) == 'f-mp3-icon') {
          _self.srcPath = path
          _self.dialogTableVisible=true
        /*  _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          }).then(action => {
            _self.srcPath = ''
          }).catch(action => {
              _self.srcPath = ''
          });*/
        }else if(_self.getType(path) == 'f-pdf-icon'){
          _self.srcPath = path
          /*_self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          })*/
          _self.dialogTableVisible=true
        }else if(_self.getType(path) == 'f-png-icon'||_self.getType(path) == 'f-jpg-icon'){

          }else {
          /* _self.$alert(" <iframe src='https://view.officeapps.live.com/op/view.aspx?src=" + path + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
           dangerouslyUseHTMLString: true
           });*/
          _self.srcPath = path
          window.location.href = _self.srcPath
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
    padding-left: 320px;
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

  .el-message-box{
    width: 90% !important;
  }
  .el-message-box__content,
  .el-message-box__message ,
  .el-message-box__message p,
  .el-dialog__body{
    height: 600px;
  }

  .el-message-box__btns{
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
</style>
