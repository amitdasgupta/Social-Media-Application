import ROUTES, { RouteWithSubRoutes } from './Route';

import { Switch } from 'react-router-dom';

function App() {
  const { PUBLIC = [], PRIVATE = [] } = ROUTES;
  return (
    <div className="App">
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
