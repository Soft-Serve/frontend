import React from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { BoxSection, Container, Notification } from "@base";
import { MenuPage } from "../MenuPage";

const SignInPage: FC = () => {
  const { themeTint, themeColour } = useRestaurantContext();

  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  return (
    <MenuPage>
      {accountConfirmed() && flash()}
      <Container>
        <BoxSection>
          <SignInForm themeColour={themeColour} themeTint={themeTint} />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { SignInPage };
