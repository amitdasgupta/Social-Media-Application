import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; // TODO: Next step
import { composeWithDevTools } from 'redux-devtools-extension';

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
