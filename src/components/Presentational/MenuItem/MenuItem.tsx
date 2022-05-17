import React, { useMemo } from "react";
import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { LifeStyles, useAllergyContext } from "@contexts";
import { CategoryType, Item, useDietaryQuery } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { intersection } from "@utility";
import { ThemeFonts } from "@base";
import { CategoryTypes } from "src/shared/Categories.query";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  categoryType?: CategoryType;
}

const MenuItem: FC<Props> = ({
  categoryType,
  item,
  themeTint,
  themeColour,
  themeFont,
  ...rest
}) => {
  const { activeAllergies, isUserVegan, isUserVegetarian, isAllergyVegetarianOrVegan } =
    useAllergyContext();

  const { data, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const hasImage = !!item?.photo?.length;
  const isItemVegan = data?.dietaries?.some(dietary => dietary.name === LifeStyles.Vegan);
  const isItemVegetarian = data?.dietaries?.some(dietary => dietary.name === LifeStyles.Vegeterian);
  const restrictions = activeAllergies.filter(allergy => !isAllergyVegetarianOrVegan(allergy.name));
  const isItemBeingFilteredOut = useMemo(
    () => intersection(restrictions, data?.dietaries ?? []),
    [activeAllergies]
  );

  const renderItems = () =>
    hasImage ? (
      <CardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    ) : (
      <CardMenuItemWithoutImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    );

  if (categoryType === CategoryTypes.food) {
    if (
      loading ||
      isItemBeingFilteredOut ||
      (isUserVegan && !isItemVegan) ||
      (isUserVegetarian && !isItemVegan && !isItemVegetarian)
    ) {
      return null;
    }
  }

  return renderItems();
};

export { MenuItem };
