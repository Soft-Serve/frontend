import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";
import { BoxSection, Container } from "@base";
import { MenuPage } from "../MenuPage";

const ConfirmEmailPage: FC = () => {
  return (
    <MenuPage>
      <Container>
        <BoxSection>
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center">
            <FullLogoSVG className="w-36 fill-current text-red-400" />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-600">
              Please check your email to confirm your account.
            </h2>
          </div>
        </BoxSection>
      </Container>
    </MenuPage>
  );
};

export { ConfirmEmailPage };
