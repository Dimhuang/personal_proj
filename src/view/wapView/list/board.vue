<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="批注白板">
      <div slot="left" @click.stop="back">
        <yd-navbar-back-icon size="0.44rem"></yd-navbar-back-icon>
        <span>返回</span>
      </div>
    </yd-navbar>
    <div class="m-board-view">
      <yd-tab active-color="#1792ff">
        <yd-tab-panel label="文档批注" badge="2">
          <div class="m-board-view-bd">
            <yd-cell-group>
              <yd-cell-item v-for="(n,index) in 4" :key="index">
                <i class="f-wap-pdf-icon" slot="icon"></i>
                <span slot="left">我的订我的订我的订我的订我的订我的订单</span>
              </yd-cell-item>
            </yd-cell-group>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="手写批注" badge="1">
          <div class="m-board-view-bd">
            <yd-lightbox>
              <yd-grids-group :rows="2">
                <yd-grids-item v-for="item, key in list" :key="key">
                  <yd-lightbox-img slot="icon" :src="item.src"></yd-lightbox-img>
                </yd-grids-item>
              </yd-grids-group>
            </yd-lightbox>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="电子白板" badge="3">
          <div class="m-board-view-bd">
            <yd-lightbox>
              <yd-grids-group :rows="2">
                <yd-grids-item v-for="item, key in list" :key="key">
                  <yd-lightbox-img slot="icon" :src="item.src"></yd-lightbox-img>
                </yd-grids-item>
              </yd-grids-group>
            </yd-lightbox>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </yd-layout>
</template>
<script>
  export default{
    data(){
      return {
        list: [
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s1.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s2.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s3.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s4.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s5.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s6.jpg'}
        ]
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
  .m-board-view .yd-tab-nav-item{
    padding-top: 0.4rem;
  }
  .m-board-view .yd-tab-badge,
  .m-board-view .yd-tab-badge .yd-badge{
    font-family: MicrosoftYaHei-Bold;
    font-size: 0.34rem;
    font-stretch: normal;
    letter-spacing: 1px;
    background-color: transparent !important;
    color: rgb(88, 88, 88) !important;
    transform: scale(1) !important;
    font-weight: 700!important;
  }
  .m-board-view .yd-tab-badge{
    text-align: center;
    display: inline-block;
    width: 100%;
    top:6px;
    left: 0;
  }
  .m-board-view .yd-tab-nav .yd-tab-active:before{
    height: 0;
  }

  .m-board-view .yd-tab-nav-item.yd-tab-active .yd-badge{
    color: #1792ff !important;
  }
  .m-board-view-bd{
    padding:0.3rem 0.2rem;
  }
  .m-board-view-bd .yd-cell-right{
    padding: 0;
  }
  .m-board-view-bd .yd-cell-left{
    white-space: normal;
    line-height: 0.48rem;
    font-size: 0.28rem;
  }
  .m-board-view-bd .yd-cell{
    background-color: transparent;
  }
  .m-board-view-bd .yd-cell-item{
    padding:0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
  }
  .m-board-view-bd i{
    display: inline-block;
  }
  .m-board-view-bd .yd-grids-2{
    background-color: transparent;
  }
  .m-board-view-bd .yd-grids-item{
    padding:0;
    margin-bottom: 0.2rem;
  }
  .m-board-view-bd .yd-grids-item:nth-of-type(2n-1){
    padding-right:0.1rem;
  }
  .m-board-view-bd .yd-grids-item:nth-of-type(2n){
    padding-left:0.1rem;
  }
  .m-board-view-bd .yd-grids-icon{
    height: 2.4rem;
    padding: 0.1rem;
    background-color: #fff;
  }


  .m-board-view-bd .yd-grids-icon img{
    height: 100%;
  }
</style>
