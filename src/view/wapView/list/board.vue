<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="批注白板">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <div class="m-board-view" v-if="is_ad">
      <yd-tab active-color="#1792ff">
        <yd-tab-panel label="文档批注" :badge="fileNum">
          <div class="m-board-view-bd">
            <yd-cell-group>
              <yd-cell-item v-for="(n,index) in docList" :key="index" :class="{'f-is-del':is_device!=2}">
                <i :class="getType(n.filename)" slot="icon" @click.stop="openView(n.filepath,n,0)"></i>
                <span class="f-ex" slot="left" v-text="n.filename"  @click.stop="openView(n.filepath,n,0)"></span>
                <i class="m-wap-folder-download" slot="right"  @click.stop="openView(n.filepath,n,1)" v-show="is_device==2"></i>
                <!--<yd-icon slot="right" name="download" color="#1792FF" @click.native="openView(n.filepath,n,1)" ></yd-icon>-->
              </yd-cell-item>
            </yd-cell-group>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreDoc" infinite-scroll-disabled="docBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!docBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="手写批注" :badge="handNum">
          <div class="m-board-view-bd">
            <yd-cell-group>
              <yd-cell-item v-for="(n,index) in handList" :key="index" :class="{'f-is-del':is_device!=2}">
                <i :class="getType(n.filename)" slot="icon" @click.stop="openView(n.filepath,n,0)"></i>
                <span class="f-ex" slot="left" v-text="n.filename"  @click.stop="openView(n.filepath,n,0)"></span>
                <i class="m-wap-folder-download" slot="right"  v-show="is_device==2" @click.stop="openView(n.filepath,n,1)"></i>
                <!--<yd-icon slot="right" name="download" color="#1792FF" @click.native="openView(n.filepath,n,1)" ></yd-icon>-->
              </yd-cell-item>
            </yd-cell-group>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreHand" infinite-scroll-disabled="handBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!handBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="电子白板" :badge="elecNum">
          <div class="m-board-view-bd">
            <yd-cell-group>
              <yd-cell-item v-for="(n,index) in elecList" :key="index" :class="{'f-is-del':is_device!=2}">
                <i :class="getType(n.filename)" slot="icon" @click.stop="openView(n.filepath,n,0)"></i>
                <span class="f-ex" slot="left" v-text="n.filename"  @click.stop="openView(n.filepath,n,0)"></span>
                <i class="m-wap-folder-download" slot="right"  v-show="is_device==2" @click.stop="openView(n.filepath,n,1)"></i>
                <!--<yd-icon slot="right" name="download" color="#1792FF" @click.native="openView(n.filepath,n,1)" ></yd-icon>-->
              </yd-cell-item>
            </yd-cell-group>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreElec" infinite-scroll-disabled="elecBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!elecBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>
      <yd-popup v-model="showRight" position="right" class="f-popup-view" width="100%">
        <yd-navbar slot="top" title="查看">
          <div slot="left" @click.stop="cencel">
            <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
            <span>返回</span>
          </div>
        </yd-navbar>
        <iframe :src='srcPath' width='100%' height='100%' frameborder='1'></iframe>
      </yd-popup>
    </div>
    <div class="m-board-view" v-else>
      <yd-tab active-color="#1792ff">
        <yd-tab-panel label="文档批注" :badge="fileNum">
          <div class="m-board-view-bd">
            <yd-cell-group>
              <yd-cell-item v-for="(n,index) in docList" :class="{'f-is-del':is_device!=2}" :key="index" @click.native="openView(n.filepath,n)">
                <i :class="getType(n.filename)" slot="icon"></i>
                <span slot="left" v-text="n.filename"></span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreDoc" infinite-scroll-disabled="docBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!docBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="手写批注" :badge="handNum">
          <div class="m-board-view-bd">
            <yd-lightbox :num="handList.length">
              <yd-grids-group :rows="2">
                <yd-grids-item v-for="item, key in handList">
                  <yd-lightbox-img slot="icon" :src="item.filepath" :key="key"></yd-lightbox-img>
                </yd-grids-item>
              </yd-grids-group>
            </yd-lightbox>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreHand" infinite-scroll-disabled="handBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!handBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="电子白板" :badge="elecNum">
          <div class="m-board-view-bd">
            <yd-lightbox :num="elecList.length">
              <yd-grids-group :rows="2">
                <yd-grids-item v-for="item, key in elecList">
                  <yd-lightbox-img slot="icon" :src="item.filepath" :key="key"></yd-lightbox-img>
                </yd-grids-item>
              </yd-grids-group>
            </yd-lightbox>
            <yd-backtop></yd-backtop>
            <div class="f-wap-load-box" v-infinite-scroll="loadMoreElec" infinite-scroll-disabled="elecBusy" infinite-scroll-distance="30">
              <i class="el-icon-loading" v-if="!elecBusy"></i>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>
      <yd-popup v-model="showRight" position="right" class="f-popup-view" width="100%">
        <yd-navbar slot="top" title="查看">
          <div slot="left" @click.stop="cencel">
            <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
            <span>返回</span>
          </div>
        </yd-navbar>
        <iframe :src='srcPath' width='100%' height='100%' frameborder='1'></iframe>
      </yd-popup>
    </div>
  </yd-layout>
