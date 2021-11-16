import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";
import { useRestaurantContext } from "@contexts";

const Footer: FC = () => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <footer className="bg-white flex-shrink-0 lg:mb-0">
      <div className="flex justify-center mx-auto lg:py-4 py-0 px-4 overflow-hidden sm:px-6 lg:px-8">
        <h6
          className={`text-base black pr-3 flex items-center text-${themeColour}-${themeTint} font-bold`}
        >
          Powered by:
        </h6>
        <FullLogoSVG className={`w-24 fill-current text-${themeColour}-${themeTint}`} />
      </div>
    </footer>
  );
};

export { Footer };
