import { Redirect } from 'react-router-dom';

import { Suspense } from 'react';
import { Route } from 'react-router-dom';
export default function ProtectRoute({
  component: Component,
  routes,
  ...rest
}) {
  const isAuthenticated = true;
  console.log(rest, 'rest');
  return (
    <Suspense fallback={'Loading......'}>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component routes={routes} {...props} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    </Suspense>
  );
}
