import React, { useState } from "react";
import type { FC } from "react";
import { RestaurantProvider } from "@contexts";
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
    <RestaurantProvider>
      <MenuPage>
        {accountConfirmed() && flash()}
        <SignInMobileNavigation isOpen={isMobileMenuOpen} onClose={setIsMobileMenuOpen} />
        <SignInNavigation />
        <SignInMobileHeader setMobileMenuOpen={setIsMobileMenuOpen}>
          <Container>
            <BoxSection>
              <SignInForm />
            </BoxSection>
          </Container>
          <Footer />
        </SignInMobileHeader>
      </MenuPage>
    </RestaurantProvider>
  );
};

export { SignInPage };
