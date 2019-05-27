import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivatePages from './PrivatePages';

import {
  LandingPage,
  Login,
  Signup,
  Home,
  Header,
  Footer,
  PageNotFound,
} from './Components';

export default class App extends Component {
  state = {
    islooged: true,
    userInfo: null,
  };

  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route path="/app" component={PrivatePages} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}
