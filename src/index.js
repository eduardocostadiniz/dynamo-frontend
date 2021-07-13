import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './globals.scss'

import Container from './pages/Container'
import Main from './pages/Main'
import { TableDetails } from './pages/TableDetails'

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Router>
        <Switch>
          <Route path='/tables' exact component={Main} />
          <Route path='/tables/:name' exact component={TableDetails} />
          <Redirect to='/tables' />
        </Switch>
      </Router>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);