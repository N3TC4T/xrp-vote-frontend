// libs
import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router-dom/BrowserRouter';
import createBrowserHistory from 'history/createBrowserHistory';


// Includes
import App from './containers/App';
import './include/bootstrap'
import './assets/css/index.css';
import './assets/js/main'

// router
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);
