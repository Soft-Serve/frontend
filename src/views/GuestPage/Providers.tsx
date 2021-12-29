import React from "react";
import type { FC } from "react";
import { RestaurantProvider, GlobalProvider, ViewportProvider, AllergyProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <RestaurantProvider>
      <GlobalProvider>
        <ViewportProvider>
          <AllergyProvider>{children}</AllergyProvider>
        </ViewportProvider>
      </GlobalProvider>
    </RestaurantProvider>
  );
};

export { Providers };
