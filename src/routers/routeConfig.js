import React from 'react';

export const routerConfig = [
  {
    path: '/goodsDetails',
    component: React.lazy(() => import('../views/GoodsDetails'))
  }
]