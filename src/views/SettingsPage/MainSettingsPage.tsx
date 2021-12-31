import React from "react";
import type { FC } from "react";
import { LazySettingsPage } from "./LazySettingsPage";
import { Providers } from "./Providers";

const MainSettingsPage: FC = () => {
  return (
    <Providers>
      <LazySettingsPage />
    </Providers>
  );
};

export { MainSettingsPage };
