<template>
  <div class="g-login">
    <div class="m-login-box">
      <div class="m-login-title">
        <i></i>
        <span>
          <p v-text="'无纸化个人中心'"></p>
          <p v-text="'Paperless personal Center'"></p>
        </span>
      </div>

      <el-form class="m-login-content" :label-position="labelPosition" :model="formLabelAlign">
        <el-form-item>
          <el-input class="m-login-ipt" v-model="formLabelAlign.name" prefix-icon="pl-user iconfont" :placeholder="$lang.login.tips.name_txt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="m-login-ipt" type="password" v-model="formLabelAlign.pwd" prefix-icon="pl-password iconfont" :placeholder="$lang.login.tips.pwd_txt"></el-input>
          <!--<span class="m-login-fgpw" v-text="'忘记密码'"></span>-->
        </el-form-item>
        <div class="m-login-btn">
          <el-button type="success" v-text="$lang.login.tips.login_btn" @click.native="login"></el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return {
              labelPosition: 'left',
              formLabelAlign: {
                name: '',
                pwd: '',
              }
            }
        },
        mounted(){
          sessionStorage.removeItem('accessToken')
          if((sessionStorage.getItem('objName')!=null)&&(sessionStorage.getItem('objPwd')!=null)){
            sessionStorage.removeItem('objName')
            sessionStorage.removeItem('objPwd')
          }
        },
        components: {

        },
        methods:{
          login(){
            if(this.formLabelAlign.name==''){
              this.$message(this.$lang.login.tips.name_tips);
            }else if(this.formLabelAlign.pwd==''){
              this.$message(this.$lang.login.tips.pwd_tips);
            }else{
              this.$post('/wap/User/login',{
                account:this.formLabelAlign.name,
                password:this.formLabelAlign.pwd
              }).then(result=>{
                if(result.msg == 'success'){
                  sessionStorage.setItem('accessToken' , true)
                  this.goIndex()
                }else{
                  this.$message(this.$lang.login.tips.pwd_tips);
                }
              })
            }
          },
          goIndex(){
            this.$router.push({path:'/index'})
          }
        }
    }
</script>
<style>

  .g-login{
    height: 100%;
    background: url("../../../assets/img/background_img01.png") no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .m-login-box{
    width: 400px;
    margin: 100px auto;
  }
  .m-login-title{
    overflow: hidden;
    text-align: center;
    padding-left: 70px;
    margin-bottom: 60px;
  }
  .m-login-title i,
  .m-login-title span{
    color: #cedbf7;
    float: left;
  }

  .m-login-title i{
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 14px;
    background: url("../../../assets/img/logo.png") no-repeat center;
    background-size: 100%;
  }
  .m-login-title span p:nth-of-type(1){
    font-size: 24px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  .m-login-title span p:nth-of-type(2){
    font-size: 14px;
  }
  .m-login-content{
    background-color: #fff;
    padding:40px 50px;
  }
  .m-login-ipt input{
    background-color: #ededed;
    border-radius: 10px;
    border: 0;
    padding-left: 50px !important;
  }
  .m-login-ipt .iconfont.el-input__icon{
    color: #1791ff;
    font-size: 22px !important;
    padding-left: 10px;
  }
  .m-login-btn{
    box-sizing: border-box;
  }
  .m-login-btn button{
    width: 100%;
    border-radius: 10px;
    font-size: 18px;
    background-color: #8bc34a;
  }
  .m-login-btn span{
    float: right;
    font-size: 14px;
    color: #ccc;
    margin-top: 10px;
    cursor: pointer;
  }
  .m-login-fgpw{
    float: right;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
</style>
