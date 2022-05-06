import React from "react";
import type { FC } from "react";
import { ViewportProvider, AllergyProvider } from "@contexts";

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <AllergyProvider>
      <ViewportProvider>{children}</ViewportProvider>
    </AllergyProvider>
  );
};

export { Providers };
