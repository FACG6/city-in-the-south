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
import PrivateRoute from './auth/PrivateRoute';

function PrivatePages() {
  return (
    <>
      <Switch>
        <PrivateRoute
          exact
          path="/app/my-applications"
          component={MyApplications}
        />
        <PrivateRoute exact path="/app/my-offers" component={MyOffers} />
        <PrivateRoute
          exact
          path="/app/offers/:offerId"
          component={OfferDetails}
        />
        <PrivateRoute exact path="/app/new-offer" component={CreateOffer} />
        <PrivateRoute exact path="/app/saved-offers" component={SavedOffers} />
        <PrivateRoute exact path="/app/profile/:username" component={Profile} />
        <PrivateRoute component={PageNotFound} />
      </Switch>
    </>
  );
}

export default PrivatePages;
