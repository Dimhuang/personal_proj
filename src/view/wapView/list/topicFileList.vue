<template>
  <yd-layout>
    <yd-navbar slot="navbar">
      <span class="yd-navbar-center-title" slot="center">{{folderNameTxt.replace(/\s/g,'&nbsp;')}}</span>
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <yd-cell-group class="m-wap-folder-list-bd" v-if="is_ad">
      <yd-cell-item v-for="(n,index) in topicList" :key="index"  :class="{'f-is-del':(is_device!=2&&n.user_file==0)||n.is_directory==1}">
        <!-- <yd-lightbox slot="left" class="f-wap-img-hide-view" v-if="getType(n.filepath)=='f-wap-png-icon'||getType(n.filepath)=='f-wap-jpg-icon'">
           <yd-lightbox-img :src="n.filepath"></yd-lightbox-img>
         </yd-lightbox>-->
        <i :class="getType(n.filename)" slot="icon" @click.stop="openView(n.filepath,n,0)"></i>
        <span slot="left" @click.stop="openView(n.filepath,n,0)">
          <span class="f-ex">{{n.filename.replace(/\s/g,'&nbsp;')}}</span>
            <p v-if="n.is_directory==0">
              <em class="f-bc-yellow" v-show="n.user_file!=0">我上传的</em>
              <em class="f-bc-blue" v-show="n.is_secret!=0">私有模式</em>
            </p>
        </span>
        <i class="m-wap-folder-download" slot="right"  v-show="is_device==2" @click.stop="openView(n.filepath,n,1)"></i>
        <i class="m-wap-folder-delete" slot="right" v-show="n.user_file!=0" @click.stop="delFile(n.id)"></i>
        <!--<yd-icon slot="right" name="download" color="#1792FF" @click.native="openView(n.filepath,n,1)" ></yd-icon>
        <yd-icon slot="right" name="delete" color="#FF685D" v-show="n.user_file!=0" @click.native="delFile(n.id)"></yd-icon>-->
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group class="m-wap-folder-list-bd" v-else>
      <yd-cell-item v-for="(n,index) in topicList" :key="index" :class="{'f-is-del':n.user_file==0}">
        <yd-lightbox slot="left" :num="topicList.length" class="f-wap-img-hide-view" v-if="getType(n.filepath)=='f-wap-png-icon'||getType(n.filepath)=='f-wap-jpg-icon'">
          <yd-lightbox-img :src="n.filepath"></yd-lightbox-img>
        </yd-lightbox>
        <i :class="getType(n.filename)" slot="icon"  @click.stop="openView(n.filepath,n)"></i>
        <span slot="left" @click.stop="openView(n.filepath,n)">
          <span class="f-ex">{{n.filename.replace(/\s/g,'&nbsp;')}}</span>
            <p v-if="n.is_directory==0">
              <em class="f-bc-yellow" v-show="n.user_file!=0">我上传的</em>
              <em class="f-bc-blue" v-show="n.is_secret!=0">私有模式</em>
            </p>
        </span>
        <i class="m-wap-folder-delete" slot="right" v-show="n.user_file!=0" @click.stop="delFile(n.id)"></i>
        <!--<yd-icon slot="right" name="delete" color="#FF685D" v-show="n.user_file!=0" @click.native="delFile(n.id)"></yd-icon>-->
      </yd-cell-item>
    </yd-cell-group>
    <yd-tabbar slot="tabbar" style="padding: 0;z-index: 998" v-show="wapFunType==1&&showUpdataBtn">
      <!--<yd-tabbar slot="tabbar" style="padding: 0;z-index: 998" v-show="false">-->
      <yd-button bgcolor="#1791ff" color="#FFF" size="large" shape="angle" style="margin: 0" v-text="'上传文件'" @click.native="showMiddle=true"></yd-button>
    </yd-tabbar>
    <yd-backtop></yd-backtop>
    <yd-popup v-model="showRight" position="right" class="f-popup-view" width="100%">
      <yd-navbar slot="top" title="查看">
        <div slot="left" @click.stop="cencel">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <iframe :src='srcPath' width='100%' height='100%' frameborder='1'></iframe>
    </yd-popup>

    <yd-popup v-model="showMiddle" position="center" class="f-popup-view" width="90%" :close-on-masker="false">
      <div class="m-wap-upload-view" style="background-color:#fff;">
        <h2>上传文件</h2>
        <div class="m-wap-upload-radio">
          <p><yd-icon name="xiazai" size=".4rem" color="#999" custom></yd-icon><span>下载设置</span></p>
          <yd-radio-group v-model="downType" color="#1791ff">
            <yd-radio val="1">可下载到U盘</yd-radio>
            <yd-radio val="0">不可下载</yd-radio>
          </yd-radio-group>
        </div>
        <div class="m-wap-upload-radio">
          <p><yd-icon name="suoding" size=".4rem" color="#999" custom></yd-icon><span>私有模式</span></p>
          <yd-radio-group v-model="watchType" color="#1791ff">
            <yd-radio val="1">仅上传者能查看</yd-radio>
            <yd-radio val="0">所有人可查看</yd-radio>
          </yd-radio-group>
        </div>
        <div class="m-wap-upload-footer">
          <div class="fl" @click.stop="showMiddle=false">取消</div>
          <div class="fr">
            <input type="file" name="file" @change="getFileVal($event)">
            <span>下一步</span>
          </div>
        </div>
      </div>
    </yd-popup>

    <div class="f-wap-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else>暂无更多数据</span>
    </div>
  </yd-layout>
