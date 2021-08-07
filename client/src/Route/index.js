import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
const HomeComponent = React.lazy(() => import('../Pages/Home'));

const ROUTES = {
  PUBLIC: [
    {
      path: '/login',
      key: 'ROOT',
      exact: true,
      component: () => <h1>Log in</h1>,
    },
    {
      path: '/signup',
      exact: true,
      component: () => <h1>Sign up</h1>,
    },
  ],
  PRIVATE: [
    {
      path: '/app',
      key: 'APP',
      component: RenderRoutes, // here's the update
      routes: [
        {
          path: '/app',
          key: 'APP_ROOT',
          exact: true,
          component: () => <HomeComponent />,
        },
        {
          path: '/app/page',
          key: 'APP_PAGE',
          component: RenderRoutes,
          routes: [
            {
              path: '/app/page',
              key: 'APP_PAGE_1',
              exact: true,
              component: () => <h1>App Page</h1>,
            },
            {
              path: '/app/page/data',
              key: 'APP_PAGE_2',
              exact: true,
              component: () => <h1>App Page Data</h1>,
            },
          ],
        },
      ],
    },
  ],
};
export default ROUTES;

function RouteWithSubRoutes(route) {
  console.log(route, 'in sub');
  return <ProtectedRoute path={route.path} exact={route.exact} {...route} />;
}

export function RenderRoutes({ routes }) {
  console.log(routes, 'renderroutes');
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <RouteWithSubRoutes
            key={route.key}
            // RouteType={RouteType}
            {...route}
          />
        );
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
