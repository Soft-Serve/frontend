import React from "react";
import type { FC } from "react";
import { RestaurantProvider, GlobalProvider, ViewportProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <RestaurantProvider>
      <GlobalProvider>
        <ViewportProvider>{children}</ViewportProvider>
      </GlobalProvider>
    </RestaurantProvider>
  );
};

export { Providers };
