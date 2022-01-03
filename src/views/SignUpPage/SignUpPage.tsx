import React from "react";
import type { FC } from "react";
import { CreateNewUserForm } from "@presentational";
import { BoxSection, Container } from "@base";
import { MenuPage } from "../MenuPage";

const SignUpPage: FC = () => {
  return (
    <MenuPage>
      <Container>
        <div className="overflow-y-scroll">
          <BoxSection>
            <CreateNewUserForm />
          </BoxSection>
        </div>
      </Container>
    </MenuPage>
  );
};

export { SignUpPage };
