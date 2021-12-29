import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
  MenuPage,
  LazySettingsPage,
  SignInPage,
  SignUpPage,
  ConfirmEmailPage,
  AdminPage,
  LazyGuestPage,
  LazyLandingPage,
} from "@views";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "@routes";
import { AllergyProvider, GlobalProvider, ViewportProvider, RestaurantProvider } from "@contexts";
import { client } from "./client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LazyLandingPage />
          </Route>
          <Route exact path={`${routes.restaurants}/:id`}>
            <RestaurantProvider>
              <GlobalProvider>
                <ViewportProvider>
                  <AllergyProvider>
                    <LazyGuestPage />
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
          <Route exact path={routes.admin}>
            <RestaurantProvider>
              <MenuPage>
                <AdminPage />
              </MenuPage>
            </RestaurantProvider>
          </Route>
          <Route exact path={`${routes.settings}/:id/:setting`}>
            <RestaurantProvider>
              <GlobalProvider>
                <ViewportProvider>
                  <LazySettingsPage />
                </ViewportProvider>
              </GlobalProvider>
            </RestaurantProvider>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
