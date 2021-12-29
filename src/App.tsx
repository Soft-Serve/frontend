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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@routes";
import { AllergyProvider, GlobalProvider, ViewportProvider, RestaurantProvider } from "@contexts";
import { client } from "./client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
          <Route
            path={`${routes.restaurants}/:id`}
            element={
              <RestaurantProvider>
                <GlobalProvider>
                  <ViewportProvider>
                    <AllergyProvider>
                      <LazyGuestPage />
                    </AllergyProvider>
                  </ViewportProvider>
                </GlobalProvider>
              </RestaurantProvider>
            }
          />
          <Route
            path={routes.signIn}
            element={
              <RestaurantProvider>
                <MenuPage>
                  <SignInPage />
                </MenuPage>
              </RestaurantProvider>
            }
          />
          <Route
            path={routes.signUp}
            element={
              <RestaurantProvider>
                <MenuPage>
                  <SignUpPage />
                </MenuPage>
              </RestaurantProvider>
            }
          />
          <Route
            path={routes.confirm}
            element={
              <RestaurantProvider>
                <MenuPage>
                  <ConfirmEmailPage />
                </MenuPage>
              </RestaurantProvider>
            }
          />
          <Route
            path={routes.admin}
            element={
              <RestaurantProvider>
                <MenuPage>
                  <AdminPage />
                </MenuPage>
              </RestaurantProvider>
            }
          />
          <Route
            path={`${routes.settings}/:id/:setting`}
            element={
              <RestaurantProvider>
                <GlobalProvider>
                  <ViewportProvider>
                    <LazySettingsPage />
                  </ViewportProvider>
                </GlobalProvider>
              </RestaurantProvider>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
