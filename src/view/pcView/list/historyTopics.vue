<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$lang.history.title.meet_topic}}</el-breadcrumb-item>
      </el-breadcrumb>
      <ul>
        <li class="m-history-topics-list f-flex-content" v-for="items in topicList">
          <div class="f-flex-item">
            <h2>{{items.name.replace(/\s/g,'&nbsp;')}}</h2>
            <span>{{$lang.topic.form.reporter}}：{{items.reporter}}   {{items.place}}</span>
          </div>
          <div class="m-history-list-r">
            <!--<span class="f-end-ico" v-if="items.status==2">
              <i> </i>
            </span>
             <span class="f-restar" v-if="items.status==0">
              <i> </i>
            </span>
             <span class="f-load-ico" v-else>
              <i> </i>
            </span>-->
            <span></span>
            <p @click.stop="goList(items.id)">{{$lang.topic.form.watch_file}}(<em v-text="items.file_count"></em>) ></p>
          </div>
        </li>
      </ul>
      <div class="f-load-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        <i class="el-icon-loading" v-if="!busy"></i>
        <span v-else v-text="$lang.tips.no_data"></span>
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
              busy:true,
              is_meet_type:sessionStorage.getItem('meetType')==null?'1':sessionStorage.getItem('meetType'),
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
            let _self = this;
            _self.$fetch('/wap/meeting/datum',{
              m_id:_self.mid,
              pagesize:50,
              page:_self.page
            }).then(result=>{
              let res = result.data;
            if(result.msg=='success'){
              if(flag){
                console.log(res.data)
                if(res.data.length!=0){
                  _self.topicList = _self.topicList.concat(res.data)
                }
                if(res.total<_self.page*50){
                  _self.busy=true
                }else{
                  _self.busy=false
                }
              }else{
                _self.topicList = res.data
                _self.busy=false
              }
            }else{
              _self.topicList = []
            }
            })
          },
          loadMore(){
            let _self = this;
            setTimeout(()=>{
              _self.page++;
              _self.getList(true)
            }, 500)
          },
          goList(id){
            if(this.is_meet_type==1){
              this.$router.push({path:'/list/historyList/topicsList',query:{did:id}})
            }else{
              this.$router.push({path:'/list/meetingList/topicsList',query:{did:id}})
            }


          },
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
    width: 790px;
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
