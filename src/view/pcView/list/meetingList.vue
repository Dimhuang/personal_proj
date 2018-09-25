<template>
  <el-container class="m-content">
    <m-header></m-header>
    <m-body>
      <div class="m-meeting-nav">

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
                  <i class="iconfont pl-hyxx_time_n"></i>
                  <div>
                    <span>会议时间：</span>
                    <p class="f-fc-orange">2018-12-10  10:30  开始</p>
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
                  <i class="iconfont pl-hyxx_hymd_n"></i>
                  <div>
                    <span>参会名单：</span>
                    <p>刘二、李四、王五、赵六、朱七、李四、王五、赵六、朱七、李四。</p>
                  </div>
                </li>
              </ul>
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
  .m-meeting-nav:after{
    content: '';
    position: absolute;
    top:0;
    left:0;
    height: 54px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .m-meeting-nav .el-tabs__header{
    background-color: #fff;
    height: 54px;
  }

  .m-meeting-nav .el-tabs__nav-scroll{
    text-align: center;
  }
  .m-meeting-nav .el-tabs__nav{
    float: inherit;
  }
  .m-meeting-nav .el-tabs__nav-wrap::after{
    height: 0;
  }
  .m-meeting-nav .el-tabs__item{
    font-size: 18px;
    line-height: 54px !important;
    height: 100%;
    color: #999;
  }
  .m-meeting-nav .el-tabs__item.is-active{
    color:#409EFF !important;
  }
  .m-meeting-nav .el-tabs__active-bar{
    left: 50%;
    margin-left: -35.5px;
  }
  .m-meeting-nav .f-view-width{
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
  .m-history-list p.f-fc-orange{
    color: #f36323;
  }
  .m-history-list-flie{
    height: 60px;
    align-items: center;
    background-color: #f5f5f5;
  }

</style>
