import React from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { BoxSection, Container, Notification } from "@base";
import { MenuPage } from "../MenuPage";

const SignInPage: FC = () => {
  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  return (
    <MenuPage>
      {accountConfirmed() && flash()}
      <Container>
        <BoxSection>
          <SignInForm />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { SignInPage };
