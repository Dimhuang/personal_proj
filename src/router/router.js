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
      },{
        path: '/list/historyList/stmpfile',
        name:'stmpfile',
        component: resolve => require(["@/view/pcView/list/historyStmpfile"], resolve)
      },{
        path: '/list/historyList/stmpfileDetails',
        name:'stmpfileDetails',
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
  },{
    path: '/wap/register',
    name: 'wapRegister',
    component: resolve => require(["@/view/wapView/login/register"], resolve)
  },{
    path: '/wap/meetingList',
    name: 'wapMeetingList',
    component: resolve => require(["@/view/wapView/list/meetingList"], resolve)
  },{
    path: '/wap/functions',
    name: 'wapFunctions',
    component: resolve => require(["@/view/wapView/list/functions"], resolve)
  },{
    path: '/wap/meetingMsg',
    name: 'wapMeetingMsg',
    component: resolve => require(["@/view/wapView/list/meetingMsg"], resolve)
  },{
    path: '/wap/userList',
    name: 'wapUserList',
    component: resolve => require(["@/view/wapView/list/userList"], resolve)
  },{
    path: '/wap/topicList',
    name: 'wapTopicList',
    component: resolve => require(["@/view/wapView/list/topicList"], resolve)
  },{
    path: '/wap/topicFolderList',
    name: 'wapTopicFolderList',
    component: resolve => require(["@/view/wapView/list/topicFolderList"], resolve)
  },{
    path: '/wap/topicFileList',
    name: 'wapTopicFileList',
    component: resolve => require(["@/view/wapView/list/topicFileList"], resolve)
  },{
    path: '/wap/vote',
    name: 'wapVote',
    component: resolve => require(["@/view/wapView/list/vote"], resolve)
  },{
    path: '/wap/voteSelect',
    name: 'wapVoteSelect',
    component: resolve => require(["@/view/wapView/list/voteSelect"], resolve)
  },{
    path: '/wap/voteDetails',
    name: 'wapVoteDetails',
    component: resolve => require(["@/view/wapView/list/voteDetails"], resolve)
  },{
    path: '/wap/board',
    name: 'wapBoard',
    component: resolve => require(["@/view/wapView/list/board"], resolve)
  }
]



export const routers = [
  ...routerList
]
