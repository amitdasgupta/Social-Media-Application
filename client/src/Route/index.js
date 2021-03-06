import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import Login from '../Pages/Auth';
import Settings from '../Pages/Settings';

const ROUTES = {
  PUBLIC: [
    {
      path: '/',
      key: 'ROOT',
      exact: true,
      component: () => <Redirect to="/auth" />,
    },
    {
      path: '/auth',
      key: 'Auth',
      exact: true,
      component: Login,
    },
  ],
  PRIVATE: [
    {
      path: '/app/settings',
      key: 'Settings Page',
      component: () => <Settings />,
      exact: true,
    },
    {
      path: '/app',
      key: 'APP',
      component: Home,
    },
    {
      path: '/app/profile',
      key: 'Profile Page',
      component: () => <h1>Profile Page</h1>,
      exact: true,
    },

    {
      path: '/app/chat',
      key: 'Chat Page',
      component: () => <h1>Chat Page</h1>,
      exact: true,
    },

    {
      path: '/',
      key: 'pageNotFound',
      component: () => <h1>404 Page not found</h1>,
    },
  ],
};
export default ROUTES;

export function RouteWithSubRoutes(route, type) {
  return (
    <Route
      key={route.key}
      path={route.path}
      exact={route.exact}
      render={(props) =>
        type === 'public' ? (
          <PublicPage {...route} {...props} />
        ) : (
          <PrivatePage {...route} {...props} />
        )
      }
    />
  );
}
