import React from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { BoxSection, Container, Notification } from "@base";
import { MenuPage } from "../MenuPage";
import { useRestaurantThemeQuery } from "@shared";

interface Props {
  restaurantSlug: string;
}

const SignInPage: FC<Props> = ({ restaurantSlug }) => {
  const { data } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
  });

  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  return (
    <MenuPage>
      {accountConfirmed() && flash()}
      <Container>
        <BoxSection>
          <SignInForm
            themeTint={data?.restaurant?.tint || 400}
            themeColour={data?.restaurant?.colour || "red"}
          />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { SignInPage };
