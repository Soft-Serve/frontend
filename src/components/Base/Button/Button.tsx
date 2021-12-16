import React, { ButtonHTMLAttributes, FC } from "react";
import { TArg } from "tailwindcss-classnames";
import { LoadingSVG } from "@svgs";
import { useRestaurantContext } from "src/contexts";
import { Sizes } from "./types";
import { buildStyles, loadingStyles } from "./styles";
import type { Colours } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit";
  size?: Sizes;
  colour?: Colours;
  isFullwidth?: boolean;
  loading?: boolean;
  css?: TArg;
}

const Button: FC<Props> = ({
  children,
  type,
  size,
  colour,
  isFullwidth,
  css,
  loading,
  disabled,
  ...rest
}) => {
  const { themeColour, themeTint } = useRestaurantContext();
  const renderButtonContent = () => {
    if (loading) return <LoadingSVG className={loadingStyles(colour)} />;
    return <>{children}</>;
  };
  return (
    <button
      disabled={disabled}
      type={type}
      className={buildStyles(themeColour, themeTint, size, colour, isFullwidth, disabled, css)}
      {...rest}
    >
      <span className="font-Quicksand font-bold inline-flex items-center">
        {renderButtonContent()}
      </span>
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  colour: "primary",
  size: "S",
};
export { Button };
