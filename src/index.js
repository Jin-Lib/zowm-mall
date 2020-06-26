import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import Router from './routers';
import Loading from './views/Loading'

import * as serviceWorker from './serviceWorker';

import './index.scss';

import 'amfe-flexible';
import './assets/css/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={(<Loading/>)}>
      <Router />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
