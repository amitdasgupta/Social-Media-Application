import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import Login from '../Pages/Auth';

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
      key: 'LOGIN',
      exact: true,
      component: Login,
    },
  ],
  PRIVATE: [
    {
      path: '/app',
      key: 'APP',
      component: Home,
      exact: true,
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
