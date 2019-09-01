import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Routes from './routes';
import reducer from './reducers/index';
const createStorewithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDom.render(
    <Provider store={createStorewithMiddleware(reducer)}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));