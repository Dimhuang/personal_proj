<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="folderNameTxt">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <yd-cell-group class="m-wap-folder-list-bd">
      <yd-cell-item v-for="(n,index) in topicList" :key="index">
        <i  :class="getType(items.filename)" slot="icon"></i>
        <span slot="left" v-text="n.filename"></span>
      </yd-cell-item>
    </yd-cell-group>
    <div class="f-wap-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <i class="el-icon-loading" v-if="!busy"></i>
      <span v-else>暂无更多数据</span>
    </div>
  </yd-layout>
</template>
<script>
  import { fileType } from '@/utils/utils'
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
        fileType:''
      }
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
        _self.fileType = 'stmpfile'
        _self.did = 0
      }
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
        _self.$router.push({path:'/wap/topicFolderList',query: {type: _self.showType}})
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
