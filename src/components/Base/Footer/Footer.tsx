import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";

interface Props {
  themeColour: string;
  themeTint: number;
}
const Footer: FC<Props> = ({ themeTint, themeColour }) => {
  return (
    <footer className="flex-shrink-0 bg-white">
      <div className="mx-auto flex justify-center overflow-hidden py-0 px-4 sm:px-6 lg:py-4 lg:px-8">
        <h6
          className={`black flex items-center pr-3 text-base text-${themeColour}-${themeTint} font-bold`}
        >
          Powered by:
        </h6>
        <FullLogoSVG
          className={`w-24 fill-current stroke-current text-${themeColour}-${themeTint}`}
        />
      </div>
    </footer>
  );
};

export { Footer };
