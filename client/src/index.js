import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
