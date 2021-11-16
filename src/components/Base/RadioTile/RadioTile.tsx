import React from "react";
import { RadioGroup } from "@headlessui/react";
import type { FC } from "react";
import type { TArg } from "tailwindcss-classnames";
import { useRestaurantContext } from "src/contexts";
import { buildStyles, buildRadioStyles } from "./RadioTile.styles";

interface Props {
  value: any;
  size?: "SM" | "MED";
  type?: "primary" | "naked";
  css?: TArg;
}

const RadioTile: FC<Props> = ({ children, value, size = "SM", type = "naked", css }) => {
  const { themeColour, themeTint } = useRestaurantContext();
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
