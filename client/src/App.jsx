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
      if (auth.isAuthenticated) {
        const userInfo = auth.getUserInfo();
        this.setState({ userInfo, islogged: auth.isAuthenticated });
      } else {
        this.setState({ islogged: auth.isAuthenticated });
      }
    });
  }

  isLoggedOut = () => {
    auth.logout();
    this.setState({ islogged: false });
  };

  setUserInfo = (_userInfo, _islogged) => {
    const userInfo = auth.getUserInfo() || _userInfo;
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
            <div className="body-container">
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
                <Route
                  exact
                  path="/signup"
                  setUserInfo={this.setUserInfo}
                  render={props => (
                    <Signup {...props} setUserInfo={this.setUserInfo} />
                  )}
                />
                <Route exact path="/home" component={Home} />
                <Route path="/app" component={PrivatePages} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
            <Footer />
          </Router>
        )}
      </>
    );
  }
}
