import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { AllergyLegend } from "@presentational";
import { Modal, Button } from "@base";
import type { TArg } from "tailwindcss-classnames";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}
const AllergyModal: FC<Props> = ({
  setIsFilterSideMenuOpen,
  isOpen,
  restaurantSlug,
  themeTint,
  themeColour,
  themeFont,
}) => {
  const bgColour = `bg-${themeColour}-${themeTint}` as TArg;

  return (
    <Modal css={bgColour} onClose={setIsFilterSideMenuOpen} isOpen={isOpen}>
      <AllergyLegend
        restaurantSlug={restaurantSlug}
        themeColour={themeColour}
        themeFont={themeFont}
        themeTint={themeTint}
      />
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
        size="XXL"
        colour="accent"
        isFullwidth
      >
        close
      </Button>
    </Modal>
  );
};

export { AllergyModal };
