import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@base";
import { Main, PageNotFound } from "@views";
import { routes } from "@routes";
import { client } from "./client";
import { SignInPage } from "@views";

const LandingPage = lazy(() => import("./views/LandingPage"));
const SignUpPage = lazy(() => import("./views/SignUpPage/DefaultSignUpPage"));
const ConfirmEmailPage = lazy(() => import("./views/ConfirmEmailPage/DefaultConfirmEmailPage"));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/confirm" element={<ConfirmEmailPage />} />
            <Route path={`${routes.restaurants}/:id/*`} element={<Main />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
