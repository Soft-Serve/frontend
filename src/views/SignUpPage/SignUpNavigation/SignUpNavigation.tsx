import React from "react";
import type { FC } from "react";
import { Navigation, NavigationItem } from "@presentational";
import { routes } from "@routes";
import { LoginSVG } from "@svgs";

const SignUpNavigation: FC = () => {
  return (
    <Navigation>
      <NavigationItem css="border-t-2" to={routes.signIn}>
        <LoginSVG className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="mx-2">Sign In</span>
        <span className="sr-only">Sign In</span>
      </NavigationItem>
    </Navigation>
  );
};

export { SignUpNavigation };
