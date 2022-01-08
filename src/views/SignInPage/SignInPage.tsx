import React from "react";
import type { FC } from "react";
import { Navigate } from "react-router-dom";
import { SignInForm } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { BoxSection, Container, LoadingScreen, Notification } from "@base";
import { useCurrentUserQuery } from "@shared";
import { MenuPage } from "../MenuPage";

const SignInPage: FC = () => {
  const { themeTint, themeColour, restaurantSlug } = useRestaurantContext();
  const { data, loading } = useCurrentUserQuery({
    skip: !restaurantSlug,
  });

  if (loading) return <LoadingScreen />;

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
          <SignInForm themeColour={themeColour} themeTint={themeTint} />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { SignInPage };
