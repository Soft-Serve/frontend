import React from "react";
import type { FC } from "react";
import { LazyGuestPage } from "./LazyGuestPage";
import { Providers } from "./Providers";

const GuestMainPage: FC = () => {
  return (
    <Providers>
      <LazyGuestPage />
    </Providers>
  );
};

export { GuestMainPage };
