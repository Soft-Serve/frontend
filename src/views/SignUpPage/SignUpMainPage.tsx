import React from "react";
import type { FC } from "react";
import { Providers } from "./Providers";
import { SignUpPage } from "./SignUpPage";

const SignUpMainPage: FC = () => {
  return (
    <Providers>
      <SignUpPage />
    </Providers>
  );
};

export { SignUpMainPage };
