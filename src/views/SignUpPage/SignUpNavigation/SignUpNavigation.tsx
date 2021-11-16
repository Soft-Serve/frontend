import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { LoginSVG } from "@svgs";

const SignUpNavigation: FC = () => {
  return (
    <Navigation>
      <NavigationItem to={routes.signIn}>
        <span>Sign In</span>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="sr-only">Sign In</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignUpNavigation };
