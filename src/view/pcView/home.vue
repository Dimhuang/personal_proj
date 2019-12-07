<template>
  <el-container class="m-content">
      <m-header></m-header>
      <m-body>
        <div class="m-main-nav">
          <div class="f-view-width">
            <img src="@/assets/img/banner_ch.png" v-if="is_ch">
            <img src="@/assets/img/banner_en.png" v-else>
            <div class="m-main-nav-tabbar" :class="{'f-is-kehu':is_kehu}">
              <div class="f-flex-content">
                <span class="f-flex-item" @click="indexActive=1" :class="{'f-active':indexActive==1}">
                  <i class="iconfont pl-icon_lshy_n"></i>
                  <p v-text="$lang.index.title.his"></p>
                </span>
                <!--<span class="f-flex-item" @click="indexActive=2" :class="{'f-active':indexActive==2}" v-if="!is_kehu">-->
                <span class="f-flex-item" @click="indexActive=2" :class="{'f-active':indexActive==2}">
                  <i class="iconfont pl-icon_hylb_n"></i>
                  <p v-text="$lang.index.title.meet"></p>
                </span>
              </div>
              <div class="m-main-nav-btn">
                <el-button type="primary" round @click.native="refreshList()" v-text="$lang.index.tips.refresh"></el-button>
              </div>
            </div>
          </div>
        </div>
        <!--历史会议-->
        <div class="f-view-width m-main-nav-list" v-show="indexActive==1">
          <el-row :gutter="12">
            <el-col :span="8" v-for="(items, index) in hisList" :key="index" @click.native="goHistory(items.id,items.is_secrect)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="m-main-nav-list-hd">
                    <div class="m-main-nav-list-hd-content">
                      <em :class="{'f-visibility':items.is_secrect==0}" v-text="$lang.index.title.weight_tips"></em><!---->
                      <h2 v-html="items.name.replace(/\s/g,'&nbsp;')"></h2>
                      <div class="f-flex-content">
                       <!-- <span class="f-flex-item">
                          <b v-text="items.datum_count"></b>
                          <p>议题</p>
                        </span>
                        <span class="f-flex-item">
                           <b v-text="items.stmpfile_count"></b>
                          <p>资料</p>
                        </span>
                        <span class="f-flex-item">
                           <b v-text="items.annotation_count"></b>
                          <p>批注</p>
                        </span>
                        <span class="f-flex-item">
                           <b v-text="items.whiteboard_count"></b>
                          <p>白板</p>
                        </span>-->
                      </div>
                    </div>
                  </div>
                  <div class="m-main-nav-list-bd">
                    <p>
                      <span class="fl"><span v-text="$lang.index.title.time+':'"></span><span v-text="items.start_time"></span></span>
                      <span class="fr"><span v-text="$lang.index.title.host+':'"></span><span class="f-width-1" v-text="items.moderator"></span></span>
                    </p>
                    <p><span class="fl"><span v-text="$lang.index.title.room+':'"></span><span class="f-width-2" v-text="items.room_name"></span></span></p>
                  </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="f-load-box" v-infinite-scroll="loadMoreHis" infinite-scroll-disabled="hisBusy" infinite-scroll-distance="30">
            <i class="el-icon-loading" v-if="!hisBusy"></i>
            <span v-else v-text="$lang.tips.no_data"></span>
          </div>

        </div>
        <!--会议列表-->
        <div class="f-view-width m-main-nav-list" v-show="indexActive==2">
          <el-row :gutter="12">
            <el-col :span="8" v-for="(items, index) in metList" :key="index" @click.native="goMeeting(items.id,items.is_secrect)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="m-main-nav-list-hd">
                  <div class="m-main-nav-list-hd-content">
                    <em :class="{'f-visibility':items.is_secrect==0}" v-text="$lang.index.title.weight_tips"></em>
                    <i class="f-restart-ico" v-if="items.status==0" v-text="$lang.index.status.not_start"></i>
                    <i class="f-load-ico" v-else v-text="$lang.index.status.start"></i>
                    <h2 v-html="items.name.replace(/\s/g,'&nbsp;')"></h2>
                  </div>
                </div>
                <div class="m-main-nav-list-bd">
                  <p>
                    <span class="fl"><span v-text="$lang.index.title.time+':'"></span><span v-text="items.start_time"></span></span>
                    <span class="fr"><span v-text="$lang.index.title.host+':'"></span><span class="f-width-1" v-text="items.moderator"></span></span>
                  </p>
                  <p><span v-text="$lang.index.title.room+':'"></span><span class="f-width-2" v-text="items.room_name"></span></p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="f-load-box" v-infinite-scroll="loadMoreMet" infinite-scroll-disabled="metBusy" infinite-scroll-distance="30">
            <i class="el-icon-loading" v-if="!metBusy"></i>
            <span v-else v-text="$lang.tips.no_data"></span>
          </div>
        </div>
      </m-body>
  </el-container>



