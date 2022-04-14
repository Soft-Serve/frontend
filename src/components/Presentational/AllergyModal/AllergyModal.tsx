import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { AllergyLegend } from "@presentational";
import { Modal, Button, ThemeFonts } from "@base";

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
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
  return (
    <Modal onClose={setIsFilterSideMenuOpen} isOpen={isOpen}>
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
        isFullwidth
      >
        close
      </Button>
    </Modal>
  );
};

export { AllergyModal };
