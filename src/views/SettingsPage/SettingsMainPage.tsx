import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { LazySettingsPage } from "./LazySettingsPage";

const SettingsMainPage: FC = () => {
  return (
    <Providers>
      <LazySettingsPage />
    </Providers>
  );
};

export { SettingsMainPage };
