import Vue from 'vue'
import Router from 'vue-router'
import {routers ,routerList} from './router'
import { isMobile } from '../utils/utils'

Vue.use(Router)

const RouterConfig = {
  routes:routers
}
export const router = new Router(RouterConfig)
router.beforeEach((to, from, next)=>{
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
      if (to.path === '/login' || to.path === '/wap/login') {next() } else {
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
      }
    //}
  //客户端
    if(typeof jsObj === "undefined") {
      console.log("你没有对象，不好意思")
    }else {
      var token= jsObj.getUser();
      console.log(token)
    }
})
