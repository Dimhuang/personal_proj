<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>会议议题</el-breadcrumb-item>
      </el-breadcrumb>
      <ul>
        <li class="m-history-topics-list f-flex-content" v-for="items in topicList">
          <div class="f-flex-item">
            <h2 v-text="items.name"></h2>
            <span>汇报人：{{items.reporter}}   {{items.place}}</span>
          </div>
          <div class="m-history-list-r">
            <span class="f-end-ico" v-if="items.status==2">
              <i>已结束</i>
            </span>
             <span class="f-restar" v-if="items.status==0">
              <i>未开始</i>
            </span>
             <span class="f-load-ico" v-else>
              <i>进行中</i>
            </span>
            <p @click.stop="goList(items.id)">查看资料(<em v-text="items.file_count"></em>) ></p>
          </div>
        </li>
      </ul>
      <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        <i class="el-icon-loading" v-if="!busy"></i>
        <span v-else>暂无更多数据</span>
      </div>
    </div>
</template>
<script>
    import '@/assets/css/pcScrollBar.css'
    import {mapState} from 'vuex'
    export default{
        data(){
            return {
              topicList:[],
              page:1,
              busy:true
            }
        },
        computed: {
          ...mapState(["mid"])
        },
        mounted(){
          this.getList()
        },
        methods:{
          getList(flag){
            this.$fetch('/wap/meeting/datum',{
              m_id:this.mid,
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
              this.getList(true)
            }, 500);
          },
          goList(id){
            this.$router.push({path:'/list/historyList/topicsList',query:{did:id}})
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
