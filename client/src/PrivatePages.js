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
          <Route
            exact
            path="/my-applications"
            render={() => <MyApplications />}
          />
          <Route exact path="/my-offers" render={() => <MyOffers />} />
          <Route
            exact
            path="/offers/:offerId"
            render={() => <OfferDetails />}
          />
          <Route exact path="/new-offer" render={() => <CreateOffer />} />
          <Route exact path="/saved-offers" render={() => <SavedOffers />} />
          <Route exact path="/profile/:username" render={() => <Profile />} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default PrivatePages;
