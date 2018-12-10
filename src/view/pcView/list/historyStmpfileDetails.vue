<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item @click.native="goMain">临时资料</el-breadcrumb-item>
      <el-breadcrumb-item>{{folderNameTxt}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul>
      <li class="m-history-topics-list f-flex-content"  v-for="items in topicList">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="fl" :class="getType(items.filename)"></div>
          <div class="f-ellipsis" v-text="items.filename"></div>
        </div>
        <div class="m-history-list-r">
          <el-button size="mini" round  @click.native="openView(items.filepath)">
           <!-- <span v-if="(getType(items.filepath)=='f-xls-icon'||getType(items.filepath)=='f-doc-icon'||getType(items.filepath)=='f-ppt-icon'||getType(items.filepath)=='f-na-icon')&&items.is_directory==0">下载</span>
            <span v-else>打开</span>-->
            <span>打开</span>
          </el-button>
          <img preview="4" :src="items.filepath" class="f-hide-img" v-if="getType(items.filepath)=='f-png-icon'||getType(items.filepath)=='f-jpg-icon'">
        </div>
      </li>
    </ul>
    <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else>暂无更多数据</span>
    </div>
  </div>
</template>
<script>
  import '@/assets/css/pcScrollBar.css'
  import {mapState} from 'vuex'
  import { fileType } from '@/utils/utils'
  export default{
    data(){
      return {
        folderNameTxt:'',
        topicList:[],
        page:1,
        busy:true,
        fid:'',
        srcPath:' '
      }
    },
    computed: {
      ...mapState(["mid"])
  },
    mounted(){
      this.folderNameTxt = this.$route.query.f_name
      this.fid = this.$route.query.id
      this.getfile()
    },
    methods:{
      getType(name){
        var file = fileType(name,1)
        return file;
      },
      getfile(flag){
        this.$fetch('/wap/meeting/files',{
          m_id:this.mid,
          type:'stmpfile',
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
      goMain(){
        this.$router.push({path:'/list/historyList/stmpfile',query:{'id':2}})
      },
      openView(path) {
        var _self = this;
        if (_self.getType(path) == 'f-pdf-icon'||_self.getType(path) == 'f-txt-icon'||_self.getType(path) == 'f-video-icon'||_self.getType(path) == 'f-mp3-icon') {
          _self.srcPath = path

          _self.$alert(" <iframe src='" + _self.srcPath + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
            dangerouslyUseHTMLString: true
          }).then(action => {
            _self.srcPath = ''
        }).catch(action => {
            _self.srcPath = ''
        });
        }else if(_self.getType(path) == 'f-png-icon'||_self.getType(path) == 'f-jpg-icon'){

        }else {
          /* _self.$alert(" <iframe src='https://view.officeapps.live.com/op/view.aspx?src=" + path + "' width='100%' height='100%' frameborder='1'></iframe>", '查看', {
           dangerouslyUseHTMLString: true
           });*/
          _self.srcPath = path
          window.location.href = _self.srcPath
        }
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
    width: 850px;
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
    line-height: 54px;
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
  .el-message-box{
    width: 90% !important;
  }
  .el-message-box__content,
  .el-message-box__message ,
  .el-message-box__message p{
    height: 600px;
  }
  .el-message-box__btns{
    padding-top: 22px;
  }
</style>
