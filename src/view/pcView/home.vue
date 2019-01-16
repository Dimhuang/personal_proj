<template>
  <el-container class="m-content">
      <m-header></m-header>
      <m-body>
        <div class="m-main-nav">
          <div class="f-view-width">
            <img src="../../assets/img/banner.png">
            <div class="m-main-nav-tabbar">
              <div class="f-flex-content">
                <span class="f-flex-item" @click="indexActive=1" :class="{'f-active':indexActive==1}">
                  <i class="iconfont pl-icon_lshy_n"></i>
                  <p>历史会议</p>
                </span>
                <span class="f-flex-item" @click="indexActive=2" :class="{'f-active':indexActive==2}">
                  <i class="iconfont pl-icon_hylb_n"></i>
                  <p>会议列表</p>
                </span>
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
                      <em :class="{'f-visibility':items.is_secrect==0}">保密会议，需向管理员申请权限</em><!---->
                      <h2 v-text="items.name"></h2>
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
                      <span class="fl"><span v-text="'时间:'"></span><span v-text="items.start_time"></span></span>
                      <span class="fr"><span v-text="'主持人:'"></span><span v-text="items.moderator"></span></span>
                    </p>
                    <p><span v-text="'会议室:'"></span><span v-text="items.room_name"></span></p>
                  </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="f-load-box" v-infinite-scroll="loadMoreHis" infinite-scroll-disabled="hisBusy" infinite-scroll-distance="30">
            <i class="el-icon-loading" v-if="!hisBusy"></i>
            <span v-else>暂无更多数据</span>
          </div>

        </div>
        <!--会议列表-->
        <div class="f-view-width m-main-nav-list" v-show="indexActive==2">
          <el-row :gutter="12">
            <el-col :span="8" v-for="(items, index) in metList" :key="index" @click.native="goMeeting(items.id)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="m-main-nav-list-hd">
                  <div class="m-main-nav-list-hd-content">
                    <em></em>
                    <i class="f-restart-ico" v-if="items.status==0">未开始</i>
                    <i class="f-load-ico" v-else>进行中</i>
                    <h2 v-text="items.name"></h2>
                  </div>
                </div>
                <div class="m-main-nav-list-bd">
                  <p>
                    <span class="fl"><span v-text="'时间:'"></span><span v-text="items.start_time"></span></span>
                    <span class="fr"><span v-text="'主持人:'"></span><span v-text="items.moderator"></span></span>
                  </p>
                  <p><span v-text="'会议室:'"></span><span v-text="items.room_name"></span></p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="f-load-box" v-infinite-scroll="loadMoreMet" infinite-scroll-disabled="metBusy" infinite-scroll-distance="30">
            <i class="el-icon-loading" v-if="!metBusy"></i>
            <span v-else>暂无更多数据</span>
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
              metPage:1
            }
        },
        created(){
          //获取链接参数
         /* getRequest((item)=>{
            console.log(item.id)
          })*/

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
        },
        methods:{
          getHistorytList(flag){
            this.$fetch('/wap/meeting/data',{
              status:2,
              pagisize:9,
              page:this.hisPage
            }).then(result=>{
              let res = result.data;
              if(result.msg=='success'){
                if(flag){
                  this.hisList = this.hisList.concat(res.data)
                  if(res.total<this.hisPage*9){
                    this.hisBusy=true
                  }else{
                    this.hisBusy=false
                  }
                }else{
                  this.hisList = res.data
                  this.hisBusy=false
                }
              }else{
                this.hisList = []
              }
            })
          },
          loadMoreHis(){
            this.hisBusy = true;
            setTimeout(() => {
              this.hisPage++;
              this.getHistorytList(true)
            }, 500);
          },

          getMeetingList(flag){
            this.$fetch('/wap/meeting/data',{
              status:"0,1",
              pagisize:9,
              page:this.metPage
            }).then(result=>{
            let res = result.data;
            if(result.msg=='success'){
              if(flag){
                this.metList = this.metList.concat(res.data)
                if(res.total<this.metPage*9){
                  this.metBusy=true
                }else{
                  this.metBusy=false
                }
              }else{
                this.metList = res.data
                this.metBusy=false
              }
            }else{
              this.metList = []
            }
          })
          },
          loadMoreMet(){
            this.metBusy = true;
            setTimeout(() => {
              this.metPage++;
            this.getMeetingList(true)
          }, 500);
          },
          goHistory(id,secrect){
            if(secrect==1){
              this.$message('保密会议，需向管理员申请权限');
            }else{
              this.$router.push({path:'/list/historyList',query:{mid:id}})
            }
          },
          goMeeting(id){
            this.$router.push({path:'/list/meetingList',query:{mid:id}})
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
    left:20px;
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

  .f-visibility{
    visibility: hidden;
  }
</style>
