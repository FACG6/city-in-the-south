import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivatePages from './PrivatePages';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    islogged: true,
    userInfo: null,
  };

  render() {
    const { islogged } = this.state;
    return (
      <>
        <Router>
          <Header islogged={islogged} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
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
