import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@base";
import { MainPage, PageNotFound } from "@views";
import { routes } from "@routes";
import { client } from "./client";
import { SignInPage } from "@views";

const LandingPage = lazy(() => import("./views/LandingPage/DefaultLandingPage"));
const SignUpPage = lazy(() => import("./views/SignUpPage/DefaultSignUpPage"));
const ConfirmEmailPage = lazy(() => import("./views/ConfirmEmailPage/DefaultConfirmEmailPage"));
const ResetPasswordPage = lazy(() => import("./views/ResetPasswordPage/DefaultResetPasswordPage"));
const ForgotPasswordPage = lazy(
  () => import("./views/ForgotPasswordPage/DefaultForgotPasswordPage")
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path={routes.pageNotFound} element={<PageNotFound />} />
            <Route path={routes.home} element={<LandingPage />} />
            <Route path={routes.signIn} element={<SignInPage />} />
            <Route path={routes.signUp} element={<SignUpPage />} />
            <Route path={routes.confirm} element={<ConfirmEmailPage />} />
            <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
            <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
            <Route path={`${routes.restaurants}/:id/*`} element={<MainPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
