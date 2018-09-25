<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(n,index) in breakList" :key="index">{{n.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <ul>
        <li class="m-history-topics-list f-flex-content" v-for="items in topicList">
          <div class="f-flex-item">
            <h2 v-text="items.name"></h2>
            <span>汇报人：{{items.reporter}}   {{items.place}}</span>
          </div>
          <div class="m-history-list-r">
            <span class="f-end-ico" v-if="items.status==1">
              <i>已结束</i>
            </span>
             <span class="f-load-ico" v-else>
              <i>进行中</i>
            </span>
            <p @click.stop="goList(items.name)">查看资料(<em>1</em>) ></p>
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
              topicList:[{id:1,name:'一、听取金湾区区委副书记、区长李非凡关于2018上半年政府工作的报告；',reporter:'阿东',place:'金湾区政府',status:1},
                {id:1,name:'二、审查金湾区政府关于2017年金湾区经济和社会发展计划执行情况与2018年金湾区社会发展报告；湾区社会发展报告；',reporter:'阿东',place:'金湾区政府',status:2}]
            }
        },
        computed:{
          ...mapState(["breakList"])
        },
        mounted(){

        },
        components: {

        },
        methods:{
          goList(name){
            this.$store.commit("pushBreak",{name:name,breadNum:2,path:'topicsList'})
            this.$router.push({name:'topicsList',params:{id:'1'}})
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
</style>
