<template>
    <div class="g-wap-login-view">
      <yd-cell-group>
        <yd-cell-item>
          <!--<span slot="right" @click.stop="goRegister">注册账号</span>-->
        </yd-cell-item>
      </yd-cell-group>
      <!--登录-->
      <div class="m-login-title-box">
        <div class="m-login-title">
          <i></i>
        <span>
          <p v-text="'无纸化个人中心'"></p>
          <p v-text="'Paperless personal Center'"></p>
        </span>
        </div>
      </div>
      <yd-cell-group class="m-wap-login-content">
        <yd-cell-item>
          <span slot="left">
            <yd-icon name="user" custom size="0.44rem" color="#1791ff"></yd-icon>
          </span>
          <yd-input slot="right" required v-model="userTxt" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
             <yd-icon name="password" custom size="0.44rem" color="#1791ff"></yd-icon>
          </span>
          <yd-input slot="right" type="password" v-model="pwdTxt" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <div class="m-wap-login-button-box">
       <!-- <p>
          <span>忘记密码?</span>
        </p>-->
        <yd-button size="large" bgcolor="#8bc34a" shape="circle" @click.native="login()">登　录</yd-button>
        <!--<yd-button size="large" bgcolor="#8bc34a" shape="circle" @click.native="demo()">demo</yd-button>-->
      </div>

    </div>
</template>
<script>

    export default{
        data(){
            return {
              msg: 'hello vue',
              userTxt:'',
              pwdTxt:'',
              is_free:"0"
            }
        },
        created(){
        /*  if(sessionStorage.getItem('userName')!=null){
            sessionStorage.remove('userName')
          }

          console.log(sessionStorage.getItem('adName'))*/
          if(sessionStorage.getItem('adName')!=null&&sessionStorage.getItem('adPwd')!=null){
            this.userTxt = sessionStorage.getItem('adName')
            this.pwdTxt = sessionStorage.getItem('adPwd')
            if(sessionStorage.getItem('adPwd')==''){
              this.is_free=1
            }else{
              this.is_free=0
            }
            this.login()
          }
        },
        methods:{
          login(){
            if(this.userTxt==''){
              this.$dialog.toast({mes: '用户名不能为空', timeout: 1500, icon: 'error' });
            }else if(this.pwdTxt==''&&this.is_free==0){
              this.$dialog.toast({mes: '密码不能为空', timeout: 1500, icon: 'error' });
            }else{
              this.$post('/wap/User/login',{
                account:this.userTxt,
                password:this.pwdTxt,
                density_free:this.is_free
              }).then(result=>{
                if(result.msg == 'success'){
                sessionStorage.setItem('wapAccessToken' , true)
                sessionStorage.setItem('accessToken' , true)
                  sessionStorage.setItem('userName' , result.user.username)
                  this.goIndex()
                }else{
                  this.$dialog.toast({mes: '请输入正确的用户名或密码', timeout: 1500, icon: 'error' });
                }
              })
            }
          },
          goRegister(){
            this.$router.push({path:'/wap/register'})
          },
          goIndex(){
            this.$router.push({path:'/wap/meetingList'})
          },
          demo(){
            var _self = this;
            _self.$router.push({path:'/wap/demo'});
          }


        },
        components: {

        }
    }
</script>
<style>
  .g-wap-login-view{
    height: 100%;
    background:#1a1b33 url("../../../assets/img/background_img02.png") no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .m-login-title-box{
    text-align: center;
    margin: 1.05rem 0 1.37rem;
  }

  .m-login-title{
    overflow: hidden;
    text-align: center;
    display: inline-block;
  }
  .m-login-title i,
  .m-login-title span{
    color: #cedbf7;
    float: left;
  }

  .m-login-title i{
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.28rem;
    background: url("../../../assets/img/logo.png") no-repeat center;
    background-size: 100%;
  }
  .m-login-title span p:nth-of-type(1){
    font-size: 0.48rem;
    margin-top: 0.16rem;
    margin-bottom: 0.2rem;
  }
  .m-login-title span p:nth-of-type(2){
    font-size: 0.28rem;
  }

  .g-wap-login-view .yd-cell{
    background-color: transparent;
  }

  .g-wap-login-view .yd-cell:after{
    height: 0;
  }

  .g-wap-login-view .yd-cell .yd-cell-right{
    color: #fff;
    font-size: 0.3rem;
  }

  .m-wap-login-content{
    padding:0 0.81rem;
  }
  .m-wap-login-content .yd-cell-item{
    background-color: #fff;
    border-radius: 100px;
    margin-bottom: 0.4rem;
  }
  .m-wap-login-content .yd-cell-item .yd-cell-left{
   margin-right: 0.2rem;
  }
  .m-wap-login-button-box{
    padding: 0 0.81rem;
    overflow: hidden;
  }
  .m-wap-login-button-box p{
    text-align: right;
  }
  .m-wap-login-button-box p span{
    font-size: 0.24rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
  .m-wap-login-button-box .yd-btn-block{
    margin-top:0.8rem;
    font-size: 0.34rem;
    color: #fff;
  }

</style>
