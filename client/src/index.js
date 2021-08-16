import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store/configureStore';
import App from './App';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <React.StrictMode>
      <StylesProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StylesProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
