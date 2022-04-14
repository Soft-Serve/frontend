import { FC, createElement, HTMLAttributes } from "react";
import type { TArg } from "tailwindcss-classnames";
import { classnames } from "tailwindcss-classnames";

interface MappableObject {
  [key: string]: string;
}

const themeFonts = {
  Sans: "font-Sans",
  Arima: "font-Arima",
  Baskerville: "font-Baskerville",
  Cardo: "font-Cardo",
  Oswald: "font-Oswald",
  Quicksand: "font-Quicksand",
  Raleway: "font-Raleway",
} as MappableObject;

export enum FontsMap {
  Sans = "Sans",
  Arima = "Arima",
  Baskerville = "Baskerville",
  Cardo = "Cardo",
  Oswald = "Oswald",
  Quicksand = "Quicksand",
  Raleway = "Raleway",
}

export type ThemeFonts = keyof typeof FontsMap;

interface Props extends HTMLAttributes<Headers> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  css?: TArg;
  themeFont: ThemeFonts;
  themeColour?: string;
  themeTint?: number;
}

const Typography: FC<Props> = ({
  children,
  type,
  themeFont,
  css,
  themeColour,
  themeTint,
  ...rest
}) => {
  const HTag = `${type}` as keyof JSX.IntrinsicElements;
  const font = themeFonts[themeFont] as TArg;
  const getFontColour = (colour = "gray ", tint = 700) =>
    classnames(`text-${colour}-${tint}` as TArg);

  const props = {
    ...rest,
    className: classnames(
      font,
      "text-sm",
      "overflow-hidden",
      getFontColour(themeColour, themeTint),
      css
    ),
  };

  return createElement(HTag, props, children);
};

export { Typography };
