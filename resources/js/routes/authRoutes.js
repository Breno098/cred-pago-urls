
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../pages/Auth';

export default function AuthRoutes () {
  return (
    <Router>
        <div className="flex flex-col min-h-screen">
            <Switch>
                <Route path="/" component={Auth}/>
            </Switch>
        </div>
    </Router>
  );
};
