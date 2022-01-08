import React from "react";
import type { FC } from "react";
import { CreateNewUserForm } from "@presentational";
import { BoxSection, Container } from "@base";
import { useRestaurantContext } from "@contexts";
import { MenuPage } from "../MenuPage";

const SignUpPage: FC = () => {
  const { themeColour, themeTint } = useRestaurantContext();

  return (
    <MenuPage>
      <Container>
        <div className="overflow-y-scroll">
          <BoxSection>
            <CreateNewUserForm themeColour={themeColour} themeTint={themeTint} />
          </BoxSection>
        </div>
      </Container>
    </MenuPage>
  );
};

export { SignUpPage };
