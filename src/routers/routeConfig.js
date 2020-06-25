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
    path: '/myCourse',
    component: React.lazy(() => import('../views/PersonalCenter/MyCourse/index.js'))
  },
  {
    path: '/myData',
    component: React.lazy(() => import('../views/PersonalCenter/MyData/index.js'))
  }
]