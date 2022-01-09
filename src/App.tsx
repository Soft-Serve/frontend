import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { Main } from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@base";
import { routes } from "@routes";
import { client } from "./client";
import { PageNotFound } from "./views/PageNotFound";

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
          </Routes>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
