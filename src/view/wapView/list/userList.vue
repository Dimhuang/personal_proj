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
          <li class="f-flex-content" v-for="n in 3">
            <span class="f-flex-item">01010101</span>
            <span class="f-flex-item">姓名姓名姓名</span>
            <span class="f-flex-item">角色角色角色角色角色</span>
            <span class="f-flex-item2">单位单位单位单位单位单位单位</span>
            <span class="f-flex-item">职务职务职务职务职务</span>
          </li>
        </ul>
      </div>
    </yd-layout>
</template>
<script>

    export default{
      data(){
        return {

        }
      },
      mounted(){
        var _self = this;

      },
      methods: {
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
