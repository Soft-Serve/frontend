import React from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { Navigate } from "react-router-dom";
import { BoxSection, Container, Notification } from "@base";
import { useCurrentUserQuery } from "@shared";
import { MenuPage } from "../MenuPage";

const SignInPage: FC = () => {
  const { data } = useCurrentUserQuery();

  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  if (data?.currentUser) {
    return <Navigate to="/" />;
  }
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
