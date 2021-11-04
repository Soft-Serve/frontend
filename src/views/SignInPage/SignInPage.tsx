import React, { useState } from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { BoxSection, Container, Footer } from "@base";
import { MenuPage } from "../MenuPage";
import { SignInNavigation } from "./SignInNavigation";
import { SignInMobileNavigation } from "./SignInMobileNavigation";
import { SignInMobileHeader } from "./SignInMobileHeader";

const SignInPage: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Footer />
      </SignInMobileHeader>
    </MenuPage>
  );
};

export { SignInPage };
