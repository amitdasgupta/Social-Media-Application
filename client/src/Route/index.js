import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import Login from '../Pages/Login';

const ROUTES = {
  PUBLIC: [
    {
      path: '/',
      key: 'ROOT',
      exact: true,
      component: () => <Redirect to="/login" />,
    },
    {
      path: '/login',
      key: 'LOGIN',
      exact: true,
      component: Login,
    },
    {
      path: '/signup',
      exact: true,
      key: 'SIGNUP',
      component: () => <h1>Sign up</h1>,
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
