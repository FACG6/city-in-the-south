import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PrivatePages from './PrivatePages';
import auth from './auth/auth';

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
    islogged: null,
    userInfo: null,
  };

  componentDidMount() {
    auth.authenticate(() => {
      this.setState({ islogged: auth.isAuthenticated });
      if (auth.isAuthenticated) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.setState({ userInfo });
      } else {
        this.setState({ islogged: auth.isAuthenticated });
      }
    });
  }

  isLoggedOut = () => {
    localStorage.removeItem('userInfo');
    this.setState({ islogged: false });
  };

  setUserInfo = (_userInfo, _islogged) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || _userInfo;
    this.setState({ userInfo, islogged: auth.isAuthenticated });
  };

  render() {
    const { islogged } = this.state;
    return (
      <>
        {islogged === null ? (
          <Spinner animation="grow" variant="info" className="loading" />
        ) : (
          <Router>
            <Header islogged={islogged} isLoggedOut={this.isLoggedOut} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/login"
                setUserInfo={this.setUserInfo}
                render={props => (
                  <Login {...props} setUserInfo={this.setUserInfo} />
                )}
              />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/home" component={Home} />
              <Route path="/app" component={PrivatePages} />
              <Route component={PageNotFound} />
            </Switch>
            <Footer />
          </Router>
        )}
      </>
    );
  }
}
