
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TopBar from '../components/TopBar'

import Pacientes from '../pages/pacientes';
import Paciente from '../pages/paciente';

export default function Routes () {
  return (
    <Router>
        <TopBar/>
        <div className="flex flex-col min-h-screen">
            <Switch>
                <Route exact path="/" component={Pacientes}/>
                <Route exatc path="/paciente/:id" component={Paciente}/>
            </Switch>
        </div>
    </Router>
  );
};
