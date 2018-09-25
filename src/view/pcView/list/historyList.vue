<template>
  <el-container class="m-content">
    <m-header></m-header>
    <m-body>
      <div class="m-list-nav">

        <div class="f-view-width">
          <span class="m-back-btn" @click="back">
            <i class="el-icon-arrow-left"></i>
            <em v-text="'返回'"></em>
          </span>
          <el-tabs @tab-click="handleClick">
            <!--会议信息-->
            <el-tab-pane label="会议信息">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>会议信息</el-breadcrumb-item>
              </el-breadcrumb>
              <ul>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hymc_n"></i>
                  <div>
                    <span>会议名称：</span>
                    <p>金湾区第七届人大常委会第24次会议</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hydd_n"></i>
                  <div>
                    <span>会议地点：</span>
                    <p>广东省珠海市金湾区区政府</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hycs_n"></i>
                  <div>
                    <span>会议场所：</span>
                    <p>区政府25号楼南阶梯会议室</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_zcr_n"></i>
                  <div>
                    <span>主持人：</span>
                    <p>sfs</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hyjj_n"></i>
                  <div>
                    <span>会议简介：</span>
                    <p>主要讨论重要领导人任免、政府工作报告、两院报告、财政预算、重要法律和区大政方针的制定。</p>
                  </div>
                </li>
                <li class="m-history-list">
                  <i class="iconfont pl-hyxx_hyfa_n"></i>
                  <div>
                    <span>会议方案：</span>
                    <div class="m-history-list-flie f-flex-content">
                      <div class="f-pdf-icon"></div>
                      <div class="f-flex-item">金湾区第七届人大常委会第24次会议方案.pdf</div>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <!--会议议题-->
            <el-tab-pane label="会议议题">
              <router-view/>
            </el-tab-pane>
            <!--临时资料-->
            <el-tab-pane label="临时资料">
              <router-view/>
            </el-tab-pane>
            <!--批注白板-->
            <el-tab-pane label="批注白板">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>批注白板</el-breadcrumb-item>
              </el-breadcrumb>

              <div class="m-white-view">
                <el-tabs v-model="whiteBoardActive">
                  <el-tab-pane  name="1">
                    <div slot="label">
                      <span>1</span>
                      <p>文档批注</p>
                    </div>
                    <div>
                      <el-row :gutter="12">
                        <el-col :span="8" v-for="(o, index) in 5  " :key="o">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <div class="m-white-item-hd">
                              <span class="f-pdf-icon"></span>
                            </div>
                            <div class="f-text-ellipsis">
                              第七届人大常委会第24次会议.pdf
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="2">
                    <div slot="label">
                      <span>1</span>
                      <p>手写批注</p>
                    </div>
                    <div>
                      <el-row :gutter="12">
                        <el-col :span="8" v-for="(o, index) in 5  " :key="o">
                          <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <div class="m-white-item-hd">
                              <span class="f-pdf-icon"></span>
                            </div>
                            <div class="f-text-ellipsis">
                              第七届人大常委会第25次会议.pdf
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="电子白板" name="3">
                    <div slot="label">
                      <span>1</span>
                      <p>电子白板</p>
                    </div>
                    <div>
                      电子白板
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

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
        whiteBoardActive:'1'
      }
    },
    created(){

    },
    methods:{
      handleClick(tab, event){
        if(tab.label == "会议议题"){
          this.$store.commit("tabBreak",{name:tab.label,breadNum:1,path:'topics'})
          this.$router.push({name:'topics'})
        }else if(tab.label == "临时资料"){
          this.$store.commit("tabBreak",{name:tab.label,breadNum:1,path:'topicsList'})
          this.$router.push({name:'topicsList'})
        }
      },
      back(){
        this.$router.push({name:'pcHome'})
      }
    },
    components: {
      mHeader,
      mBody
    }
  }
</script>
<style>
  .m-list-nav:after{
    content: '';
    position: absolute;
    top:0;
    left:0;
    height: 54px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .m-list-nav .el-tabs__header{
    background-color: #fff;
    height: 54px;
  }
  .m-list-nav .el-tabs__nav-wrap::after{
    height: 0;
  }
  .m-list-nav .el-tabs__nav-wrap{
    padding-left: 320px;
  }
  .m-list-nav .el-tabs__item{
    font-size: 18px;
    line-height: 54px !important;
    height: 100%;
    color: #999;
  }
  .m-list-nav .el-tabs__item.is-active{
    color:#409EFF !important;
  }
  .m-list-nav .f-view-width{
    position: relative;
    z-index: 2;
  }
  .m-back-btn{
    position: absolute;
    top: 0;
    left:0;
    z-index: 3;
    height:54px;
    line-height: 54px;
    color: #666;
    font-size: 16px;
    cursor: pointer;
  }
  .m-back-btn .el-icon-arrow-left{
      font-size: 24px;
      float: left;
      height: 100%;
    line-height: 54px;
    font-weight: 700;
  }
  .m-history-list{
    padding:5px 10px 5px 74px;
    position: relative;
    background-color: #fff;
    margin-top: 4px;
  }
  .m-history-list i{
    position: absolute;
    top: 20px;
    left:30px;
    font-size: 22px;
    color: #1792ff;
  }
  .m-history-list span{
    font-size: 18px;
    line-height: 24px;
    color: #111;
  }
  .m-history-list p{
    font-size: 16px;
    line-height: 20px;
    color: #666;
    margin-top: 5px;
  }
  .m-history-list-flie{
    height: 60px;
    align-items: center;
    background-color: #f5f5f5;
  }
  .m-white-view .el-tabs__header{
    height: auto;
  }
  .m-white-view .el-tabs__item{
    line-height: normal !important;
    position: relative;
  }
  .m-white-view .el-tabs__item div{
    padding: 0 30px;
  }
  .m-white-view .el-tabs__item:after{
    content: '';
    position: absolute;
    height: 20px;
    top:16px;
    right:0;
    border-left:2px solid #dddddd;;
  }
  .m-white-view .el-tabs__item span{
    font-size: 24px;
    font-weight: 700;
  }

  .m-white-view .el-tabs__nav-wrap{
    padding: 10px;
  }
  .m-white-view .el-tabs__nav-scroll{
    text-align: center;
  }
  .m-white-view .el-tabs__nav{
    float: inherit;
  }
  .m-white-view .el-tabs__active-bar,
  .m-white-view .el-tabs__item:nth-last-of-type(1):after{
    display: none;
  }
  .m-white-view .el-card__body{
    border-radius: 8px;
  }
  .m-white-view .el-col{
    margin-bottom: 20px;
    cursor: pointer;
  }
  .m-white-view .el-card{
    border: 0;
    background-color: transparent;
    text-align: center;
  }
  .m-white-item-hd{
    height: 140px;
    width: 100%;
    background-color: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    /*垂直居中*/
    align-items:center;
    -webkit-align-items:center;
    box-align:center;
    -moz-box-align:center;
    -webkit-box-align:center;
    /*水平居中*/
    -webkit-justify-content:center;
    justify-content:center;
    -moz-box-pack:center;
    -webkit--moz-box-pack:center;
    box-pack:center;
  }

  .m-white-item-hd span{
    display: inline-block;
    width: 45px;
    height: 54px;
    background-size: 45px auto;
    margin-right: 0;
  }
  .m-white-item-hd+.f-text-ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:14px;
    color: #333;
    font-size: 14px;
  }

</style>
