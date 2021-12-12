import React, { useState } from "react";
import type { FC } from "react";
import { CreateNewUserForm } from "@presentational";
import { BoxSection, Footer } from "@base";
import { MenuPage } from "../MenuPage";
import { SignUpNavigation } from "./SignUpNavigation";
import { SignUpMobileNavigation } from "./SignUpMobileNavigation";
import { SignUpMobileHeader } from "./SignUpMobileHeader";

const SignUpPage: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MenuPage>
      <SignUpMobileNavigation isOpen={isMobileMenuOpen} onClose={setIsMobileMenuOpen} />
      <SignUpNavigation />
      <SignUpMobileHeader onButtonClick={setIsMobileMenuOpen}>
        <div className="overflow-y-scroll">
          <BoxSection>
            <CreateNewUserForm />
          </BoxSection>
        </div>
        <Footer />
      </SignUpMobileHeader>
    </MenuPage>
  );
};

export { SignUpPage };
