export const routerList = [
  //pc路由
  {
    path: '/',
    name: 'pcHome',
    meta:{
      requiresAuth: true
    },
    component: resolve => require(["@/view/pcView/home"], resolve)
  },{
    path: '/index',
    name: 'pcHome',
    meta:{
      requiresAuth: true
    },
    component: resolve => require(["@/view/pcView/home"], resolve)
  },{
    path: '/login',
    name: 'pcLogin',
    component: resolve => require(["@/view/pcView/login/login"], resolve)
  },{
    path: '/list/historyList',
    name: 'historyList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/pcView/list/historyList"], resolve),
    children: [
      {
        path: '/list/historyList/topics',
        name:'topics',
        meta: {
          requiresAuth: true
        },
        component: resolve => require(["@/view/pcView/list/historyTopics"], resolve)
      },{
        path: '/list/historyList/topicsList',
        name:'topicsList',
        meta: {
          requiresAuth: true
        },
        component: resolve => require(["@/view/pcView/list/historyTopicsList"], resolve)
      },{
        path: '/list/historyList/topicsDetails',
        name:'topicsDetails',
        meta: {
          requiresAuth: true
        },
        component: resolve => require(["@/view/pcView/list/historyTopicsDetails"], resolve)
      },{
        path: '/list/historyList/stmpfile',
        name:'stmpfile',
        component: resolve => require(["@/view/pcView/list/historyStmpFiles"], resolve)
      },{
        path: '/list/historyList/stmpfileDetails',
        name:'stmpfileDetails',
        meta: {
          requiresAuth: true
        },
        component: resolve => require(["@/view/pcView/list/historyStmpfileDetails"], resolve)
      }
    ]
   /* redirect:{
      path: '/list/historyList/topics'
    }*/
  },
  {
    path: '/list/meetingList',
    name: 'meetingList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/pcView/list/meetingList"], resolve)
  },
  //mobile路由
  {
    path: '/wap',
    name: 'wapHome',
    meta:{
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/home"], resolve)
  },{
    path: '/wap/index',
    name: 'wapHome',
    meta:{
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/home"], resolve)
  },{
    path: '/wap/login',
    name: 'wapLogin',
    component: resolve => require(["@/view/wapView/login/login"], resolve)
  },{
    path: '/wap/register',
    name: 'wapRegister',
    component: resolve => require(["@/view/wapView/login/register"], resolve)
  },{
    path: '/wap/meetingList',
    name: 'wapMeetingList',
    meta: {
      requiresAuth: true,
      requiresAd:false
    },
    component: resolve => require(["@/view/wapView/list/meetingList"], resolve)
  },{
    path: '/wap/functions',
    name: 'wapFunctions',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/functions"], resolve)
  },{
    path: '/wap/meetingMsg',
    name: 'wapMeetingMsg',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/meetingMsg"], resolve)
  },{
    path: '/wap/userList',
    name: 'wapUserList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/userList"], resolve)
  },{
    path: '/wap/topicList',
    name: 'wapTopicList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/topicList"], resolve)
  },{
    path: '/wap/topicFolderList',
    name: 'wapTopicFolderList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/topicFolderList"], resolve)
  },{
    path: '/wap/topicFileList',
    name: 'wapTopicFileList',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/topicFileList"], resolve)
  },{
    path: '/wap/vote',
    name: 'wapVote',
    component: resolve => require(["@/view/wapView/list/vote"], resolve)
  },{
    path: '/wap/voteSelect',
    name: 'wapVoteSelect',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/voteSelect"], resolve)
  },{
    path: '/wap/voteDetails',
    name: 'wapVoteDetails',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/voteDetails"], resolve)
  },{
    path: '/wap/board',
    name: 'wapBoard',
    meta: {
      requiresAuth: true
    },
    component: resolve => require(["@/view/wapView/list/board"], resolve)
  }
]



export const routers = [
  ...routerList
]
