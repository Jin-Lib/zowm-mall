import React from 'react';

export const routerConfig = [
  {
    path: '/goodsDetails',
    component: React.lazy(() => import('../views/GoodsDetails'))
  },
  {
    path: '/goodsList',
    component: React.lazy(() => import('../views/GoodsList'))
  },
  {
    path: '/addressAdd',
    component: React.lazy(() => import('../views/Address/edit'))
  },
  {
    path: '/addressList',
    component: React.lazy(() => import('../views/Address/list'))
  },
  {
    path: '/submitOrders',
    component: React.lazy(() => import('../views/SubmitOrders'))
  },
  {
    path: '/myOrder',
    component: React.lazy(() => import('../views/PersonalCenter/MyOrder/index.js'))
  },
  {
    path: '/myOrderDetail',
    component: React.lazy(() => import('../views/PersonalCenter/MyOrderDetail/index.js'))
  },
  {
    path: '/myCourse',
    component: React.lazy(() => import('../views/PersonalCenter/MyCourse/index.js'))
  },
  {
    path: '/starCertification',
    component: React.lazy(() => import('../views/StarCertification'))
  },
  {
    path: '/courseList',
    component: React.lazy(() => import('../views/CourseList'))
  },
  {
    path: '/myData',
    component: React.lazy(() => import('../views/PersonalCenter/MyData/index.js'))
  },
  {
    path: '/mySign',
    component: React.lazy(() => import('../views/PersonalCenter/MySign/index.js'))
  },
  {
    path: '/eventList',
    component: React.lazy(() => import('../views/Event/EventList/index.js'))
  },
  {
    path: '/eventDivision',
    component: React.lazy(() => import('../views/Event/EventDivision/index.js'))
  },
  {
    path: '/player',
    component: React.lazy(() => import('../views/Player'))
  },
  {
    path: '/eventVoteZone',
    component: React.lazy(() => import('../views/Event/EventVoteZone/index.js'))
  },
  {
    path: '/eventVoteZoneShare',
    component: React.lazy(() => import('../views/Event/EventVoteZoneShare/index.js'))
  },
  {
    path: '/dances',
    component: React.lazy(() => import('../views/Dances'))
  },
  {
    path: '/eventDetail',
    component: React.lazy(() => import('../views/Event/EventDivision/components/EventDetails/index.js'))
  },
  {
    path: '/sharePage',
    component: React.lazy(() => import('../views/SharePage'))
  },
  {
    path: '/success',
    component: React.lazy(() => import('../views/Success'))
  }
]