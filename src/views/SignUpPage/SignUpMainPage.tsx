import React from "react";
import type { FC } from "react";
import { LazySignUpPage } from "./LazySignUpPage";
import { Providers } from "./Providers";

const SignUpMainPage: FC = () => {
  return (
    <Providers>
      <LazySignUpPage />
    </Providers>
  );
};

export { SignUpMainPage };
