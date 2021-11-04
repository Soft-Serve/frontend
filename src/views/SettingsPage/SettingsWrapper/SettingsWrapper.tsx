import React from "react";
import type { FC } from "react";
import { TArg } from "tailwindcss-classnames";
import { buildStyles } from "./styles";

interface Props {
  css?: TArg;
}
const SettingsWrapper: FC<Props> = ({ children, css }) => {
  return <div className={buildStyles(css)}>{children}</div>;
};

export { SettingsWrapper };
