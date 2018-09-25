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
            <el-col :span="8" v-for="(items, index) in 4" :key="index" @click.native="goHistory">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="m-main-nav-list-hd">
                    <div class="m-main-nav-list-hd-content">
                      <em>保密会议，需向管理员申请权限</em>
                      <h2>金湾区第七届人大常委会第22次会议</h2>
                      <div class="f-flex-content">
                        <span class="f-flex-item">
                          <i>15</i>
                          <p>议题</p>
                        </span>
                        <span class="f-flex-item">
                          <i>15</i>
                          <p>资料</p>
                        </span>
                        <span class="f-flex-item">
                          <i>15</i>
                          <p>批注</p>
                        </span>
                        <span class="f-flex-item">
                          <i>15</i>
                          <p>白板</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="m-main-nav-list-bd">
                    <p>
                      <span class="fl"><span v-text="'时间:'"></span><span v-text="'2018-07-30 13:00'"></span></span>
                      <span class="fr"><span v-text="'主持人:'"></span><span v-text="'啊飒飒'"></span></span>
                    </p>
                    <p><span v-text="'会议室:'"></span><span v-text="'啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话'"></span></p>
                  </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!--会议列表-->
        <div class="f-view-width m-main-nav-list" v-show="indexActive==2">
          <el-row :gutter="12">
            <el-col :span="8" v-for="(items, index) in 5" :key="index" @click.native="goMeeting">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="m-main-nav-list-hd">
                  <div class="m-main-nav-list-hd-content">
                    <em></em>
                    <i class="f-restart-ico" v-if="false">未开始</i>
                    <i class="f-load-ico" v-else>进行中</i>
                    <h2>金湾区第七届人大常委会第22次会议</h2>
                  </div>
                </div>
                <div class="m-main-nav-list-bd">
                  <p>
                    <span class="fl"><span v-text="'时间:'"></span><span v-text="'2018-07-30 13:00'"></span></span>
                    <span class="fr"><span v-text="'主持人:'"></span><span v-text="'啊飒飒'"></span></span>
                  </p>
                  <p><span v-text="'会议室:'"></span><span v-text="'啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话啥都会看见啊还是大家哈客家话'"></span></p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </m-body>
  </el-container>


</template>
<script>
  import mHeader from '@/components/header.vue'
  import mBody from '@/components/body.vue'
    export default{
        data(){
            return{
              msg:'hello vue',
              indexActive:'1'
            }
        },
        created(){

        },
        methods:{
          goHistory(){
            this.$router.push({name:'historyList'})
          },
          goMeeting(){
            this.$router.push({name:'meetingList'})
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
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .m-main-nav-list-hd-content .f-flex-content{
      margin-top: 10px;
  }
  .m-main-nav-list-hd-content .f-flex-item{
    position: relative;
    overflow: hidden;
  }
  .m-main-nav-list-hd-content .f-flex-item:after{
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
</style>
