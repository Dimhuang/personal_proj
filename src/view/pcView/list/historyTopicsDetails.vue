<template>
  <div>
    <el-breadcrumb separator="/">
      <!--<el-breadcrumb-item @click.native="goMain">会议议题</el-breadcrumb-item>
      <el-breadcrumb-item @click.native="goList">二、审查金湾区政府关于2017年金湾区经济和社会发展计划执行情况与2018年金湾区社会发展报告；</el-breadcrumb-item>
      <el-breadcrumb-item>二、审查金湾区政府关于2017年金湾区经济和社会发展计划执行情况与2018年金湾区社会发展报告；</el-breadcrumb-item>-->
      <el-breadcrumb-item v-for="(n,index) in breakList" :key="index" @click.native="goPath(n)">{{n.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ul>
      <li class="m-history-topics-list f-flex-content">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="f-doc-icon fl"></div>
          <div>金湾区第七届人大常委会第24次会议方案.doc</div>
        </div>
        <div class="m-history-list-r">
          <el-button size="mini" round>打开</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default{
    data(){
      return {

      }
    },
    computed:{
      ...mapState(["breakList"])
    },
    components: {

    },
    methods:{
      goPath(item){
        this.$store.commit("tapBreak",item)
        this.$router.push({name:item.path})
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
  .m-history-list-r button{
    margin-top:14px;
  }
  .m-history-list-r button span{
    height: auto;
    line-height: normal;
    padding-left: 0;
    font-size: 100%;
  }
</style>
