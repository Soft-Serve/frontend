import React from "react";
import type { FC } from "react";
import { RestaurantProvider, GlobalProvider, ViewportProvider, AllergyProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <RestaurantProvider>
      <GlobalProvider>
        <AllergyProvider>
          <ViewportProvider>{children}</ViewportProvider>
        </AllergyProvider>
      </GlobalProvider>
    </RestaurantProvider>
  );
};

export { Providers };
