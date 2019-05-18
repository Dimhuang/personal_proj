<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="会议议题">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <div class="m-wap-topic-list-view">
        <yd-list theme="5">
          <yd-list-item v-for="item, key in topicList" :key="key" @click.native="goList(item.id)">
            <span slot="title" v-text="item.name"></span>
            <yd-list-other class="f-ex" slot="other">
              <div v-show="item.reporter!=''">
                <span>汇报人：</span>
                <span v-text="item.reporter"></span>
              </div>
            </yd-list-other>
            <yd-list-other slot="other">
              <div class="m-wap-topic-statu-box">
                <span class="f-end" v-if="item.status == 2&&wapFunType==1">已结束</span>
                <span class="f-load" v-if="item.status == 1&&wapFunType==1">进行中</span>
                <span class="f-restar" v-if="item.status == 0&&wapFunType==1">未开始</span>
              </div>
              <div class="f-fc-blue">
                <span>查看材料 (</span>
                <span>{{item.file_count}}</span>
                <span> ) ></span>
              </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
        <yd-backtop></yd-backtop>
        <div class="f-wap-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
          <i class="el-icon-loading" v-if="!busy"></i>
          <span v-else>暂无更多数据</span>
        </div>
      </div>
    </yd-layout>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        page:1,
        topicList:[],
        busy:true
      }
    },
    computed: {
      ...mapState(["wapFunType","mid"])
    },
    mounted(){
      var _self = this;
      _self.getList()
    },
    methods: {
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
        var _self = this;
        _self.$router.push({path:'/wap/topicFolderList',query: { type:1,did:id}});
      },
      back(){
        var _self = this;
        _self.$router.push({path:'/wap/functions'})
      }
    }
  }
</script>
<style>
  .m-wap-topic-list-view .yd-list-theme5{
    background-color: transparent;
  }
  .m-wap-topic-list-view .yd-list-img{
    display: none;
  }
  .m-wap-topic-list-view .yd-list-item{
    padding:0.2rem 0.2rem 0.1rem;
  }
  .m-wap-topic-list-view .yd-list-mes{
    padding:0.2rem !important;
    border-radius: 5px;
    -moz-box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .m-wap-topic-list-view .yd-list-title{
    word-break: break-all;
    font-family: MicrosoftYaHei;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .m-wap-topic-list-view .yd-list-other div{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .m-wap-topic-list-view .yd-list-other.f-ex div{
    font-family: MicrosoftYaHei;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin: 0.24rem 0 0.18rem;
    color: #666666;
  }

  .m-wap-topic-statu-box span{
    display: inline-block;
    height: 0.4rem;
    line-height: 0.46rem;
    padding-left:0.4rem;
    font-size: 0.24rem;
  }
  .m-wap-topic-statu-box span.f-end{
    background: url("../../../assets/img/ico_yjs_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #999;
  }
  .m-wap-topic-statu-box span.f-load{
    background: url("../../../assets/img/ico_jxz_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #28b365;
  }
  .m-wap-topic-statu-box span.f-restar{
    background: url("../../../assets/img/ico_wks_n.png") no-repeat 0 center;
    background-size: 0.32rem auto;
    color: #66beff;
  }
  .m-wap-topic-list-view .f-fc-blue{
    font-size: 0.28rem;
  }
</style>
