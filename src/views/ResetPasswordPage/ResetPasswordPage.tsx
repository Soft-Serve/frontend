import React from "react";
import type { FC } from "react";
import { ResetPasswordForm } from "@presentational";
import { BoxSection, Container } from "@base";
import { MenuPage } from "../MenuPage";

const ResetPasswordPage: FC = () => {
  return (
    <MenuPage>
      <Container>
        <BoxSection>
          <ResetPasswordForm />
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { ResetPasswordPage };
