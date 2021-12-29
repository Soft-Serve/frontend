import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { Main } from "./Main";

const SettingsPage: FC = () => {
  return (
    <Providers>
      <Main />
    </Providers>
  );
};

export { SettingsPage };
