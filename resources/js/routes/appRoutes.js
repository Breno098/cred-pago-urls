
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TopBar from '../components/TopBar'

import AppIndex from '../pages/AppIndex';
import BodyResponse from '../pages/BodyResponse';

export default function AppRoutes () {
  return (
    <Router>
        <TopBar/>
        <div className="flex flex-col min-h-screen">
            <Switch>
                <Route exact path="/" component={AppIndex}/>
                <Route exatc path="/url/:id" component={BodyResponse}/>
            </Switch>
        </div>
    </Router>
  );
};
