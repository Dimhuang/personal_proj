<template>
    <yd-layout>
      <yd-navbar slot="navbar" title="参会人员">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>

      <div slot="navbar" class="m-user-view-hd f-flex-content">
        <span class="f-flex-item">序号</span>
        <span class="f-flex-item">姓名</span>
        <span class="f-flex-item">角色</span>
        <span class="f-flex-item2">单位</span>
        <span class="f-flex-item">职务</span>
      </div>
      <div class="m-user-view-bd">
        <ul>
          <li class="f-flex-content" v-for="n,index in userList">
            <span class="f-flex-item" v-text="index<9?('0'+(index+1)):(index+1)"></span>
            <span class="f-flex-item" v-text="n.username"></span>
            <span class="f-flex-item">
              <span v-if="n.is_chairman==1">主持</span>
              <span v-else-if="n.secretary==1">秘书</span>
              <span v-else>参会</span>
            </span>
            <span class="f-flex-item2" v-text="n.unit"></span>
            <span class="f-flex-item" v-text="n.position"></span>
          </li>
        </ul>
      </div>
      <yd-backtop></yd-backtop>
    </yd-layout>
</template>
<script>
    import {mapState} from 'vuex'
    export default{
      data(){
        return {
          userList:[]
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
        getList(){
          this.$fetch('/wap/meeting/data',{
            m_id:this.mid
          }).then(result=>{
            let res = result.data;
            if(result.msg=='success'){
              if(res!=null){
                this.userList = res.users
              }else{
                this.userList = []
              }
            }else{
              this.userList = []
            }
          })
        },
        back(){
          var _self = this;
          _self.$router.push({path:'/wap/functions'})
        }
      }
    }
</script>
<style>
  .m-user-view-hd{
    padding:0.2rem 0;
    text-align: center;
    font-size: 0.28rem;
    color: #999;
  }

  .m-user-view-bd li{
    text-align: center;
    text-align: center;
    font-size: 0.28rem;
    padding:0.2rem 0;
    background-color: #fff;
    margin-bottom: 0.2rem;
  }
  .m-user-view-bd li span{
    box-sizing: border-box;
    padding:0 0.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