</template>
<script>
  import { fileType } from '@/utils/utils'
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
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
        srcPath:'',
        showRight:false,
        list: [
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
          {src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
        ],
        is_ad:sessionStorage.getItem('adType')==null?false:true,
        is_device:'0'
      }
    },
    computed: {
      ...mapState(["mid"])
  },
    mounted(){
      var _self = this;
    if(sessionStorage.getItem('adType')!=null){
      _self.is_device = sessionStorage.getItem('adType')
    }
    _self.getFileNum(5,()=>{
        _self.getDocFile()
      })
    _self.getFileNum("7,13",()=>{
      _self.getElecFile()
      })
    _self.getFileNum("11,12",()=>{
      _self.getHandFile()
      })
    },
    methods: {
      getType(name){
        var file = fileType(name,2)
        return file;
      },
      getFileNum(num,func){
        var _self = this;
        _self.$fetch('/wap/meeting/fileCount',{
          m_id:_self.mid,
          file_use:num
        }).then(result=>{
          let res = result.data;
        if(num == '5'){
          if(res.length==0){
            _self.fileNum = '0'
          }else{
            _self.fileNum = res[num].toString()
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
          pagesize:8,
          page:this.docPage
        }).then(result=>{
          let res = result.data;
        if(result.msg=='success'){
          if(flag){
            this.docList = this.docList.concat(res.data)
            if(res.total<this.docPage*8){
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
          pagesize:8,
          page:this.elecPage
        }).then(result=>{
          let res = result.data;
        if(result.msg=='success'){
          if(flag){
            this.elecList = this.elecList.concat(res.data)
            if(res.total<this.elecPage*8){
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
          pagesize:8,
          page:this.handPage
        }).then(result=>{
          let res = result.data;
        if(result.msg=='success'){
          if(flag){
            this.handList = this.handList.concat(res.data)
            if(res.total<this.handPage*8){
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
      back(){
        var _self = this;
        _self.$router.push({path:'/wap/functions'})
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
      }
    }
  }
</script>
<style>
  .m-board-view .yd-tab-nav-item{
    padding-top: 0.4rem;
  }
  .m-board-view .yd-tab-badge,
  .m-board-view .yd-tab-badge .yd-badge{
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.34rem;
    font-stretch: normal;
    letter-spacing: 1px;
    background-color: transparent !important;
    color: rgb(88, 88, 88) !important;
    transform: scale(1) !important;
    font-weight: 700!important;
  }
  .m-board-view .yd-tab-badge{
    text-align: center;
    display: inline-block;
    width: 100%;
    top:6px;
    left: 0;
  }
  .m-board-view .yd-tab-nav .yd-tab-active:before{
    height: 0;
  }

  .m-board-view .yd-tab-nav-item.yd-tab-active .yd-badge{
    color: #1792ff !important;
  }
  .m-board-view-bd{
    padding:0.3rem 0.2rem;
  }
  .m-board-view-bd .yd-cell-right{
    padding: 0;
  }
  .m-board-view-bd .yd-cell-left{
    white-space: normal;
    line-height: 0.48rem;
    font-size: 0.28rem;
  }
  .m-board-view-bd .yd-cell{
    background-color: transparent;
  }
  .m-board-view-bd .yd-cell-item{
    padding:0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .m-board-view-bd i{
    display: inline-block;
  }
  .m-board-view-bd .yd-grids-2{
    background-color: transparent;
  }
  .m-board-view-bd .yd-grids-item{
    padding:0;
    margin-bottom: 0.2rem;
  }
  .m-board-view-bd .yd-grids-item:nth-of-type(2n-1){
    padding-right:0.1rem;
  }
  .m-board-view-bd .yd-grids-item:nth-of-type(2n){
    padding-left:0.1rem;
  }
  .m-board-view-bd .yd-grids-icon{
    height: 2.4rem;
    padding: 0.1rem;
    background-color: #fff;
    overflow: hidden;
  }


  .m-board-view-bd .yd-grids-icon img{
    height: 100%;
  }


  .m-board-view-bd .f-is-del .yd-cell-left{
    width: 100%;
  }

  .m-board-view-bd .yd-cell-left span.f-ex{
    width: 4.8rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .m-board-view-bd .f-is-del .yd-cell-right{
    display: none;
  }
  .m-wap-folder-list-bd .f-is-del .yd-cell-left{
    width: 100%;
  }
  .m-wap-folder-list-bd .f-is-del .yd-cell-left span.f-ex{
    width: 100%;
  }
  .m-wap-folder-list-bd .f-is-del .yd-cell-left span.yd-cell-icon+span{
    width: 100%;
    display:inline-block;
    overflow:hidden;
    text-overflow: ellipsis;
  }
</style>
