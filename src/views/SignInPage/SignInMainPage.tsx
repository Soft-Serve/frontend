import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { SignInPage } from "./SignInPage";

const SignInMainPage: FC = () => {
  return (
    <Providers>
      <SignInPage />
    </Providers>
  );
};

export { SignInMainPage };