</template>
<script>
  import { fileType , upload_url } from '@/utils/utils'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  export default{
    data(){
      return {
        showType:'1',
        folderNameTxt:'',
        topicNameTxt:'',
        did:'',
        fid:'',
        fileType:'',
        page:1,
        topicList:[],
        busy:true,
        fileType:'',
        srcPath:'',
        showRight:false,
        o_fid:'',
        o_f_name:'',
        is_ad:sessionStorage.getItem('adType')==null?false:true,
        showMiddle:false,
        downType:'0',
        watchType:'0',
        file:'',
        showUpdataBtn:true,
        fileLimit:'',
        fileMax:'',
        fileCount:'',
        is_device:'0'
      }
    },
    computed: {
      ...mapState(["wapFunType","mid"])
    },
    mounted(){
      var _self = this;
      _self.folderNameTxt = _self.$route.query.f_name
      _self.fid = _self.$route.query.id
      _self.showType = _self.$route.query.type
    if(sessionStorage.getItem('adType')!=null){
      _self.is_device = sessionStorage.getItem('adType')
    }
      if(_self.showType==1){
        _self.did = _self.$route.query.did
        _self.fileType = 'datum'
      }else{
        _self.o_f_name = _self.$route.query.o_f_name
        _self.o_fid = _self.$route.query.o_fid
        _self.fileType = 'stmpfile'
        _self.did = 0
      }
    _self.getfile()
    _self.getShowUpdata()
    },
    methods: {
      getType(name){
        var file = fileType(name,2)
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
          type: _self.fileType,
          file_id:_self.fid,
          pagesize:10,
          page:_self.page
        }).then(result=>{
          let res = result.data;
        _self.fileCount = result.file_count
        _self.fileMax = result.file_max
        if(result.msg=='success'){
          if(flag){
            _self.topicList = _self.topicList.concat(res.data)
            if(res.total<_self.page*10){
              _self.busy=true
            }else{
              _self.busy=false
            }
          }else{
            _self.topicList = res.data
            _self.busy=false
          }
        }else{
          _self.topicList = []
        }
      })
      },
      loadMore(){
        let _self = this;
        setTimeout(() => {
          _self.page++;
          _self.getfile(true)
        }, 500);
      },
      back(){
        var _self = this;
        if(_self.showType==1){
          _self.$router.push({path:'/wap/topicFolderList',query: {type: _self.showType,did:_self.did}})
        }else{
          _self.$router.push({path:'/wap/stmpFileFolder',query:{fid:_self.o_fid,f_name:_self.o_f_name,type:_self.showType}})
        }

      },
      cencel:function(){
        var _self = this;
        _self.srcPath = ''
        _self.showRight = false
      },
      openView(path,data,is_down) {
        var _self = this;
        if(_self.getType(data.filename) == 'f-wap-na-icon'){
          _self.$dialog.toast({
            mes: '格式不支持！',
            timeout: 1500
          });
        }else{
          if(sessionStorage.getItem('adType')!=null){
            if(data.filepathex==''){
              window.location.href = 'wzh://itc?id='+data.id+'&down='+is_down+'&path='+data.filepath+'&name='+data.filename
            }else{
              window.location.href = 'wzh://itc?id='+data.id+'&down='+is_down+'&path='+data.filepathex+'&name='+data.filename
            }
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
      },
      getFileVal(event) {
        var _self = this;

        if((_self.fileMax - _self.fileCount)==parseInt(0)){
          if(_self.showType==1){
            _self.$dialog.toast({
              mes: '会议议题总数最多不得超过'+_self.fileMax+' 个文件',
              timeout: 1500,
              icon: 'error'
            });
          }else{
            _self.$dialog.toast({
              mes: '临时资料总数最多不得超过'+_self.fileMax+' 个文件',
              timeout: 1500,
              icon: 'error'
            });
          }
        }else{
          _self.file = event.target.files[0];
          if(_self.file.size>(100*1024*1024)){
            _self.$dialog.toast({
              mes: '文件超出限制大小(限制：100M)',
              timeout: 1500,
              icon: 'error'
            });
          }else if(typeof _self.file!='undefined'){
            _self.getFileSubmit()
          }
        }
      },
      getFileSubmit(){
        var _self = this;
        event.preventDefault();
        var formData = new FormData();
        formData.append('mid', _self.mid);
        formData.append('file', _self.file);
        $.ajax({
          url:upload_url,
          dataType:'json',
          type:'POST',
          async: false,
          data: formData,
          processData : false, // 使数据不做处理
          contentType : false, // 不要设置Content-Type请求头
          success: function(data){
            console.log(data);
            var arr = [];

            if (data.msg == 'success') {
              _self.$dialog.loading.open('正在上传...');
              arr.push(data.fid)
              if(_self.showType==1){
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
                _self.showMiddle=false
                if(result.msg=='success'){
                  _self.$dialog.loading.close();
                  setTimeout(function(){
                    _self.$dialog.toast({
                      mes: result.message,
                      timeout: 1500,
                      icon: 'success'
                    });
                  },100)
                  _self.page=_self.page-1
                  _self.getfile()
                }else{
                  _self.$dialog.loading.close();
                  setTimeout(function() {
                    _self.$dialog.toast({
                      mes: result.message,
                      timeout: 1500,
                      icon: 'error'
                    });
                  },100)
                }
              })
              }else{
                var parems = {
                  mid:_self.mid,
                  parent_id:_self.fid,
                  files:arr,
                  is_secret:_self.watchType,
                  allow_download:_self.downType
                }
                _self.$post('/wap/meeting/upload_files',parems).then(result=>{
                  let res = result;
                console.log(res)
                _self.showMiddle=false
                if(result.msg=='success'){
                  _self.$dialog.loading.close();
                  setTimeout(function(){
                    _self.$dialog.toast({
                      mes: result.message,
                      timeout: 1500,
                      icon: 'success'
                    });
                  },100)
                  _self.page=_self.page-1
                  _self.getfile()
                }else{
                  _self.$dialog.loading.close();
                  setTimeout(function() {
                    _self.$dialog.toast({
                      mes: result.message,
                      timeout: 1500,
                      icon: 'error'
                    });
                  },100)
                }
              })
              }
            }
          },
          error:function(response){
            console.log(response);
          }
        });
      },
      delFile(id){
        var _self = this;

        _self.$dialog.confirm({
            title: '删除',
            mes: '确定删除选中项?',
            opts: () => {
            if(_self.showType==1){
          var  parems = {
            type:2,
            id:id,
            datum_id:_self.did
          }
          _self.$post('/wap/meeting/del_datum_file',parems).then(result=>{
            let res = result;
          if(result.msg=='success'){
            _self.$dialog.loading.close();
            setTimeout(function(){
              _self.$dialog.toast({
                mes: result.message,
                timeout: 1500,
                icon: 'success'
              });
            },100)
            _self.page=1
            _self.getfile()
          }else{
            _self.$dialog.loading.close();
            setTimeout(function() {
              _self.$dialog.toast({
                mes: result.message,
                timeout: 1500,
                icon: 'error'
              });
            },100)
          }
        })
        }else{
          var arr = [];
          arr.push(id)
          var  parems = {
            meeting_id:_self.mid,
            file_id:arr
          }
          _self.$post('/wap/meeting/del_files',parems).then(result=>{
            let res = result;
          if(result.msg=='success'){
            _self.$dialog.loading.close();
            setTimeout(function(){
              _self.$dialog.toast({
                mes: result.message,
                timeout: 1500,
                icon: 'success'
              });
            },100)
            _self.page=1
            _self.getfile()
          }else{
            _self.$dialog.loading.close();
            setTimeout(function(){
              _self.$dialog.toast({
                mes: result.message,
                timeout: 1500,
                icon: 'success'
              });
            },100)
          }
        })
        }
            }
        })





      }

    }
  }
