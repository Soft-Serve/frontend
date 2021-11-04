import React from "react";
import { ApolloProvider } from "@apollo/client";
import { MenuPage, LandingPage, SettingsPage, SignInPage, SignUpPage } from "@views";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "@routes";
import { client } from "./client";

import { AllergyProvider, GlobalProvider, ViewportProvider } from "./contexts";
import { GuestPage } from "./views/GuestPage";

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path={`${routes.restaurants}/:id`}>
          <GlobalProvider>
            <ViewportProvider>
              <AllergyProvider>
                <GuestPage />
              </AllergyProvider>
            </ViewportProvider>
          </GlobalProvider>
        </Route>
        <Route exact path={routes.signIn}>
          <GlobalProvider>
            <MenuPage>
              <SignInPage />
            </MenuPage>
          </GlobalProvider>
        </Route>
        <Route exact path={routes.signUp}>
          <GlobalProvider>
            <MenuPage>
              <SignUpPage />
            </MenuPage>
          </GlobalProvider>
        </Route>
        <Route exact path={`${routes.settings}/:id`}>
          <GlobalProvider>
            <SettingsPage />
          </GlobalProvider>
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
