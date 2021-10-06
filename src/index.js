import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './globals.scss'

import Container from './pages/Container'
import Main from './pages/Main'
import { NewTable } from './pages/NewTable'
import { TableDetails } from './pages/TableDetails'

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Router>
        <Switch>
          <Route path='/tables' exact component={Main} />
          <Route path='/tables/new' exact component={NewTable} />
          <Route path='/tables/details/:name' exact component={TableDetails} />
          <Redirect to='/tables' />
        </Switch>
      </Router>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);