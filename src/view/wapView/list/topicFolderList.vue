<template>
    <yd-layout>
      <yd-navbar slot="navbar" :title="title">
        <div slot="left" @click.stop="back">
          <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
          <span>返回</span>
        </div>
      </yd-navbar>
      <yd-cell-group class="m-wap-folder-list-hd" v-if="showType==1">
        <yd-cell-item>
          <span slot="left">
            <h2>一、听取金湾区区委副书记、区长李非凡关于2018上半年政府工作的报告；</h2>
            <p class="f-flex-content f-ex">
              <span>汇报人：</span>
              <span class="f-flex-item">阿东   金湾区政府</span>
            </p>
             <p class="f-flex-content">
               <span>列席人员：</span>
               <span class="f-flex-item">刘二、张三、李四、王五、赵六、朱七、 刘二、张三、李四、王五、赵六、朱七、刘二、</span>
             </p>
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group class="m-wap-folder-list-bd">
        <yd-cell-item v-for="(n,index) in 4" :key="index" @click.native="goDetails('我的订我的订我的订我的订我的订我的订单')">
          <i class="f-wap-wjj-icon" slot="icon"></i>
          <span slot="left">我的订我的订我的订我的订我的订我的订单</span>
        </yd-cell-item>
      </yd-cell-group>
    </yd-layout>
</template>
<script>

    export default{
      data(){
        return {
          listType: '',
          showType:'1',
          title:''
        }
      },
      mounted(){
        var _self = this;
        _self.listType = _self.$route.params.listType
        _self.showType = _self.$route.params.type
        if(_self.showType==1){
          _self.title = '会议议题'
        }else{
          _self.title = '临时文件'
        }
      },
      methods: {
        goDetails(title){
          var _self = this;
          _self.$router.push({name:'wapTopicFileList',params: { listType: _self.listType ,type:_self.showType,title:title}});
        },
        back(){
          var _self = this;
          if(_self.showType==1){
            _self.$router.push({name:'wapTopicList',params: { listType: _self.listType }})
          }else{
            _self.$router.push({name:'wapFunctions',params: { listType: _self.listType }})
          }
        }
      }
    }
</script>
<style>
  .m-wap-folder-list-hd{
    padding:0.2rem 0.5rem;
    background-color: #fff;
    margin-bottom: 0;
  }
  .m-wap-folder-list-hd .yd-cell-item,
  .m-wap-folder-list-hd .yd-cell-right,
  .m-wap-folder-list-bd .yd-cell-right{
    padding: 0;
  }
  .m-wap-folder-list-hd .yd-cell-left,
  .m-wap-folder-list-bd .yd-cell-left{
      white-space: normal;
  }
  .m-wap-folder-list-hd h2{
    font-family: MicrosoftYaHei;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0px;
    color: #333333;
  }
  .m-wap-folder-list-hd .yd-cell-left p{
    font-family: MicrosoftYaHei;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    line-height: 0.44rem;
  }
  .m-wap-folder-list-hd .yd-cell-left p.f-ex{
   margin: 0.2rem 0;
  }
  .m-wap-folder-list-hd .yd-cell-left p span:nth-of-type(1){
    width: 1.48rem;
    text-align: right;
  }

  .m-wap-folder-list-bd{
    padding: 0.2rem;
  }
  .m-wap-folder-list-bd .yd-cell{
    background-color: transparent;
  }
  .m-wap-folder-list-bd .yd-cell-item{
    padding:0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .m-wap-folder-list-bd i{
    display: inline-block;
  }
  .m-wap-folder-list-bd .yd-cell-left{
   line-height: 0.48rem;
    font-size: 0.28rem;
  }
</style>
