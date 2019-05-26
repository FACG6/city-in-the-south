import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  Header,
  Footer,
  MyApplications,
  MyOffers,
  CreateOffer,
  OfferDetails,
  SavedOffers,
  Profile,
} from './Components';

function PrivatePages() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/my-applications" Component={MyApplications} />
          <Route exact path="/my-offers" Component={MyOffers} />
          <Route exact path="/offers/:offerId" Component={OfferDetails} />
          <Route exact path="/new-offer" Component={CreateOffer} />
          <Route exact path="/saved-offers" Component={SavedOffers} />
          <Route exact path="/profile/:username" Component={Profile} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default PrivatePages;
