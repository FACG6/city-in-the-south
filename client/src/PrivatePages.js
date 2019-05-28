import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  PageNotFound,
  MyApplications,
  CreateOffer,
  OfferDetails,
  SavedOffers,
  Profile,
  MyOffers,
} from './Components';

function PrivatePages() {
  return (
    <>
      <Switch>
        <Route exact path="/app/my-applications" component={MyApplications} />
        <Route exact path="/app/my-offers" component={MyOffers} />
        <Route exact path="/app/offers/:offerId" component={OfferDetails} />
        <Route exact path="/app/new-offer" component={CreateOffer} />
        <Route exact path="/app/saved-offers" component={SavedOffers} />
        <Route exact path="/app/profile/:username" component={Profile} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default PrivatePages;
