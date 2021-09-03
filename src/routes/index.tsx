import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { navigation } from './navigation';

const Routes = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      {navigation.map(nav => (
        <Route
          path={nav.path}
          component={nav.component}
          exact={nav.exact}
          key={nav.path}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
