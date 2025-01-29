import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layouts';

export default function App() {
    return (
        <Router>
            <Layout>

                <Switch>
                <Route path="/">
                    <HomePage />
                </Route>
                <Route path="/about">
                    <AboutPage />
                </Route>
                </Switch>
            </Layout>
        </Router>
    );
}