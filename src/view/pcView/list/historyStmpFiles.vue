<template>
  <div>
    <el-breadcrumb separator="/">
      <div class="fr">
        <el-button type="primary" size="small" v-if="is_meet_type==2&&showUpdataBtn" @click="showPopup">{{$lang.topic.form.upload}}</el-button>
      </div>
      <el-breadcrumb-item>{{$lang.history.title.meet_means}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul>

      <li class="m-history-topics-list f-flex-content" v-for="items in dtopicList">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="f-wjj-icon fl" v-if="items.is_directory==1"></div>
          <div class="fl" v-else :class="getType(items.filename)"></div>
          <div class="f-ellipsis">
            <span :title="items.filename" class="f-ellipsis">{{items.filename.replace(/\s/g,'&nbsp;')}}</span>
            <p v-if="items.is_directory==0">
              <em class="f-bc-yellow" v-text="$lang.upload.tips.file_only" v-show="items.user_file!=0"></em>
              <em class="f-bc-blue" v-text="$lang.upload.tips.secret_type" v-show="items.is_secret!=0"></em>
            </p>
          </div>
        </div>
        <div class="m-history-list-r" :class="{'f-active':items.user_file!=0}">
          <el-button size="mini" round @click.native="goDetails(items)">
            <span v-if="(((getType(items.filepath)=='f-png-icon'||getType(items.filepath)=='f-jpg-icon')&&is_kehu)||getType(items.filepath)=='f-xls-icon'||getType(items.filepath)=='f-doc-icon'||getType(items.filepath)=='f-ppt-icon'||getType(items.filepath)=='f-na-icon'||getType(items.filepath)=='f-pdf-icon'||getType(items.filepath)=='f-txt-icon')&&items.is_directory==0" v-text="$lang.means.form.download"></span>
            <span v-else v-text="$lang.means.form.open"></span>
            <!--<span>打开</span>-->
          </el-button>
          <img preview="4" :src="items.filepath" class="f-hide-img" v-if="(getType(items.filepath)=='f-png-icon'||getType(items.filepath)=='f-jpg-icon')&&!is_kehu">
          <i class="el-icon-delete" v-show="items.user_file!=0" @click.stop="delFile(items.id)"></i>
        </div>
      </li>
    </ul>
    <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="60">
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
          :limit="fileLimit"
          :data="{mid:mid}"
          :on-exceed="handleExceed"
          :on-success="successUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">{{$lang.upload.form.sel_file}}</el-button>
          <div slot="tip" class="el-upload__tip">{{$lang.upload.form.file_s_tips}}</div>
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
  import { fileType, global_ , upload_url} from '@/utils/utils'
  import { QWebChannel } from  '@/assets/js/qwebchannel.js'
  export default{

    data(){
      return {
        toggleTap:true,
        dtopicList:[],
        page:1,
        busy:true,
        srcPath:' ',
        dialogTableVisible:false,
        is_meet_type:sessionStorage.getItem('meetType')==null?'1':sessionStorage.getItem('meetType'),
        showUpload:false,
        fileList: [],
        downType:"0",
        watchType:"0",
        upload_url:upload_url,
        showUpdataBtn:true,
        is_kehu:false,
        fileLimit:'',
        fileMax:'',
        fileCount:''
      }
    },
    computed: {
      ...mapState(["mid"])
  },
    mounted(){
      this.getfile()
      this.getShowUpdata()
    if(typeof jsObj !== "undefined"){
      this.is_kehu = true
    }else if(typeof qt !== "undefined"){
      this.is_kehu = true
    }else{
      this.is_kehu = false
    }
      console.log('kehuduan:'+typeof jsObj)
    },
    components: {

    },
    methods:{
      getType(name){
        var file = fileType(name,1)
        return file;
      },
      getShowUpdata(){
        this.$fetch('/api/system/system_config',{}).then(result=>{
          result.oPersonal.strUserUpload == 'disable'?this.showUpdataBtn=false:this.showUpdataBtn=true
        })
      },
      getfile(flag){
        var _self = this;
        _self.$fetch('/wap/meeting/files',{
          m_id:_self.mid,
          type:'stmpfile',
          pagesize:10,
          page:_self.page
        }).then(result=>{
          let res = result.data;
          _self.fileCount = result.file_count
          _self.fileMax = result.file_max
          if(result.msg=='success'){
            if(flag){
              _self.dtopicList = _self.dtopicList.concat(res.data)
              if(res.total<_self.page*10){
                _self.busy=true
              }else{
                _self.busy=false
              }
            }else{
              _self.dtopicList = res.data
              _self.busy=false
            }
          }else{
            _self.dtopicList = []
          }
        })
      },
      loadMore(){
        let _self = this;
        setTimeout(() => {
          _self.page++;
          _self.getfile(true)
          return
        }, 500);
      },
      goDetails(data){
        let _self = this;
        if(data.is_directory==1){
          if(_self.is_meet_type == 1) {
            _self.$router.push({
              path: '/list/historyList/stmpfileFolder',
              query: {id: data.id, 'f_name': data.filename}
            })
          }else{
            _self.$router.push({
              path: '/list/meetingList/stmpfileFolder',
              query: {id: data.id, 'f_name': data.filename}
            })
          }
        }else{
          console.log('s='+JSON.stringify(data))
          _self.openView(data.filepath,data);
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
    /*    }else if(_self.getType(path) == 'f-pdf-icon'){
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
        var _self = this;
        _self.watchType = '0'
        _self.downType  = '0'
        _self.fileList = []
        _self.showUpload = true
        _self.fileLimit = _self.fileMax - _self.fileCount
          console.log(_self.fileLimit)
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
            mid:_self.mid,
            parent_id:0,
            files:arr,
            is_secret:_self.watchType,
            allow_download:_self.downType
          }


          _self.$post('/wap/meeting/upload_files',parems).then(result=>{
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
        //this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        this.$message.warning(`单次最多支持上传100个文件；临时资料总数最多不得超过${this.fileMax} 个文件`);
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
        var arr = [];
        arr.push(id)
        var  parems = {
          meeting_id:_self.mid,
          file_id:arr
        }

        _self.$confirm(_self.$lang.upload.tips.del_tips, _self.$lang.upload.tips.del_title, {
          confirmButtonText: _self.$lang.head.tips.yes,
          cancelButtonText:  _self.$lang.head.tips.cancel
        }).then(() => {
          _self.$post('/wap/meeting/del_files',parems).then(result=>{
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
    margin-top: 26px;
  }
  .m-history-topics-list-file{
    /*line-height: 54px;*/
  }
  .m-history-list-r button{
    margin-top:14px;
  }
  .m-history-list-r button span{
    height: auto;
    line-height: normal;
    padding-left: 0;
    font-size: 100%;
  }.f-topic-list-user span{
     float: left;
   }
  .f-topic-list-user p{
    float: left;
    display: inline-block;
    width: 802px;
  }


  .f-watch-dialog  .el-message-box{
    width: 90% !important;
  }
  .f-watch-dialog  .el-message-box__content,
  .f-watch-dialog .el-message-box__message ,
  .f-watch-dialog  .el-message-box__message p,
  .f-watch-dialog .el-dialog__body{
    height: 600px;
  }
  .f-watch-dialog .el-message-box__btns{
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
