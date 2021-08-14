import { Redirect } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar/TopBar';
import styles from '../stylesheets/pages/Home.module.scss';
import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
export default function ProtectRoute({ component: Component, ...rest }) {
  return (
    <Suspense fallback={'Loading......'}>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <>
              <TopBar />
              <div className={styles.mainContent}>
                <Sidebar />
                <Component {...rest} />
              </div>
            </>
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    </Suspense>
  );
}
