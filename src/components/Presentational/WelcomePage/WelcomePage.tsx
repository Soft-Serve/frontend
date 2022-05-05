import React from "react";
import type { FC } from "react";
import { Steps } from "./Steps";

interface Props {
  restaurantName?: string;
  isAdmin: boolean;
  adminName?: string;
  hasMenus: boolean;
  hasItems: boolean;
  hasStyles: boolean;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const WelcomePage: FC<Props> = ({
  adminName,
  restaurantName,
  isAdmin,
  hasMenus,
  hasItems,
  hasStyles,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  if (!isAdmin)
    return (
      <div className={`bg-${themeColour}-${themeTint} rounded-md`}>
        <div className="mx-auto max-w-2xl  py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{restaurantName}</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            Our apologies, we are still building our menu, please come back soon!
          </p>
        </div>
      </div>
    );
  return (
    <div className="flex-column">
      <h2
        className={`p-4 text-center text-xl font-medium tracking-tight sm:text-5xl lg:text-6xl text-${themeColour}-${themeTint}`}
      >
        Welcome {adminName}!
      </h2>
      <h3 className="px-4 text-center text-lg font-semibold tracking-tight text-gray-900">
        To start building your virtual menu follow the steps below:
      </h3>
      <div className="flex justify-center p-20">
        <Steps
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          hasMenus={hasMenus}
          hasItems={hasItems}
          hasStyles={hasStyles}
        />
      </div>
    </div>
  );
};

export { WelcomePage };
