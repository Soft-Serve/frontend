import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { AllergyLegend } from "@presentational";
import { ThemeFonts } from "@base";
import { Dialog, DialogHeader, Container, Columns } from "@interface";

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
    <Dialog
      themeColour={themeColour}
      themeTint={themeTint}
      onClose={setIsFilterSideMenuOpen}
      isOpen={isOpen}
    >
      <DialogHeader
        themeColour={themeColour}
        themeTint={themeTint}
        onClose={setIsFilterSideMenuOpen}
      >
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Allergy Filters
        </h3>
      </DialogHeader>
      <Container adjustHeight={100} containerWidth="full">
        <Columns>
          <AllergyLegend
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeFont={themeFont}
            themeTint={themeTint}
          />
        </Columns>
      </Container>
    </Dialog>
  );
};

export { AllergyModal };