</script>
<style>
  .m-wap-folder-list-hd{
    padding:0.2rem 0.5rem;
    background-color: #fff;
    margin-bottom: 0;
  }
  .m-wap-folder-list-hd .yd-cell-item,
  .m-wap-folder-list-hd .yd-cell-right,
  .m-wap-folder-list-bd .yd-cell-right{
    padding: 0;
  }
  .m-wap-folder-list-hd .yd-cell-left,
  .m-wap-folder-list-bd .yd-cell-left{
    white-space: normal;
  }
  .m-wap-folder-list-hd h2{
    font-family: MicrosoftYaHei;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0px;
    color: #333333;
  }
  .m-wap-folder-list-hd .yd-cell-left p{
    font-family: MicrosoftYaHei;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    line-height: 0.44rem;
  }
  .m-wap-folder-list-hd .yd-cell-left p.f-ex{
    margin: 0.2rem 0;
  }
  .m-wap-folder-list-hd .yd-cell-left p span:nth-of-type(1){
    width: 1.48rem;
    text-align: right;
  }

  .m-wap-folder-list-bd{
    padding: 0.2rem;
  }
  .m-wap-folder-list-bd .yd-cell{
    background-color: transparent;
  }
  .m-wap-folder-list-bd .yd-cell-item{
    padding:0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .m-wap-folder-list-bd i{
    display: inline-block;
  }
  .m-wap-folder-list-bd .yd-cell-left{
    line-height: 0.48rem;
    font-size: 0.28rem;
  }
  .m-wap-folder-list-bd .yd-cell-left span.f-ex{
    width: 4rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-wap-folder-list-bd .yd-cell-left em{
    font-size: 0.24rem;
    padding: 0.06rem 0.1rem;
    border-radius: 5px;
    color: #666;
    margin-right: 0.2rem;
  }
  .f-bc-blue{
    background-color: #9fd6fd;
  }
  .f-bc-yellow{
    background-color: #ffff00;
  }
  .m-wap-upload-view{
    overflow: hidden;
    border-radius: 5px;
  }
  .m-wap-upload-view h2{
    font-size: 0.36rem;
    text-align: center;
    padding:0.4rem 0;
  }
  .m-wap-upload-radio{
    padding:0 0.28rem 0.4rem;
  }
  .m-wap-upload-radio p{
    font-size:0.32rem ;
    line-height: 0.48rem;
    overflow: hidden;
    margin-bottom: 0.2rem;
  }
  .m-wap-upload-radio p i,
  .m-wap-upload-radio p span{
    float: left;
    color: #999;
    margin-right: 0.12rem;
  }
  .m-wap-upload-radio .yd-radio-text{
    font-size: 0.32rem
  }
  .m-wap-upload-footer{
    overflow: hidden;
    border-top: 1px solid #ddd;
  }
  .m-wap-upload-footer div{
    height: 1rem !important;
    line-height: 1rem !important;
    text-align: center;
    width: 50%;
    font-size: 0.32rem;
    color: #666;
    box-sizing: border-box;
  }
  .m-wap-upload-footer div.fr{
    color: #1792FF;
    border-left: 1px solid #ddd;
    position: relative;
  }
  .m-wap-upload-footer div.fr input{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .m-wap-folder-list-bd .yd-cell-right{
    z-index: 99;
  }
  .m-wap-folder-list-bd .f-is-del .yd-cell-right{
    display: none;
  }
  .m-wap-folder-list-bd .yd-cell-right i.m-wap-folder-delete{
    margin-left: 0.2rem;
  }
  .m-wap-folder-list-bd .f-is-del .yd-cell-left{
    width: 100%;
  }
</style>
