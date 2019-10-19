import Vue from 'vue'
import Router from 'vue-router'
import {routers ,routerList} from './router'
import { isMobile ,getRequest} from '../utils/utils'
import { language } from '@/assets/language/language.js'
import { QWebChannel } from  '@/assets/js/qwebchannel.js'
Vue.use(Router)

const RouterConfig = {
  routes:routers
}
export const router = new Router(RouterConfig)
router.beforeEach((to, from, next)=>{
    sessionStorage.setItem('lang' ,'chinese')
   /* if(to.meta.is_first != undefined){
      isMobile(function(is_mobile){
        if(is_mobile){
          if(to.path === '/wap'||to.path === '/wap/index'){
            //next()
            if(to.path === '/wap/login') { next() }
            else {
              if(to.meta.requiresAuth && !sessionStorage.getItem('wapAccessToken')) {next({ path: '/wap/login' })}
              else { next() }}
          }else{
            next('/wap')
          }
        }else{
          if(to.path === '/'||to.path === '/index'){
            //next()
            if(to.path === '/login') { next() }
            else {
              if(to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {next({ path: '/login' })}
              else { next() }}
          }else{
            next('/')
          }
        }
      })
    }else {*/
     /* if (to.path === '/login' || to.path === '/wap/login') {next() } else {
        isMobile(function (is_mobile) {
          if (is_mobile) {
            if (to.meta.requiresAuth && !sessionStorage.getItem('wapAccessToken')) {
              next({path: '/wap/login'})
            }
            else {
              next()
            }
          } else {
            if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
              next({path: '/login'})
            }
            else {
              next()
            }
          }
        })
      }*/
    //}
  if(to.path === '/'){
    sessionStorage.removeItem('wapAccessToken')
    sessionStorage.removeItem('accessToken')
  }

  //客户端
  sessionStorage.removeItem('showLogin')

  //麒麟
  /*if(typeof qt === "undefined") {
    sessionStorage.setItem('showLogin' ,true)
    if (to.path === '/login' || to.path === '/wap/login') {next() } else {
      isMobile(function (is_mobile) {
        if (is_mobile) {
          getRequest(function(item){
            if(item.username!=null&&item.pwd!=null){
              sessionStorage.setItem('adName' , item.username)
              sessionStorage.setItem('adPwd' ,item.pwd)
              sessionStorage.setItem('adType' ,item.device)
            }
          })
          if (to.meta.requiresAuth && !sessionStorage.getItem('wapAccessToken')) {
            next({path: '/wap/login'})
          }
          else {
            next()
          }
        } else {
          if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
            next({path: '/login'})
          }
          else {
            next()
          }
        }
      })
    }
  }else {
   //麒麟
    var jsObj = '';
    var token=[]
    new QWebChannel(qt.webChannelTransport,function(channel) {
      jsObj = channel.objects.jsObj;
      jsObj.sendUserInfo(function(returnValue){
        token =  JSON.parse(returnValue)
        console.log('getinfo'+JSON.stringify(token))
        sessionStorage.removeItem('lang')
        sessionStorage.setItem('objName' , token.userJson.userName)
        sessionStorage.setItem('objPwd' ,token.userJson.passWord)
        sessionStorage.setItem('lang' ,token.userJson.language)
        sessionStorage.setItem('showLogin' ,false)
      })

    });

    next()
  }*/
  //========================================================================分割线=============================

  /*if(typeof jsObj === "undefined") {
    sessionStorage.setItem('showLogin' ,true)
    if (to.path === '/login' || to.path === '/wap/login') {next() } else {
      isMobile(function (is_mobile) {
        if (is_mobile) {
          getRequest(function(item){
            if(item.username!=null&&item.pwd!=null){
              sessionStorage.setItem('adName' , item.username)
              sessionStorage.setItem('adPwd' ,item.pwd)
              sessionStorage.setItem('adType' ,item.device)
            }
          })
          if (to.meta.requiresAuth && !sessionStorage.getItem('wapAccessToken')) {
            next({path: '/wap/login'})
          }
          else {
            next()
          }
        } else {
          if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
            next({path: '/login'})
          }
          else {
            next()
          }
        }
      })
    }

  }else{
     //3.0
     var token= JSON.parse(jsObj.getUser())


     console.log('kehuduan='+token)
     sessionStorage.removeItem('lang')
     sessionStorage.setItem('objName' , token.userJson.userName)
     sessionStorage.setItem('objPwd' ,token.userJson.passWord)
     sessionStorage.setItem('lang' ,token.userJson.language)
     sessionStorage.setItem('globalObj' , 1)
     sessionStorage.setItem('showLogin' ,false)
     next()
   }*/



  /*if(typeof jsObj !== "undefined"){
    //3.0
    var token= JSON.parse(jsObj.getUser())
    console.log('kehuduan='+token)
    sessionStorage.removeItem('lang')
    sessionStorage.setItem('objName' , token.userJson.userName)
    sessionStorage.setItem('objPwd' ,token.userJson.passWord)
    sessionStorage.setItem('lang' ,token.userJson.language)
    sessionStorage.setItem('globalObj' , 1)
    sessionStorage.setItem('showLogin' ,false)
    next()
  }else if(typeof qt !== "undefined"){
    //麒麟
    var jsObj = '';
    var token=[]
    new QWebChannel(qt.webChannelTransport,function(channel) {
      jsObj = channel.objects.jsObj;
      jsObj.sendUserInfo(function(returnValue){
        token =  JSON.parse(returnValue)
        console.log('getinfo'+JSON.stringify(token))
        sessionStorage.removeItem('lang')
        sessionStorage.setItem('objName' , token.userJson.userName)
        sessionStorage.setItem('objPwd' ,token.userJson.passWord)
        sessionStorage.setItem('lang' ,token.userJson.language)
        sessionStorage.setItem('globalObj' , 2)
        sessionStorage.setItem('showLogin' ,false)
      })
    });

    next()
  }else */
  if(typeof jsObj === "undefined"){
    if(typeof qt === "undefined"){
      //sessionStorage.setItem('showLogin' ,true)
      if (to.path === '/login' || to.path === '/wap/login') {next() } else {
        isMobile(function (is_mobile) {
          if (is_mobile) {
            getRequest(function(item){
              if(item.username!=null&&item.pwd!=null){
                sessionStorage.setItem('adName' , item.username)
                sessionStorage.setItem('adPwd' ,item.pwd)
                sessionStorage.setItem('adType' ,item.device)
                sessionStorage.setItem('globalObj' , 1)
                sessionStorage.setItem('showLogin' ,1)
              }
            })
            if (to.meta.requiresAuth && !sessionStorage.getItem('wapAccessToken')) {
              next({path: '/wap/login'})
            }
            else {
              next()
            }
          } else {
            sessionStorage.setItem('showLogin' ,1)
            sessionStorage.setItem('globalObj' , 1)
            if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
              next({path: '/login'})
            }
            else {
              next()
            }
          }
        })
      }
    }else{
      //麒麟
      var qlJsObj = '';
      var qlToken=[]
      new QWebChannel(qt.webChannelTransport,function(channel) {
        qlJsObj = channel.objects.jsObj;
        qlJsObj.sendUserInfo(function(returnValue){
          qlToken =  JSON.parse(returnValue)
          console.log('qlgetinfo'+JSON.stringify(qlToken))
          sessionStorage.removeItem('lang')
          sessionStorage.setItem('objName' , qlToken.userJson.userName)
          sessionStorage.setItem('objPwd' ,qlToken.userJson.passWord)
          sessionStorage.setItem('lang' ,qlToken.userJson.language)
          sessionStorage.setItem('globalObj' , 2)
          sessionStorage.setItem('showLogin' ,0)
        })
      });
      next()
    }
  }else{
      //3.0
      var token= JSON.parse(jsObj.getUser())
      console.log('kehuduan='+token)
      sessionStorage.removeItem('lang')
      sessionStorage.setItem('objName' , token.userJson.userName)
      sessionStorage.setItem('objPwd' ,token.userJson.passWord)
      sessionStorage.setItem('lang' ,token.userJson.language)
      sessionStorage.setItem('globalObj' , 1)
      sessionStorage.setItem('showLogin' ,0)
    console.log('aaaglobalObj='+sessionStorage.getItem('globalObj'))
      next()
  }
  //========================================================================分割线=============================

  Vue.prototype.$lang=language[sessionStorage.getItem('lang')];
})
