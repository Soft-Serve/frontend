import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { LazySignInPage } from "./LazySignInPage";

const SignInMainPage: FC = () => {
  return (
    <Providers>
      <LazySignInPage />
    </Providers>
  );
};

export { SignInMainPage };
