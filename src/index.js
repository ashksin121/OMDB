import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import reducer from './reducers';
import thunk from 'redux-thunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store = {store}>
    <ToastContainer 
        enableMultiContainer 
        containerId={'toastMessage'} 
        position={toast.POSITION.TOP_RIGHT} 
        autoClose = {2000}
    />
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
