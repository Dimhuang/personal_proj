<template>
  <div class="m-header">

    <div class="f-left-box">
      <i></i>
      <span v-text="$lang.tips.nav_title"></span>
    </div>
    <div class="f-right-box" v-show="showLogin_n==1">
      <!--<div class="f-right-box" v-show="false">-->
      <span class="fl f-head-right" @click="dialogFormVisible = true"><div class="fl"><em>Welcome</em><p v-text="formLabelAlign.username"></p></div><i class="iconfont pl-user"></i></span>
      <!--<span class="fl f-head-right" ><div class="fl"><em>Welcome</em><p v-text="formLabelAlign.username"></p></div><i class="iconfont pl-user"></i></span>-->
      <span @click.stop="login" ><i class="iconfont pl-icon_sign_out_n"></i></span>
    </div>

    <!-- Form -->

    <el-dialog class="m-header-info-dialog" :title="$lang.head.form.info" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item :label="$lang.head.form.account">
          <el-input v-model="formLabelAlign.account" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.pwd">
          <el-input class="f-ex" type="password" v-model="formLabelAlign.password" disabled></el-input>
          <el-button type="primary" @click.prevent="dialogPassword=true">{{$lang.head.form.reset_pwd}}</el-button>
        </el-form-item>
        <el-form-item :label="$lang.head.form.name">
          <el-input v-model="formLabelAlign.username" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.unit">
          <el-input v-model="formLabelAlign.unit" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.dept">
          <el-input v-model="formLabelAlign.dept" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.positions">
          <el-input v-model="formLabelAlign.position" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.salutatory">
          <el-input
            type="textarea"
            :placeholder="$lang.head.form.salutatory_tips"
            v-model="formLabelAlign.salutatory"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$lang.head.form.cancel_btn}}</el-button>
        <el-button type="primary" @click="infoConfirm()">{{$lang.head.form.confirm_btn}}</el-button>
      </div>
    </el-dialog>


    <el-dialog class="m-header-info-dialog" :title="$lang.head.form.reset_pwd" :visible.sync="dialogPassword">
      <el-form :label-position="labelPosition" label-width="100px" :model="pwdAlign">
        <el-form-item :label="$lang.head.form.new_pwd">
          <el-input type="password" v-model="pwdAlign.password" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$lang.head.form.ag_pwd">
          <el-input  type="password" v-model="pwdAlign.passwordAg" minlength="6" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassword = false">{{$lang.head.form.cancel_btn}}</el-button>
        <el-button type="primary" @click="pwdConfirm">{{$lang.head.form.confirm_btn}}</el-button>
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
              formLabelAlign: {},
              pwdAlign: {
                password:'',
                passwordAg:''
              },
              dialogPassword:false
            }
        },
        components: {

        },
        created(){
          var _self = this
          _self.showLogin_n = sessionStorage.getItem('showLogin')
          _self.getInfo()
        },
        methods:{
          login(){
            this.$confirm(this.$lang.head.tips.login_out, this.$lang.head.tips.quit, {
              confirmButtonText: this.$lang.head.tips.yes,
              cancelButtonText: this.$lang.head.tips.cancel,
              customClass:'f-login-out-tips'
            }).then(() => {
              this.$fetch('/wap/User/logout').then(result=>{
                this.$router.push({path:'/login'})
                sessionStorage.removeItem('accessToken')
              })
            }).catch(() => { });
          },
          getInfo(){
            var _self = this
            _self.$post('/wap/User/login',{
              account:sessionStorage.getItem('objName'),
              password:sessionStorage.getItem('objPwd')
            }).then(result=>{

              _self.formLabelAlign = {
                account:sessionStorage.getItem('objName'),
                password:sessionStorage.getItem('objPwd'),
                username:result.user.username,
                position:result.user.position,
                unit:result.user.unit,
                dept:result.user.dept,
                salutatory:result.user.salutatory
              }
            })
          },
          pwdConfirm(){
            var _self = this
            if(_self.pwdAlign.password==''||_self.pwdAlign.passwordAg==''){
              _self.$message(_self.$lang.login.tips.pwd_tips);
            }else if(_self.pwdAlign.password.length<6||_self.pwdAlign.passwordAg.length<6){
              _self.$message(_self.$lang.head.tips.pwd_length);
            }else if(_self.pwdAlign.password!=_self.pwdAlign.passwordAg){
              _self.$message(_self.$lang.head.tips.pwd_same);
            }else{
              _self.$post('/wap/user/reset_password',{
                password:_self.pwdAlign.password,
                password_repeat:_self.pwdAlign.passwordAg
              }).then(result=>{
                if(result.msg=='success'){
                  _self.$message(_self.$lang.head.tips.change_success);
                  _self.dialogPassword = false
                  sessionStorage.removeItem('objPwd')
                  setTimeout(function(){
                    sessionStorage.setItem('objPwd',_self.pwdAlign.password)
                    _self.getInfo()
                  },100)
                }else{
                  _self.$message(_self.$lang.head.tips.change_fail);
                }
              })
            }
          },
          infoConfirm(){
            var _self = this
            if(_self.formLabelAlign.username==''){
              _self.$message(_self.$lang.head.tips.name_length);
            }else{
              _self.$post('/wap/user/user_update',{
                username:_self.formLabelAlign.username,
                salutatory:_self.formLabelAlign.salutatory
              }).then(result=>{
                  if(result.msg=='success'){
                  _self.$message(_self.$lang.head.tips.change_success);
                  _self.dialogFormVisible = false
                  setTimeout(function(){
                    _self.getInfo()
                  },100)
                }else{
                  _self.$message(_self.$lang.head.tips.change_fail);
                }
              })
            }
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

  .m-header-info-dialog .f-ex.el-input{
    width: calc(100% - 146px);
    margin-right: 6px;
  }
  .m-header-info-dialog .f-ex.el-input+.el-button{
    width: 135px;
  }

</style>
