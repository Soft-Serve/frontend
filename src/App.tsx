import React from "react";
import { ApolloProvider } from "@apollo/client";
import {
  LazyConfirmEmailPage,
  GuestMainPage,
  SignInMainPage,
  SignUpMainPage,
  SettingsMainPage,
} from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@routes";
import { client } from "./client";
import { LandingPage } from "./views/LandingPage/LandingPage";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={`${routes.restaurants}/:id`} element={<GuestMainPage />} />
          <Route path={routes.signIn} element={<SignInMainPage />} />
          <Route path={routes.signUp} element={<SignUpMainPage />} />
          <Route path={`${routes.settings}/:id/:setting`} element={<SettingsMainPage />} />
          <Route path={routes.confirm} element={<LazyConfirmEmailPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
