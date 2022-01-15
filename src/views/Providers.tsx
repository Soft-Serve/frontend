import React from "react";
import type { FC } from "react";
import { GlobalProvider, ViewportProvider, AllergyProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <GlobalProvider>
      <AllergyProvider>
        <ViewportProvider>{children}</ViewportProvider>
      </AllergyProvider>
    </GlobalProvider>
  );
};

export { Providers };
