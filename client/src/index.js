/* istanbul ignore file */
import './view/css/index.css';
import App from './view/components/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
