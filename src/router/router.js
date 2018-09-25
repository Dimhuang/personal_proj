export const routerList = [
  //pc路由
  {
    path: '/',
    name: 'pcHome',
    meta:{
      is_first:true
    },
    component: resolve => require(["@/view/pcView/home"], resolve)
  },{
    path: '/index',
    name: 'pcHome',
    meta:{
      is_first:true
    },
    component: resolve => require(["@/view/pcView/home"], resolve)
  },{
    path: '/login',
    name: 'pcLogin',
    component: resolve => require(["@/view/pcView/login/login"], resolve)
  },{
    path: '/list/historyList',
    name: 'historyList',
    component: resolve => require(["@/view/pcView/list/historyList"], resolve),
    children: [
      {
        path: '/list/historyList/topics',
        name:'topics',
        component: resolve => require(["@/view/pcView/list/historyTopics"], resolve)
      },{
        path: '/list/historyList/topicsList',
        name:'topicsList',
        component: resolve => require(["@/view/pcView/list/historyTopicsList"], resolve)
      },{
        path: '/list/historyList/topicsDetails',
        name:'topicsDetails',
        component: resolve => require(["@/view/pcView/list/historyTopicsDetails"], resolve)
      }
    ]
   /* redirect:{
      path: '/list/historyList/topics'
    }*/
  },
  {
    path: '/list/meetingList',
    name: 'meetingList',
    component: resolve => require(["@/view/pcView/list/meetingList"], resolve)
  },
  //mobile路由
  {
    path: '/wap',
    name: 'wapHome',
    meta:{
      is_first:true
    },
    component: resolve => require(["@/view/wapView/home"], resolve)
  },{
    path: '/wap/index',
    name: 'wapHome',
    meta:{
      is_first:true
    },
    component: resolve => require(["@/view/wapView/home"], resolve)
  },{
    path: '/wap/login',
    name: 'wapLogin',
    component: resolve => require(["@/view/wapView/login/login"], resolve)
  }
]



export const routers = [
  ...routerList
]
