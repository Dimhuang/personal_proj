<template>
  <div>
    <el-breadcrumb separator="/">
      <div class="fr">
        <el-button type="primary" size="small" v-if="is_meet_type==2&&showUpdataBtn" @click="showPopup">{{$lang.topic.form.upload}}</el-button>
      </div>
      <el-breadcrumb-item @click.native="goMain">{{$lang.history.title.meet_topic}}</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="goList">{{topicNameTxt.replace(/\s/g,'&nbsp;')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{folderNameTxt.replace(/\s/g,'&nbsp;')}}</el-breadcrumb-item>
      <!--<el-breadcrumb-item v-for="(n,index) in breakList" :key="index" @click.native="goPath(n)">{{n.name}}</el-breadcrumb-item>-->
    </el-breadcrumb>
    <ul>
      <li class="m-history-topics-list f-flex-content" v-for="items in topicList">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="fl" :class="getType(items.filename)"></div>
          <div class="f-ellipsis">
            <span :title="items.filename" class="f-ellipsis">{{items.filename.replace(/\s/g,'&nbsp;')}}</span>
            <p v-if="items.is_directory==0">
              <em class="f-bc-yellow" v-text="$lang.upload.tips.file_only" v-show="items.user_file!=0"></em>
              <em class="f-bc-blue" v-text="$lang.upload.tips.secret_type" v-show="items.is_secret!=0"></em>
            </p>
          </div>
        </div>
        <div class="m-history-list-r" :class="{'f-active':items.user_file!=0}">
          <el-button size="mini" round  @click.native="openView(items.filepath,items)">
            <span v-if="(getType(items.filepath)=='f-xls-icon'||getType(items.filepath)=='f-doc-icon'||getType(items.filepath)=='f-ppt-icon'||getType(items.filepath)=='f-na-icon'||getType(items.filepath)=='f-pdf-icon'||getType(items.filepath)=='f-txt-icon')&&items.is_directory==0" v-text="$lang.topic.form.download"></span>
            <span v-else v-text="$lang.topic.form.open"></span>
            <!--<span>打开</span>-->
          </el-button>
          <img preview="4" :src="items.filepath" class="f-hide-img" v-if="getType(items.filepath)=='f-png-icon'||getType(items.filepath)=='f-jpg-icon'">
          <i class="el-icon-delete" v-show="items.user_file!=0" @click.stop="delFile(items.id)"></i>
        </div>
      </li>
    </ul>
    <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else v-text="$lang.tips.no_data"></span>
    </div>
    <el-dialog class="f-watch-dialog" :title="$lang.tips.see" :visible.sync="dialogTableVisible" :append-to-body="true" v-if="dialogTableVisible" width="70%">
      <iframe :src="srcPath"  width='100%' height='100%' frameborder='1'></iframe>
    </el-dialog>
    <el-dialog :title="$lang.upload.form.title" :visible.sync="showUpload" :append-to-body="true" v-if="showUpload" width="40%" class="f-upload-view">
      <div style="overflow: hidden">
        <el-upload
          class="upload-demo"
          :action= upload_url
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="100"
          :data="{mid:mid}"
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
          <el-radio v-model="downType" label="0">{{$lang.upload.form.no_down}}</el-radio>
        </div>
        <div class="m-upload-radio-box">
          <em>{{$lang.upload.form.is_secret}}</em>
          <el-radio v-model="watchType" label="1">{{$lang.upload.form.only_watch}}</el-radio>
          <el-radio v-model="watchType" label="0">{{$lang.upload.form.all_watch}}</el-radio>
        </div>
        <div class="fr" style="margin-top:20px ">
          <el-button @click="showUpload=false" size="small">{{$lang.means.form.cancel}}</el-button>
          <el-button type="primary" @click.native="uploadKeep()" size="small">{{$lang.means.form.confirm}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import '@/assets/css/pcScrollBar.css'
  import {mapState} from 'vuex'
  import { fileType , global_ , upload_url} from '@/utils/utils'
  import { QWebChannel } from  '@/assets/js/qwebchannel.js'
  export default{
    data(){
      return {
        topicNameTxt:'',
        folderNameTxt:'',
        topicList:[],
        page:1,
        busy:true,
        fid:'',
        did:'',
        srcPath:' ',
        dialogTableVisible:false,
        is_meet_type:sessionStorage.getItem('meetType')==null?'1':sessionStorage.getItem('meetType'),
        showUpload:false,
        fileList: [],
        downType:"0",
        watchType:"0",
        upload_url:upload_url,
        showUpdataBtn:true
      }
    },
    computed: {
      ...mapState(["mid"])
    },
    mounted(){
      this.topicNameTxt = this.$route.query.name
      this.folderNameTxt = this.$route.query.f_name
      this.did = this.$route.query.did
      this.fid = this.$route.query.id
      this.getfile()
    this.getShowUpdata()
    },
    methods:{
      getType(name){
        var file = fileType(name,1)
        return file
      },
      getShowUpdata(){
        this.$fetch('/api/system/system_config',{}).then(result=>{
          result.oPersonal.strUserUpload == 'disable'?this.showUpdataBtn=false:this.showUpdataBtn=true
        })
      },
      getfile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'datum',
          file_id:this.fid,
          pagesize:10,
          page:this.page
        }).then(result=>{
          let res = result.data;
          if(result.msg=='success'){
            if(flag){
              this.topicList = this.topicList.concat(res.data)
              if(res.total<this.page*10){
                this.busy=true
              }else{
                this.busy=false
              }
            }else{
              this.topicList = res.data
              this.busy=false
            }
          }else{
            this.topicList = []
          }
        })
      },
      loadMore(){
        this.busy = true;
        setTimeout(()=>{
          this.page++;
          this.getfile(true)
        }, 500)
      },
      goMain(){
        if(this.is_meet_type == 1){
          this.$router.push({path:'/list/historyList/topics'})
        }else{
          this.$router.push({path:'/list/meetingList/topics'})
        }

      },
      goList(){
        if(this.is_meet_type == 1){
          this.$router.push({path:'/list/historyList/topicsList',query:{did: this.did}})
        }else{
          this.$router.push({path:'/list/meetingList/topicsList',query:{did: this.did}})
        }
      },
      openView(path,data) {
        var _self = this;
        if (_self.getType(path) == 'f-video-icon'||_self.getType(path) == 'f-mp3-icon') {
          _self.srcPath = path
          _self.dialogTableVisible=true
         /* _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          }).then(action => {
            _self.srcPath = ''
        }).catch(action => {
            _self.srcPath = ''
        });*/
      /*  }else if(_self.getType(path) == 'f-pdf-icon'){
          _self.srcPath = path
          _self.dialogTableVisible=true*/
         /* _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          }).then(action => {
            var elem = document.querySelector('.pswp');
          elem.parentNode.removeChild(elem);
        }).catch(action => {
            var elem = document.querySelector('.pswp');
          elem.parentNode.removeChild(elem);
        });*/
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
      showPopup(){
        this.watchType = '0'
        this.downType  = '0'
        this.fileList = []
        this.showUpload = true
      },
      uploadKeep(){
        var _self = this;
        var arr = [];
        if(_self.fileList.length==0){
          _self.$message(_self.$lang.upload.tips.file_limit_tips);
        }else{
          for(var i=0;i<_self.fileList.length;i++){
            arr.push(_self.fileList[i].response.fid)
          }

          var parems = {
            datum_id:_self.did,
            mid:_self.mid,
            parent_id:_self.fid,
            files:arr,
            is_secret:_self.watchType,
            allow_download:_self.downType
          }


          _self.$post('/wap/meeting/upload_datum_file',parems).then(result=>{
            let res = result;
          console.log(res)
          if(result.msg=='success'){
            _self.showUpload = false
            _self.$notify({
              title: result.message,
              //message: '这是一条成功的提示消息',
              type: 'success'
            });
            _self.page=_self.page-1
            _self.getfile()
          }else{
            _self.$message(result.message);
          }
        })

        }
      },
      handleRemove(file, fileList) {
        var _self = this;
        for(var i=0;i<_self.fileList.length;i++){
          if(_self.fileList[i].response.fid==file.fid){
            _self.fileList.splice(i,1)
          }
        }
      },
      handlePreview(file) {
        var _self = this;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      successUpload(response, file, fileList){
        var _self = this;
        _self.fileList = fileList
      },
      delFile(id){
        var _self = this;
        var  parems = {
          type:2,
          id:id,
          datum_id:_self.did
        }
        _self.$confirm(_self.$lang.upload.tips.del_tips, _self.$lang.upload.tips.del_title, {
          confirmButtonText: _self.$lang.head.tips.yes,
          cancelButtonText:  _self.$lang.head.tips.cancel
        }).then(() => {
          _self.$post('/wap/meeting/del_datum_file',parems).then(result=>{
          let res = result;
        if(result.msg=='success'){
          _self.$notify({
            title: result.message,
            //message: '这是一条成功的提示消息',
            type: 'success'
          });
          _self.page=_self.page-1
          _self.getfile()
        }else{
          _self.$message(result.message);
        }
      })
      }).catch(() => {
          /*  _self.$message({
           type: 'info',
           message: '已取消删除'
           });*/
        });
      }
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
  .m-history-topics-list .f-flex-item .f-ellipsis span{
    display: inline-block;
    width: 100%;
    line-height: 34px;
  }
  .m-history-topics-list .f-flex-item .f-ellipsis p{
    line-height: 20px;
  }
  .m-history-topics-list .f-flex-item .f-ellipsis p em{
    font-size: 12px;
    padding:4px 6px;
    border-radius: 5px;
    margin-right: 10px;
    color: #666;
  }
  .f-bc-blue{
    background-color: #9fd6fd;
  }
  .f-bc-yellow{
    background-color: #ffff00;
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
    margin-top: 26px;
  }
  .m-history-topics-list-file{
    /*line-height: 54px;*/
  }
  .m-history-topics-list-file div.f-ellipsis{
    width:700px;
    font-size: 16px;
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
 .f-watch-dialog .el-message-box{
    width: 90% !important;
  }
  .f-watch-dialog  .el-message-box__content,
  .f-watch-dialog  .el-message-box__message ,
  .f-watch-dialog  .el-message-box__message p,
  .f-watch-dialog .el-dialog__body{
    height: 600px;
  }
  .f-watch-dialog  .el-message-box__btns{
    padding-top: 22px;
  }

  .f-upload-view .el-dialog__body{
    height: auto;
  }
  .f-upload-view .el-upload-list{
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
  .m-history-list-r i{
    font-size: 30px;
    float: right;
    margin-top: 15px;
    color:#d81e06 ;
    margin-left: 15px;
    cursor: pointer;
  }
  .m-history-list-r.f-active .f-hide-img{
    right: 65px;
  }
</style>
