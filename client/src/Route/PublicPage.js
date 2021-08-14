import { Redirect } from 'react-router-dom';

import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
export default function ProtectRoute({
  component: Component,
  routes,
  ...rest
}) {
  return (
    <Suspense fallback={'Loading......'}>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? (
            <Component routes={routes} {...props} />
          ) : (
            <Redirect to={{ pathname: '/app' }} />
          )
        }
      />
    </Suspense>
  );
}
