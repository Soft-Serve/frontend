import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { AllergyLegend } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { Modal, Button } from "@base";
import { TArg } from "tailwindcss-classnames";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const AllergyModal: FC<Props> = ({ setIsFilterSideMenuOpen, isOpen }) => {
  const { themeColour, themeTint, themeFont, restaurantSlug } = useRestaurantContext();

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
