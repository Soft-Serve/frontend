import React from "react";
import { ApolloProvider } from "@apollo/client";
import { LazyLandingPage, Main } from "@views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@routes";
import { client } from "./client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
          <Route path={`${routes.restaurants}/:id/*`} element={<Main />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
