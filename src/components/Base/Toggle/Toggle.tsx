import { Button } from "@base";
import React, { FC } from "react";
import { useRestaurantContext } from "@contexts";
import { buildButtonStyles, buildWrapperStyles, buildToggleStyles } from "./style";

import { ReactComponent as CheckmarkSVG } from "./svgs/checkmark.svg";
import { ReactComponent as CloseSVG } from "./svgs/close.svg";

interface Props {
  isEnabled: boolean;
  handleClick?: () => void;
}

const Toggle: FC<Props> = ({ isEnabled, handleClick }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <Button
      colour="transparant"
      onClick={handleClick}
      className={buildButtonStyles(isEnabled, themeColour, themeTint)}
      aria-pressed="false"
    >
      <span className="sr-only">Use setting</span>
      <span className={buildWrapperStyles(isEnabled)}>
        <span className={buildToggleStyles(isEnabled)} aria-hidden="true">
          <CheckmarkSVG />
        </span>
        <span className={buildToggleStyles(!isEnabled)} aria-hidden="true">
          <CloseSVG />
        </span>
      </span>
    </Button>
  );
};

export { Toggle };
