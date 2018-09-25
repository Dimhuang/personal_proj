<template>
  <div>
    <el-breadcrumb separator="/">
      <!--<el-breadcrumb-item @click.native="goMain">会议议题</el-breadcrumb-item>
      <el-breadcrumb-item>二、审查金湾区政府关于2017年金湾区经济和社会发展计划执行情况与2018年金湾区社会发展报告；</el-breadcrumb-item>-->

      <el-breadcrumb-item v-for="(n,index) in breakList" :key="index" @click.native="goPath(n)">{{n.name}}</el-breadcrumb-item>

    </el-breadcrumb>
    <ul>
      <li class="m-history-topics-list f-flex-content">
        <div class="f-flex-item">
          <h2 v-text="topicList.topicName"></h2>
          <span>汇报人：{{topicList.topicReporter}}   {{topicList.topicPlace}}</span>
          <span>列席人员：{{topicList.topicUsers}}</span>
        </div>
        <div class="m-history-list-r">
            <span class="f-end-ico" v-if="topicList.topicStatus==0">
              <i>已结束</i>
            </span>
          <p></p>
          <p class="f-fc-blue">全部</p>
        </div>
      </li>
      <li class="m-history-topics-list f-flex-content" v-for="items in topicList.topicFiles">
        <div class="f-flex-item m-history-topics-list-file">
          <div class="f-wjj-icon fl" :class="{'f-wjj-icon':items.filesType==1,'f-doc-icon':items.filesType==0}"></div>
          <div v-text="items.filesName"></div>
        </div>
        <div class="m-history-list-r">
          <el-button size="mini" round @click.native="goDetails(items)">打开</el-button>
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
        topicList:{
            topicName:'一、听取金湾区区委副书记、区长李非凡关于2018上半年政府工作的报告；',
            topicReporter:'阿东',
            topicPlace:'金湾区政府',
            topicUsers:'刘二、张三、李四、王五、赵六、朱七、李四、王五、赵六、朱七、刘二七、李四二',
            topicStatus:'0',
            topicFiles:[{
              filesName:'金湾区第七届人大常委会第24次会议方案',
              filesType:'1'
            },{
              filesName:'会议方案.doc',
              filesType:'0'
            }]
        }
      }
    },
    computed:{
      ...mapState(["breakList"])
    },
    mounted(){
      console.log(JSON.stringify(this.$route.params))
    },
    components: {

    },
    methods:{
      goDetails(data){
        let _self = this;
        if(data.filesType==1){
          _self.$store.commit("pushBreak",{name:data.filesName,breadNum:3,path:'topicsDetails'})
          _self.$router.push({name:'topicsDetails'})
        }else{
          _self.$message('这是文档');
        }
      },
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
