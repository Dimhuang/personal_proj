import Vue from 'vue'
import Router from 'vue-router'
import {routers ,routerList} from './router'
import { isMobile } from '../utils/utils'

Vue.use(Router)

const RouterConfig = {
  mode: 'history',
  routes:routers
}
export const router = new Router(RouterConfig)


router.beforeEach((to, from, next)=>{
  if(to.matched[0].meta.is_first != undefined){
    isMobile(function(is_mobile){
      if(is_mobile){
        if(to.path === '/wap'){
          next()
        }else if(to.path === '/wap/index'){
          next()
        }else{
          next('/wap')
        }
      }else{
        if(to.path === '/'){
          next()
        }else if(to.path === '/index'){
          next()
        }else{
          next('/')
        }
      }
    })
  }else{
    next()
  }
})
