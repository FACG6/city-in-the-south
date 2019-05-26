import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import allComponents from './Routes/allComponents';

const {
  LandingPage,
  Login,
  Signup,
  Home,
  Header,
  Footer,
  MyApplications,
  MyOffers,
  NewOffer,
  OfferDetails,
  SavedOffers,
  Profile,
  PageNotFound,
} = allComponents;

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" Component={LandingPage} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/home" Component={Home} />
          <Route exact path="/my-applications" Component={MyApplications} />
          <Route exact path="/my-offers" Component={MyOffers} />
          <Route exact path="/offers/:offerId" Component={OfferDetails} />
          <Route exact path="/new-offer" Component={NewOffer} />
          <Route exact path="/saved-offers" Component={SavedOffers} />
          <Route exact path="/profile/:username" Component={Profile} />
          <Route Component={PageNotFound} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
