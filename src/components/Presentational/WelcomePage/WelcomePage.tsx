import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";
import { Button } from "@base";
import { Steps } from "./Steps";

interface Props {
  hasMenus: boolean;
  hasItems: boolean;
  hasStyles: boolean;
  hideWelcomePage: () => void;
}

const WelcomePage: FC<Props> = ({ hasMenus, hasItems, hasStyles, hideWelcomePage }) => {
  const { themeColour, themeTint } = useRestaurantContext();

  return (
    <div className="flex-column">
      <h2
        className={`p-4 text-center text-xl font-medium tracking-tight sm:text-5xl lg:text-6xl text-${themeColour}-${themeTint}`}
      >
        Welcome Kristine!
      </h2>
      <h3 className="px-4 text-center text-lg font-semibold text-gray-900 tracking-tight">
        To start building your virtual menu follow the steps below:
      </h3>
      <div className="p-20 flex justify-center">
        <Steps hasMenus={hasMenus} hasItems={hasItems} hasStyles={hasStyles} />
      </div>
      <div className="p-20 flex justify-center">
        <Button size="XL" onClick={hideWelcomePage}>
          skip for now
        </Button>
      </div>
    </div>
  );
};

export { WelcomePage };
