import React from "react";
import { ApolloProvider } from "@apollo/client";
import { LazySettingsPage, ConfirmEmailPage, LazyGuestPage, LazyLandingPage } from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@routes";
import { client } from "./client";
import { LazySignInPage } from "./views/SignInPage";
import { LazySignUpPage } from "./views/SignUpPage";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
          <Route path={`${routes.restaurants}/:id`} element={<LazyGuestPage />} />
          <Route path={routes.signIn} element={<LazySignInPage />} />
          <Route path={routes.signUp} element={<LazySignUpPage />} />
          <Route path={routes.confirm} element={<ConfirmEmailPage />} />
          <Route path={`${routes.settings}/:id/:setting`} element={<LazySettingsPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
