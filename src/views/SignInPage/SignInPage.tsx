import React, { useState } from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { BoxSection, Container, Footer, Notification } from "@base";
import { MenuPage } from "../MenuPage";
import { SignInNavigation } from "./SignInNavigation";
import { SignInMobileNavigation } from "./SignInMobileNavigation";
import { SignInMobileHeader } from "./SignInMobileHeader";

const SignInPage: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  return (
    <MenuPage>
      <SignInMobileNavigation isOpen={isMobileMenuOpen} onClose={setIsMobileMenuOpen} />
      <SignInNavigation />
      <SignInMobileHeader onButtonClick={setIsMobileMenuOpen}>
        <Container>
          <BoxSection>
            <SignInForm />
          </BoxSection>
        </Container>
        {accountConfirmed() && flash()}
        <Footer />
      </SignInMobileHeader>
    </MenuPage>
  );
};

export { SignInPage };
