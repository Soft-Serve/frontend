import React from "react";
import type { FC } from "react";
import { ViewportProvider, AllergyProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <AllergyProvider>
      <ViewportProvider>{children}</ViewportProvider>
    </AllergyProvider>
  );
};

export { Providers };
