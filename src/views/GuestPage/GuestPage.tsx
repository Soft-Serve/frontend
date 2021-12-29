import React from "react";
import type { FC } from "react";

import { Providers } from "./Providers";
import { Main } from "./Main";

const GuestPage: FC = () => {
  return (
    <Providers>
      <Main />
    </Providers>
  );
};

export { GuestPage };
