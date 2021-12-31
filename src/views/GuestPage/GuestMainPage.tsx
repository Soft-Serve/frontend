import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { GuestPage } from "./GuestPage";

const GuestMainPage: FC = () => {
  return (
    <Providers>
      <GuestPage />
    </Providers>
  );
};

export { GuestMainPage };
