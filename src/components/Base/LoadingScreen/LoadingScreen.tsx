import React from "react";
import type { FC } from "react";
import "./styles.css";
import { classnames, TArg } from "tailwindcss-classnames";

interface Props {
  themeColour: string;
  themeTint: number;
  reverseTheme?: boolean;
}

const LoadingScreen: FC<Props> = ({ themeColour, themeTint, reverseTheme }) => {
  const bgColour = reverseTheme ? "bg-white" : (`bg-${themeColour}-${themeTint}` as TArg);
  const container = classnames(
    "flex",
    "min-h-screen",
    "flex-col",
    "items-center",
    "justify-center",
    bgColour
  );

  const ballColour = !reverseTheme ? "bg-white" : (`bg-${themeColour}-${themeTint}` as TArg);

  const ball = classnames("h-5", "w-5", "animate-bounce", "rounded-full", ballColour);

  return (
    <div className={container}>
      <div className="loader flex space-x-3 rounded-full p-5">
        <div className={ball} />
        <div className={ball} />
        <div className={ball} />
      </div>
    </div>
  );
};

export { LoadingScreen };
