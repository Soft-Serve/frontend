import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
  MenuPage,
  LandingPage,
  SettingsPage,
  SignInPage,
  SignUpPage,
  ConfirmEmailPage,
} from "@views";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "@routes";
import { AllergyProvider, GlobalProvider, ViewportProvider, RestaurantProvider } from "@contexts";
import { client } from "./client";

import { GuestPage } from "./views/GuestPage";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path={`${routes.restaurants}/:id`}>
            <RestaurantProvider>
              <GlobalProvider>
                <ViewportProvider>
                  <AllergyProvider>
                    <GuestPage />
                  </AllergyProvider>
                </ViewportProvider>
              </GlobalProvider>
            </RestaurantProvider>
          </Route>
          <Route exact path={routes.signIn}>
            <RestaurantProvider>
              <MenuPage>
                <SignInPage />
              </MenuPage>
            </RestaurantProvider>
          </Route>
          <Route exact path={routes.signUp}>
            <RestaurantProvider>
              <MenuPage>
                <SignUpPage />
              </MenuPage>
            </RestaurantProvider>
          </Route>
          <Route exact path={routes.confirm}>
            <RestaurantProvider>
              <MenuPage>
                <ConfirmEmailPage />
              </MenuPage>
            </RestaurantProvider>
          </Route>
          <Route exact path={`${routes.settings}/:id`}>
            <RestaurantProvider>
              <GlobalProvider>
                <SettingsPage />
              </GlobalProvider>
            </RestaurantProvider>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
