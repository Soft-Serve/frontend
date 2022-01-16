import React from "react";
import type { FC } from "react";
import { ForgotPasswordForm } from "@presentational";
import { BoxSection, Container } from "@base";
import { MenuPage } from "../MenuPage";

const ForgotPasswordPage: FC = () => {
  return (
    <MenuPage>
      <Container>
        <BoxSection>
          <ForgotPasswordForm />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { ForgotPasswordPage };
