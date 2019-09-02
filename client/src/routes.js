import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/layout';
import BookView from './components/Books';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home)} />
                <Route path="/books/:id" exact component={BookView} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Layout>
    )
}
export default Routes;