<template>
  <div>
    <el-breadcrumb separator="/">
      <div class="fr">
        <el-button type="primary" size="small" v-if="is_meet_type==2" @click="showUpload=true">{{$lang.topic.form.upload}}</el-button>
      </div>
      <el-breadcrumb-item @click.native="goMain">{{$lang.history.title.meet_topic}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{topicNameTxt.replace(/\s/g,'&nbsp;')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul>
      <li class="m-history-topics-list f-flex-content">
        <div class="f-flex-item">
          <h2>{{topicNameTxt.replace(/\s/g,'&nbsp;')}}</h2>
          <span>{{$lang.topic.form.report}}：{{topicTitle.reporter}}</span>
          <span class="f-topic-list-user">
            <span>{{$lang.topic.form.join}}：</span>
            <p :class="{'f-ellipsis':toggleTap}" v-text="topicTitle.users"></p>
          </span>
        </div>
        <div class="m-history-list-r">
          <span></span>
           <!-- <span class="f-end-ico" v-if="topicTitle.status==2">
              <i>已结束</i>
            </span>
           <span class="f-load-ico" v-else>
              <i>进行中</i>
            </span>-->
          <p></p>
          <p class="f-fc-blue" v-text="toggleTap?$lang.topic.form.all:$lang.topic.form.slide_up" @click.stop="toggleTap = !toggleTap"></p>
        </div>
      </li>
      <li class="m-history-topics-list f-flex-content" v-for="items in dtopicList">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="f-wjj-icon fl" v-if="items.is_directory==1"></div>
          <div class="fl" v-else :class="getType(items.filename)"></div>
          <div class="f-ellipsis"  :title="items.filename">{{items.filename.replace(/\s/g,'&nbsp;')}}</div>
        </div>
        <div class="m-history-list-r">
          <el-button size="mini" round @click.native="goDetails(items)">
            <span v-if="(getType(items.filepath)=='f-xls-icon'||getType(items.filepath)=='f-doc-icon'||getType(items.filepath)=='f-ppt-icon'||getType(items.filepath)=='f-na-icon'||getType(items.filepath)=='f-pdf-icon'||getType(items.filepath)=='f-txt-icon')&&items.is_directory==0" v-text="$lang.topic.form.download"></span>
            <span v-else v-text="$lang.topic.form.open"></span>
            <!--<span>打开</span>-->
          </el-button>
          <img preview="4" :src="items.filepath" class="f-hide-img" v-if="getType(items.filepath)=='f-png-icon'||getType(items.filepath)=='f-jpg-icon'">
        </div>
      </li>
    </ul>
    <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else v-text="$lang.tips.no_data"></span>
    </div>
    <el-dialog :title="$lang.tips.see" :visible.sync="dialogTableVisible" :append-to-body="true" v-if="dialogTableVisible" width="70%">
      <iframe :src="srcPath"  width='100%' height='100%' frameborder='1'></iframe>
    </el-dialog>
    <el-dialog :title="$lang.upload.form.title" :visible.sync="showUpload" :append-to-body="true" v-if="showUpload" width="40%" class="f-upload-view">
      <div style="overflow: hidden">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="100"
          :on-exceed="handleExceed"
          :on-success="successUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">{{$lang.upload.form.sel_file}}</el-button>
          <div slot="tip" class="el-upload__tip">{{$lang.upload.form.file_tips}}</div>
        </el-upload>
        <span class="m-upload-limit-tips">{{$lang.upload.form.is_upload}}{{fileList.length}}</span>
        <div class="m-upload-radio-box">
          <em>{{$lang.upload.form.down_name}}</em>
          <el-radio v-model="downType" label="1">{{$lang.upload.form.can_down}}</el-radio>
          <el-radio v-model="downType" label="2">{{$lang.upload.form.no_down}}</el-radio>
        </div>
        <div class="m-upload-radio-box">
          <em>{{$lang.upload.form.is_secret}}</em>
          <el-radio v-model="watchType" label="1">{{$lang.upload.form.only_watch}}</el-radio>
          <el-radio v-model="watchType" label="2">{{$lang.upload.form.all_watch}}</el-radio>
        </div>
        <div class="fr" style="margin-top:20px ">
          <el-button @click="showUpload=false" size="small">{{$lang.means.form.cancel}}</el-button>
          <el-button type="primary" @click="" size="small">{{$lang.means.form.confirm}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import '@/assets/css/pcScrollBar.css'
  import {mapState} from 'vuex'
  import { fileType , global_} from '@/utils/utils'
  import { QWebChannel } from  '@/assets/js/qwebchannel.js'
  export default{

    data(){
      return {
        did:'',
        topicNameTxt:'',
        toggleTap:true,
        topicTitle:{},
        dtopicList:[],
        page:1,
        busy:true,
        srcPath:' ',
        dialogTableVisible:false,
        is_meet_type:sessionStorage.getItem('meetType')==null?'1':sessionStorage.getItem('meetType'),
        showUpload:false,
        fileList: [],
        downType:"1",
        watchType:"1",
      }
    },
    computed: {
      ...mapState(["mid"])
    },
    mounted(){
      this.did = this.$route.query.did

      this.getTitle()
      this.getfile()

    },
    methods:{
      getType(name){
        var file = fileType(name,1)
        return file
      },
      getTitle(){
        this.$fetch('/wap/meeting/datum',{
          m_id:this.mid,
          d_id:this.did
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            this.topicNameTxt = res.name
            this.topicTitle = res
          }else{
            this.topicTitle = []
          }
        })
      },
      getfile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'datum',
          d_id:this.did,
          pagesize:10,
          page:this.page
        }).then(result=>{
          let res = result.data;
        if(result.msg=='success'){
          if(flag){
            this.dtopicList = this.dtopicList.concat(res.data)
            if(res.total<this.page*10){
              this.busy=true
            }else{
              this.busy=false
            }
          }else{
            this.dtopicList = res.data
            this.busy=false
          }
          }else{
            this.dtopicList = []
          }
        })
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getfile(true)
        }, 500);
      },
      goDetails(data){
        let _self = this;
        if(data.is_directory==1){
          if(_self.is_meet_type == 1){
            _self.$router.push({path:'/list/historyList/topicsDetails',query:{id:data.id,name:_self.topicNameTxt,f_name:data.filename,did:_self.did}})
          }else{
            _self.$router.push({path:'/list/meetingList/topicsDetails',query:{id:data.id,name:_self.topicNameTxt,f_name:data.filename,did:_self.did}})
          }

        }else{
          _self.openView(data.filepath,data);
        }
      },
      goMain(){
        if(this.is_meet_type == 1){
          this.$router.push({path:'/list/historyList/topics'})
        }else{
          this.$router.push({path:'/list/meetingList/topics'})
        }

      },
      openView(path,data) {
        var _self = this;
        if (_self.getType(path) == 'f-video-icon'||_self.getType(path) == 'f-mp3-icon') {
          _self.srcPath = path
          _self.dialogTableVisible=true
          /*_self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          }).then(action => {
            _self.srcPath = ''
        }).catch(action => {
            _self.srcPath = ''
        });*/
       /* }else if(_self.getType(path) == 'f-pdf-icon'){
          _self.srcPath = path
          _self.dialogTableVisible=true*/
         /* _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true,
            closeOnClickModal:true
          })*/
        }else if(_self.getType(path) == 'f-png-icon'||_self.getType(path) == 'f-jpg-icon'){

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
              console.log('khd_down='+JSON.stringify(parems))
              jsObj.downloadFile(JSON.stringify(parems))
            }
          }else{
            if(typeof qt === "undefined") {
              if(_self.getType(path) == 'f-pdf-icon'){
                _self.srcPath = path
                _self.dialogTableVisible=true
              }else{
                _self.srcPath = data.filepath
                window.location.href = _self.srcPath
              }
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
      handleRemove(file, fileList) {
        console.log(1)
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(2)
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      aa(){
        console.log(JSON.stringify(this.fileList))
      },

      successUpload(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
        this.fileList.push(fileList)
      },
    }
  }
</script>
<style>
  .m-history-topics-list{
    padding:10px 20px 15px;
    position: relative;
    background-color: #fff;
    margin-top: 4px;
  }
  .m-history-topics-list h2{
    font-size: 18px;
    line-height: 44px;
    color: #333;
    width: 790px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-history-topics-list .f-flex-item span{
    font-size: 16px;
    color: #666;
    display: block;
  }
  .m-history-topics-list .f-flex-item span:nth-of-type(2){
    margin-top: 10px;
    word-break: break-all;
    line-height: 24px;
  }

  .m-history-topics-list div.f-ellipsis{
   width:700px;
    font-size: 16px;
  }

  .m-history-list-r{
    text-align: right;
  }
  .m-history-list-r span{
    height: 44px;
    line-height: 44px;
    padding-left: 28px;
    font-size: 16px;
  }

  .m-history-list-r span.f-end-ico{
    background: url("../../../assets/img/ico_yjs_n.png") no-repeat 5px center;
    background-size: 16px auto;
    color: #999;
  }
  .m-history-list-r span.f-load-ico{
    background: url("../../../assets/img/ico_jxz_n.png") no-repeat 5px center;
    background-size: 16px auto;
    color: #28b365;
  }
  .m-history-list-r span.f-start-ico{
    background: url("../../../assets/img/ico_wks_n.png") no-repeat 5px center;
    background-size: 16px auto;
    color: #66beff;
  }
  .m-history-list-r p{
    font-size: 16px;
    color: #1792ff;
    cursor: pointer;
  }
  .m-history-list-r p:nth-of-type(2){
    margin-top: 30px;
  }
  .m-history-topics-list-file{
    line-height: 54px;
  }
  .m-history-list-r button{
    margin-top:14px;
  }
  .m-history-list-r button span{
    height: auto;
    line-height: normal;
    padding-left: 0;
    font-size: 100%;
  }
  .f-topic-list-user span{
    float: left;
  }
.f-topic-list-user p{
  float: left;
  display: inline-block;
  width: 802px;
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

  .f-upload-view .el-dialog__body{
    height: auto;
  }
  .el-upload-list{
    border: 1px solid #ddd;
    margin-top: 30px;
    height: 200px;
    overflow-y: auto;
  }
  .m-upload-limit-tips{
    font-size: 12px;
    margin:10px 0 20px;
    display: inline-block;
    color: #298fff;
  }
  .m-upload-radio-box{
    display: flex;
    margin-bottom: 10px;
  }
  .m-upload-radio-box em{
    font-size: 12px;
    display: inline-block;
    width:90px;
  }
  .m-upload-radio-box label{
    padding-left: 10px;
    flex: 1;
  }
</style>
