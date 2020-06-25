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
  }
]