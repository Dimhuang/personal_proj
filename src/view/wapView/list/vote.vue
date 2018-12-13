<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="会议投票">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <div class="m-wap-vote-list-content">
        <yd-cell-group :title="items.datum_title" v-for="(items,index) in voteList" :key="index">
          <yd-cell-item v-for="n in items.votes">
            <span slot="left">
              <span class="f-fc-black f-ex" v-text="n.vote_title"></span>
              <div>
                <yd-badge bgcolor="#28b464" color="#FFF" scale="0.8" v-if="n.status==1">进行中</yd-badge>
                <yd-badge bgcolor="#bbbbbb" color="#FFF" scale="0.8" v-else>已结束</yd-badge>
              </div>

            </span>
            <span slot="right">
              <yd-button bgcolor="#28b464" color="#FFF" shape="circle" v-if="n.status==1" @click.native="goSelect(n.id)">投票</yd-button>
              <yd-button color="#0092ff" shape="circle" class="f-ex" v-else @click.native="goDetails(n.id)">查看详情</yd-button>
            </span>
          </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="默认投票">
          <yd-cell-item v-for="item in voteNorList">
            <span slot="left">
              <span class="f-fc-black f-ex" v-text="item.vote_title"></span>
              <div>
                <yd-badge bgcolor="#28b464" color="#FFF" scale="0.8" v-if="item.status==1">进行中</yd-badge>
                <yd-badge bgcolor="#bbbbbb" color="#FFF" scale="0.8" v-else>已结束</yd-badge>
              </div>
            </span>
            <span slot="right">
              <yd-button bgcolor="#28b464" color="#FFF" shape="circle" v-if="item.status==1" @click.native="goSelect(item.id)">投票</yd-button>
              <yd-button color="#0092ff" shape="circle" class="f-ex" v-else @click.native="goDetails(item.id)">查看详情</yd-button>
            </span>
          </yd-cell-item>
        </yd-cell-group>
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
          busy:true,
          voteList:[],
          voteNorList:[],
        }
      },
      computed: {
        ...mapState(["mid"])
      },
      mounted(){
        var _self = this;
        _self.getList()
      },
      methods: {
        getList(flag){
          this.$fetch('/wap/meeting/vote',{
            m_id:this.mid,
            pagesize:10,
            page:this.page
          }).then(result=>{
            let res = result.data;
          if(result.msg=='success'){
            if(flag){
              if(res.datum!=undefined){
                this.voteList = this.voteList.concat(res.datum)
              }else{

              }
              this.voteNorList = res.normal
              if(res.total<this.page*10){
                this.busy=true
              }else{
                this.busy=false
              }
            }else{
              if(res.datum!=undefined){
                this.voteList = res.datum
              }else{
                this.voteList = []
              }

              this.voteNorList = res.normal
              this.busy=false
            }
          }else{
            this.voteList = []
            this.voteNorList = []
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
        goSelect(id){
          var _self = this;
          _self.$router.push({path:'/wap/voteSelect',query:{id:id}})
        },
        goDetails(id){
          var _self = this;
          _self.$router.push({path:'/wap/voteDetails',query:{id:id}})
        },
        back(){
          var _self = this;
          _self.$router.push({path:'/wap/functions'})
        }
      }
    }
</script>
<style>
  .m-wap-vote-list-content .yd-cell-title{
    padding:0.26rem 0.2rem 0.16rem;
    font-family: MicrosoftYaHei;
    font-size: 0.24rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-wap-vote-list-content .yd-cell{
    background-color: transparent;
  }
  .m-wap-vote-list-content .yd-cell-item{
    padding:0.2rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
  }
  .m-wap-vote-list-content .yd-cell-left{
    width: 70%;
    overflow: hidden;
  }
  .m-wap-vote-list-content .yd-cell-left span{
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }
  .m-wap-vote-list-content .yd-cell-left span span.f-ex{
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    width: 4.8rem;
  }
  .m-wap-vote-list-content .yd-cell-left div{
   position: relative;
    height: 0.48rem;
  }
  .m-wap-vote-list-content .yd-cell-left .yd-badge{
    position: absolute;
    left: -0.08rem;
    bottom: 0;
  }
  .m-wap-vote-list-content .yd-cell-right{
    min-height: inherit;
    padding-right: 0;
  }
  .m-wap-vote-list-content .yd-cell-right .yd-btn{
    width: 1.4rem;
    font-size: 0.28rem;
    border:1px solid #28b464;
  }
  .m-wap-vote-list-content .yd-cell-right .yd-btn.f-ex{
    border:1px solid #0092ff;
    background-color: transparent;
  }
</style>
