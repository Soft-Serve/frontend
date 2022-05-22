import React from "react";
import type { FC } from "react";
import { FullLogoSVG } from "@svgs";
import { Link } from "react-router-dom";
import { routes } from "src/routes";

interface Props {
  themeColour: string;
  themeTint: number;
}
const Footer: FC<Props> = ({ themeTint, themeColour }) => {
  return (
    <footer className="flex-shrink-0 bg-white print:hidden">
      <div className="mx-auto flex justify-center overflow-hidden py-0 px-4 sm:px-6 lg:py-4 lg:px-8">
        <h6
          className={`black flex items-center pr-3 text-base text-${themeColour}-${themeTint} font-bold`}
        >
          Powered by:
        </h6>
        <Link to={routes.home}>
          <FullLogoSVG
            className={`w-24 fill-current stroke-current text-${themeColour}-${themeTint}`}
          />
        </Link>
      </div>
    </footer>
  );
};

export { Footer };
