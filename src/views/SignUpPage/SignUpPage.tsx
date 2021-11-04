import React, { useState } from "react";
import type { FC } from "react";
import { CreateNewUserForm } from "@presentational";
import { TabContent } from "@base";
import { MenuPage } from "../MenuPage";
import { SignUpNavigation } from "./SignUpNavigation";
import { SignUpMobileNavigation } from "./SignUpMobileNavigation";
import { SignUpMobileHeader } from "./SignUpMobileHeader";

const SignUpPage: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MenuPage>
      <div className="relative h-screen flex bg-blue-gray-50 overflow-hidden">
        <SignUpMobileNavigation isOpen={isMobileMenuOpen} onClose={setIsMobileMenuOpen} />
        <SignUpNavigation />
        <SignUpMobileHeader onButtonClick={setIsMobileMenuOpen}>
          <TabContent>
            <CreateNewUserForm />
          </TabContent>
        </SignUpMobileHeader>
      </div>
    </MenuPage>
  );
};

export { SignUpPage };
