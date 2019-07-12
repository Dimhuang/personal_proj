import Vue from 'vue'
import Router from 'vue-router'
import {routers ,routerList} from './router'
import { isMobile ,getRequest} from '../utils/utils'
import { language } from '@/assets/language/language.js'
Vue.use(Router)

const RouterConfig = {
  routes:routers
}
export const router = new Router(RouterConfig)
router.beforeEach((to, from, next)=>{
    sessionStorage.setItem('lang' ,'english')
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
    if(typeof jsObj === "undefined") {
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
      var token= JSON.parse(jsObj.getUser())
      sessionStorage.removeItem('lang')
      sessionStorage.setItem('objName' , token.userJson.userName)
      sessionStorage.setItem('objPwd' ,token.userJson.passWord)
      sessionStorage.setItem('lang' ,token.userJson.language)
      sessionStorage.setItem('showLogin' ,false)
      next()
    }
    Vue.prototype.$lang=language[sessionStorage.getItem('lang')];
})
