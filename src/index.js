import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App'
import './../node_modules/sweetalert/dist/sweetalert.css';

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this come    s with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
