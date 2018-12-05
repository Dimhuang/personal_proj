<template>
  <div class="m-header">

    <div class="f-left-box">
      <i></i>
      <span>无纸化个人中心</span>
    </div>
    <div class="f-right-box">
      <!--<span><i class="iconfont pl-user"></i></span>-->
      <span @click.stop="login"><i class="iconfont pl-icon_sign_out_n"></i></span>
    </div>
  </div>
</template>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {

        },
        methods:{
          login(){
            this.$fetch('/wap/User/logout').then(result=>{
              this.$router.push({path:'/login'})
              sessionStorage.removeItem('accessToken')
            })
          }
        }
    }
</script>
<style>
  .m-header{
    width: 100%;
    height: 54px;
    line-height: 54px;
    background-color: #1791ff;
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    color: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .f-left-box{
    font-size: 24px;
    -webkit-flex:1;
    -ms-flex:1;
    flex: 1;
    -webkit-box-flex:1;
    -moz-box-flex:1;
  }

  .m-header .f-left-box i{
    display: inline-block;
    width: 40px;
    height: 54px;
    margin-right: 14px;
    float: left;
    background: url("../assets/img/logo.png") no-repeat center;
    background-size: 100%;
  }
  .f-right-box span{
    cursor: pointer;
  }
  .f-right-box i{
    font-size:18px;
    margin-left: 20px;
  }

</style>
