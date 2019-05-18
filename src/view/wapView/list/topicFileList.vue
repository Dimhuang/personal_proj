<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="folderNameTxt">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <yd-cell-group class="m-wap-folder-list-bd">
      <yd-cell-item v-for="(n,index) in topicList" :key="index" @click.native="openView(n.filepath,n)">
       <!-- <yd-lightbox slot="left" class="f-wap-img-hide-view" v-if="getType(n.filepath)=='f-wap-png-icon'||getType(n.filepath)=='f-wap-jpg-icon'">
          <yd-lightbox-img :src="n.filepath"></yd-lightbox-img>
        </yd-lightbox>-->
        <i :class="getType(n.filename)" slot="icon"></i>
        <span slot="left" v-text="n.filename"></span>
      </yd-cell-item>
    </yd-cell-group>
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
    <div class="f-wap-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else>暂无更多数据</span>
    </div>
  </yd-layout>
</template>
<script>
  import { fileType } from '@/utils/utils'
  import {mapState} from 'vuex'
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
        o_f_name:''
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
    },
    methods: {
      getType(name){
        var file = fileType(name,2)
        return file;
      },
      getfile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type: this.fileType,
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
        setTimeout(() => {
          this.page++;
          this.getfile(true)
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
      openView(path,data) {
        var _self = this;
        if(_self.getType(data.filename) == 'f-wap-na-icon'){
          _self.$dialog.toast({
            mes: '格式不支持！',
            timeout: 1500
          });
        }else{
          if(data.filepathex==''){
            window.location.href = 'wzh://itc?id='+data.id+'&path='+data.filepath
          }else{
            window.location.href = 'wzh://itc?id='+data.id+'&path='+data.filepathex
          }
        }
        return
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
</style>