</template>

<script>
  import mHeader from '@/components/header.vue'
  import mBody from '@/components/body.vue'
  import '@/assets/css/pcScrollBar.css'
  import { getRequest } from '@/utils/utils'
    export default{
        data(){
            return{
              hisList:[],
              metList:[],
              indexActive:'1',
              hisBusy:true,
              metBusy:true,
              hisPage:1,
              metPage:1,
              is_kehu:false,
              is_ch:true
            }
        },
        created(){
          //获取链接参数
         /* getRequest((item)=>{
            console.log(item.id)
          })*/
          sessionStorage.removeItem('meetType')
          this.is_ch = sessionStorage.getItem('lang') == 'chinese'?true:false;


          console.log('pic='+this.is_ch)
          if((sessionStorage.getItem('objName')!=null)&&(sessionStorage.getItem('objPwd')!=null)){
            var noPw = '';
            console.log(sessionStorage.getItem('objName'))
            console.log(sessionStorage.getItem('objPwd'))
            if(sessionStorage.getItem('objPwd') == ''){
              noPw=1
            }else{
              noPw=0
            }
            this.$post('/wap/User/login',{
              account:sessionStorage.getItem('objName'),
              password:sessionStorage.getItem('objPwd'),
              density_free:noPw
            }).then(result=>{
                sessionStorage.setItem('accessToken' , true)
                sessionStorage.removeItem('keepMid')
                this.getHistorytList()
                this.getMeetingList()
            })
          }else{
            if(sessionStorage.getItem('keepMid')!=null){
              sessionStorage.removeItem('keepMid')
            }
            this.getHistorytList()
            this.getMeetingList()
          }
          console.log('jsObj：'+typeof jsObj)
          console.log('qt：'+typeof qt)
          if(typeof jsObj !== "undefined"){
            this.is_kehu = true
          }else if(typeof qt !== "undefined"){
            this.is_kehu = true
          }else{
            this.is_kehu = false
          }
          console.log('showl：'+this.is_kehu)
        },
        methods:{
          refreshList(){
            this.hisPage = 1
            this.metPage = 1
            this.getHistorytList(false)
            this.getMeetingList(false)
          },
          getHistorytList(flag){
            this.$fetch('/wap/meeting/data',{
              status:2,
              pagesize:9,
              page:this.hisPage
            }).then(result=>{
              let res = result.data;
              if(result.msg=='success'){
                if(flag){
                  this.hisList = this.hisList.concat(res)
                  if(res.total<this.hisPage*9){
                    this.hisBusy=true
                  }else{
                    this.hisBusy=false
                  }
                }else{
                  if(res.length==0){
                    this.hisList = res
                    this.hisBusy=true
                  }else{
                    this.hisList = res
                    this.hisBusy=false
                  }
                }
              }else{
                this.hisList = []
              }
            })
          },
          loadMoreHis(){
            this.hisBusy = true;
            /*setTimeout(() => {
              this.hisPage++;
              this.getHistorytList(true)
            }, 500);*/
          },

          getMeetingList(flag){
            this.$fetch('/wap/meeting/data',{
              status:"0,1",
              pagesize:9,
              page:this.metPage
            }).then(result=>{
            let res = result.data;
            if(result.msg=='success'){
              if(flag){
                this.metList = this.metList.concat(res)
                if(res.total<this.metPage*9){
                  this.metBusy=true
                }else{
                  this.metBusy=false
                }
              }else{
                if(res.length==0){
                  this.metList = res
                  this.metBusy=true
                }else{
                  this.metList = res
                  this.metBusy=false
                }
              }
            }else{
              this.metList = []
            }
          })
          },
          loadMoreMet(){
            this.metBusy = true;
           /* setTimeout(() => {
              this.metPage++;
            this.getMeetingList(true)
          }, 500);*/
          },
          goHistory(id,secrect){
            if(secrect==1){
              this.$message(this.$lang.index.title.weight_tips);
            }else{
              sessionStorage.setItem('meetType',1)
              this.$router.push({path:'/list/historyList',query:{mid:id}})
            }
          },
          goMeeting(id,secrect){
            if(secrect==1){
              this.$message(this.$lang.index.title.weight_tips);
            }else{
              sessionStorage.setItem('meetType',2)
              this.$router.push({path:'/list/meetingList',query:{mid:id}})
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
  .m-main-nav{
    background-color: #fff;
    padding-top: 15px;
    overflow: hidden;
  }
  .m-main-nav img{
    width: 100%;
    vertical-align: middle;
  }
  .m-main-nav-tabbar{
      padding: 20px 25% 5px;
      position: relative;
  }
  .m-main-nav-tabbar:after{
    content:'';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1px;
    margin-top: -15px;
    width: 2px;
    height: 30px;
    background-color: #dddddd;

  }
  .m-main-nav-tabbar.f-is-kehu:after{
    content:'';
    width: 0;

  }

  .m-main-nav-tabbar .f-flex-content{
    text-align: center;
  }
  .m-main-nav-tabbar .f-flex-item{
    color: #999;
    cursor: pointer;
  }
  .m-main-nav-tabbar .f-flex-item.f-active{
    color: #1792ff;
  }
  .m-main-nav-tabbar .f-flex-item i{
    font-size: 28px;
  }
  .m-main-nav-tabbar .f-flex-item p{
    font-size: 18px;
    margin-top: 8px;
  }
  .m-main-nav-list{
    padding-bottom: 20px;
  }
  .m-main-nav-list .el-card__body{
    border-radius: 8px;
  }
  .m-main-nav-list .el-col{
    margin-top: 20px;
    cursor: pointer;
  }
  .m-main-nav-list-hd{
    height: 130px;
    background: url("../../assets/img/meeting_bg.jpg") no-repeat;
    background-size: 100%;
    position: relative;
  }
  .m-main-nav-list-hd:after{
    content: '';
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 130px;
    background-color: rgba(0,0,0,0.4);
  }
  .m-main-nav-list-hd{
    color: #fff;
  }
  .m-main-nav-list-hd-content{
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    padding:0 20px;
    box-sizing: border-box;
  }
  .m-main-nav-list-hd-content em{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #f36323;
    margin-top:7px;
    margin-bottom: 7px;
    position: relative;
    background-color: rgba(0,0,0,0.3);
  }
  .m-main-nav-list-hd-content i{
    position: absolute;
    top: 0;
    left:5px;
    width: 46px;
    height: 34px;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
  }
  .m-main-nav-list-hd-content i.f-restart-ico{
    background: url("../../assets/img/hy_wks_n.png") no-repeat;
    background-size: 46px auto;
  }
  .m-main-nav-list-hd-content i.f-load-ico{
    background: url("../../assets/img/hy_jxz_n.png") no-repeat;
    background-size: 46px auto;
  }
  .m-main-nav-list-hd-content h2{
    font-size: 16px;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    -webkit-box-align:center;
    -webkit-box-pack:center;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
  　　-webkit-box-orient: vertical;
    /*autoprefixer: on */
  }
  .m-main-nav-list-hd-content .f-flex-content{
      margin-top: 10px;
  }
  .m-main-nav-list-hd-content .f-flex-item{
    position: relative;
    overflow: hidden;
  }
  .m-main-nav-list-hd-content .f-flex-item:not(:nth-last-of-type(1)):after{
    content:'';
    position: absolute;
    right: 1px;
    top: 50%;
    margin-top: -10px;
    width: 1px;
    height: 20px;
    background-color: #dddddd;
  }
  .m-main-nav-list-bd{
    color: #666;
    font-size: 14px;
    padding: 10px;
    overflow: hidden;
  }
  .m-main-nav-list-bd p:nth-of-type(2){
    padding-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
    width: 100%;
    position: relative;
  }
  .m-main-nav-list-bd span.f-width-1{
    width: 80px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
  }
  .m-main-nav-list-bd span.f-width-2{
    width: 195px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
  }
  .f-visibility{
    visibility: hidden;
  }
  .m-main-nav-btn{
    position: absolute;
    right: 0;
    top:20px;
  }
</style>
