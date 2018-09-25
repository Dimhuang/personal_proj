<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title">
      <!--<router-link to="#" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>-->
    </yd-navbar>
    <div class="g-wap-">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
              <yd-icon name="hyxx_hydd_n" custom></yd-icon>
          </span>
          <span slot="left">
            <span>会议地点:</span>
            <p>广东省珠海市金湾区区政府</p>
          </span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">左边内容二</span>
          <span slot="right">右边内容二</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </yd-layout>
</template>
<style>

</style>
<script>

  export default{
    data(){
      return{
        title:'金湾区第七届人大常委会第24次会议'
      }
    },
    created(){

    },
    components:{

    }
  }
</script>
