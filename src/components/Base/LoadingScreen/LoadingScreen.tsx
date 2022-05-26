import React from "react";
import type { FC } from "react";
import "./styles.css";

interface Props {
  themeColour: string;
  themeTint: number;
}

const LoadingScreen: FC<Props> = ({ themeColour, themeTint }) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-${themeColour}-${themeTint}`}
    >
      <div className={`loader flex space-x-3 rounded-full bg-${themeColour}-${themeTint}-900 p-5`}>
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
        <div className="h-5 w-5 animate-bounce rounded-full bg-white" />
      </div>
    </div>
  );
};

export { LoadingScreen };
