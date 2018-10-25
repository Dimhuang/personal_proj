<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="会议投票">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <div class="m-wap-vote-select-content">
      <h2>关于关吉宫担任保伦大酒店首席掌勺的表决</h2>
    </div>
  </yd-layout>
</template>
<script>
  export default{
    data(){
      return {
        listType: ''
      }
    },
    mounted(){
      var _self = this;
      _self.listType = _self.$route.params.listType
    },
    methods: {
      back(){
        var _self = this;
        _self.$router.push({name:'wapVote',params: { listType: _self.listType }})
      }
    }
  }
</script>
<style>
  .m-wap-vote-select-content h2{
    font-family: MicrosoftYaHei;
    font-size: 0.4rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
</style>
