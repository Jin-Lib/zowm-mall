import React from 'react';

const Home = React.lazy(() => import('../views/Home'))

export const routerConfig = [
  {
    path: '/home',
    component: Home
  }
]