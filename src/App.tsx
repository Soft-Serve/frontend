import React, { lazy, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { Main } from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@base";
import { routes } from "@routes";
import { client } from "./client";

const App = () => {
  const LandingPage = lazy(() => import("./views/LandingPage"));
  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={`${routes.restaurants}/:id/*`} element={<Main />} />
          </Routes>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
