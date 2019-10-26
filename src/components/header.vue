<template>
  <div class="m-header">

    <div class="f-left-box">
      <i></i>
      <span v-text="$lang.tips.nav_title"></span>
    </div>
    <div class="f-right-box" v-show="showLogin_n==1">
      <!--<div class="f-right-box" v-show="false">-->
      <span class="fl f-head-right" @click="dialogFormVisible = true" v-if="false"><div class="fl"><em>Welcome</em><p>asaaaaaaaaaaaaadas</p></div><i class="iconfont pl-user"></i></span>
      <span @click.stop="login" ><i class="iconfont pl-icon_sign_out_n"></i></span>
    </div>

    <!-- Form -->

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>




</template>

<script>
    export default{
        data(){
            return {
              msg: 'hello vue',
              showLogin_n:'',
              dialogFormVisible: false,
              labelPosition: 'right',
              formLabelAlign: {
                name: '',
                region: '',
                type: ''
              }
            }
        },
        components: {

        },
        created(){
          var _self = this
          _self.showLogin_n = sessionStorage.getItem('showLogin')
        },
        methods:{
          login(){





            this.$confirm('确定退出登录吗, 是否继续?', '退出', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              customClass:'f-login-out-tips'
            }).then(() => {
              this.$fetch('/wap/User/logout').then(result=>{
                this.$router.push({path:'/login'})
                sessionStorage.removeItem('accessToken')
              })
            }).catch(() => { });
          },
          getInfo(){

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
    font-size:22px;
    margin-left: 20px;
  }
  .f-head-right{
    text-align: right;
  }
  .f-head-right .fl{
    margin-top: -10px;
  }
  .f-head-right em{
    font-size: 14px;
  }
  .f-head-right p{
    float: left;
    font-size: 15px;
    display: inline-block;
    width: 100%;
    height: 20px;
    margin-top: -36px;
    position: relative;
    padding-right: 18px;
  }
  .f-head-right p:after{
   position: absolute;
    content: '';
    right:0;
    bottom:-9px;
   /* width: 10px;
    height: 10px;*/
    /*background: #000;*/
    border-left: 10px solid #fff;
    border-top: 10px solid transparent;
    transform:rotate(-45deg);
    -ms-transform:rotate(-45deg); 	/* IE 9 */
    -moz-transform:rotate(-45deg); 	/* Firefox */
    -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
    -o-transform:rotate(-45deg); 	/* Opera */
  }
  .f-head-right i.pl-user{
    margin-left: 8px;
  }
  .f-login-out-tips .el-message-box__content,
  .f-login-out-tips .el-message-box__message ,
  .f-login-out-tips .el-message-box__message p,
  .f-login-out-tips .el-dialog__body{
    height: auto;
  }
  .el-message-box.f-login-out-tips{
    width: 400px !important;
  }

</style>
