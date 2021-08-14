import ROUTES, { RouteWithSubRoutes } from './Route';
import styles from './stylesheets/App.module.scss';
import { Switch } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth';
import cx from 'classnames';

function App() {
  const { PUBLIC = [], PRIVATE = [] } = ROUTES;
  const _className = cx({
    [styles.main]: !isAuthenticated,
    [styles.loggedIn]: isAuthenticated,
  });
  return (
    <div className={_className}>
      <Switch>
        {PUBLIC.map((routeConfig) => RouteWithSubRoutes(routeConfig, 'public'))}
        {PRIVATE.map((routeConfig) =>
          RouteWithSubRoutes(routeConfig, 'private')
        )}
      </Switch>
    </div>
  );
}

export default App;
