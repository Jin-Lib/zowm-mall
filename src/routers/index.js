import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routerConfig } from './routeConfig.js'

const routerApp = () => {
  return (
    <Router>
      <Switch>
        {
          routerConfig && routerConfig.length > 0
            ? routerConfig.map(routerItem => {
              return <Route key={routerItem.path} path={routerItem.path} component={routerItem.component} />
            })
            : []
        }
      </Switch>
    </Router>
  )
}

export default routerApp