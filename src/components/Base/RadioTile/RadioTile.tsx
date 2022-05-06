import React from "react";
import { RadioGroup } from "@headlessui/react";
import type { FC } from "react";
import type { TArg } from "tailwindcss-classnames";
import { buildStyles, buildRadioStyles } from "./RadioTile.styles";

interface Props {
  value: any;
  size?: "SM" | "MED";
  type?: "primary" | "naked";
  css?: TArg;
  themeColour: string;
  themeTint: number;
  children: React.ReactNode;
}

const RadioTile: FC<Props> = ({
  children,
  value,
  size = "SM",
  type = "naked",
  css,
  themeColour,
  themeTint,
}) => {
  return (
    <RadioGroup.Option value={value} className={buildStyles(size, type, css)}>
      {({ checked }) => (
        <>
          {children}
          <div className={buildRadioStyles(checked, themeColour, themeTint)} aria-hidden="true" />
        </>
      )}
    </RadioGroup.Option>
  );
};

export { RadioTile };
