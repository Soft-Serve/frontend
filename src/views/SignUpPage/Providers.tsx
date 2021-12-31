import React from "react";
import type { FC } from "react";
import { RestaurantProvider, ViewportProvider } from "@contexts";

const Providers: FC = ({ children }) => {
  return (
    <RestaurantProvider>
      <ViewportProvider>{children}</ViewportProvider>
    </RestaurantProvider>
  );
};

export { Providers };
