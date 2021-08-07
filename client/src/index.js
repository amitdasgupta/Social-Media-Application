import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDom.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
