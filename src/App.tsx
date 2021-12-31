import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
  LazyConfirmEmailPage,
  GuestPage,
  SignInMainPage,
  SignUpMainPage,
  SettingsPage,
  LandingPage,
} from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@routes";
import { client } from "./client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={`${routes.restaurants}/:id`} element={<GuestPage />} />
          <Route path={routes.signIn} element={<SignInMainPage />} />
          <Route path={routes.signUp} element={<SignUpMainPage />} />
          <Route path={`${routes.settings}/:id/:setting`} element={<SettingsPage />} />
          <Route path={routes.confirm} element={<LazyConfirmEmailPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
