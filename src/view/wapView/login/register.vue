<template>
  <div class="g-wap-login-view">
    <!--注册-->
    <h2 class="m-wap-register-header">注册</h2>
    <yd-cell-group class="m-wap-register-content">
      <yd-cell-item>
        <span slot="left">*</span>
        <yd-input slot="right" required v-model="userName" ref="uName" max="20" placeholder="姓名" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">*</span>
        <yd-input slot="right" required  v-model="userTel" ref="uTel" regex="mobile" placeholder="电话" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">*</span>
        <yd-input slot="right" required v-model="user" ref="users" max="20" placeholder="登录用户名" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">*</span>
        <yd-input slot="right" type="password" required v-model="userPwd" ref="uPwd" placeholder="请输入6～18位密码" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left"> </span>
        <yd-input slot="right" v-model="userUnit" max="20" placeholder="单位" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left"> </span>
        <yd-input slot="right" v-model="userDep" max="20" placeholder="部门" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left"> </span>
        <yd-input slot="right" v-model="UserJob" max="20" placeholder="职务" :show-success-icon="false" :show-error-icon="false"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <div class="m-wap-register-button-box">
      <yd-button size="large" bgcolor="#8bc34a" shape="circle" @click.native="register()">注　册</yd-button>
      <p @click.stop="goLogin()">返　回</p>
    </div>

  </div>
</template>
<script>

  export default{
    data(){
      return {
        userName:'',
        userTel:'',
        user:'',
        userPwd:'',
        userUnit:'',
        userDep:'',
        UserJob:''
      }
    },
    methods:{
      register(){
        if(this.$refs.uName.valid==false){
          this.errorTip('姓名不能为空!')
        }else if(this.$refs.uTel.valid==false){
          this.errorTip('请输入正确的电话格式且电话不能为空!')
        }else if(this.$refs.users.valid==false){
          this.errorTip('用户名不能为空!')
        }else if(this.$refs.uPwd.valid==false){
          this.errorTip('密码不能为空!')
        }else if((this.userPwd.length<6)||(this.userPwd.length>18)){
          this.errorTip("请输入6～18位密码!")
        }else{
          this.$dialog.toast({
            mes: '注册成功',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              this.goLogin();
            }
          });
        }
      },
      errorTip(msg){
        this.$dialog.toast({
            mes: msg,
            timeout: 1800,
            icon: 'error'
        });
      },
      goLogin(){
        this.$router.push({path:'/wap/login'})
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
  .m-wap-register-header{
      margin: 0.5rem 0;
    font-size: 0.47rem;
    text-align: center;
    letter-spacing: 5px;
    color: #cedbf7;
  }
  .g-wap-login-view .yd-cell{
    background-color: transparent;
  }

  .m-wap-register-content{
    padding:0 0.81rem;
  }

  .m-wap-register-content .yd-cell-item{
    border-bottom: 1px solid #666;
  }
  .m-wap-register-content .yd-cell-item .yd-cell-left span{
    display: inline-block;
    width: 0.2rem;
    text-align: left;
    color: red;
  }
  .m-wap-register-content .yd-cell-item .yd-cell-right input{
    color: #fff;
  }
  .m-wap-register-button-box{
    padding: 0 0.81rem;
    overflow: hidden;
  }
  .m-wap-register-button-box p{
    text-align: center;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    color: #fff;
    margin-top: 0.5rem;
  }
  .m-wap-register-button-box .yd-btn-block{
    margin-top:0.8rem;
    font-size: 0.34rem;
    color: #fff;
  }


</style>
