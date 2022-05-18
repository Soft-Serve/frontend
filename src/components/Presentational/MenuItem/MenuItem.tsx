import React, { useMemo } from "react";
import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { LifeStyles, useAllergyContext } from "@contexts";
import { CategoryType, Item, useDietaryQuery, CategoryTypes } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { MobileCardMenuItemWithImage } from "./MobileCardMenuItemWithImage";
import { intersection } from "@utility";
import { ThemeFonts } from "@base";
import { useViewport } from "src/hooks";

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
  const { width } = useViewport();

  const { data, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const isMobile = width < 400;
  const isItemOfFoodCategory = categoryType === CategoryTypes.food;
  const hasImage = !!item?.photo?.length;
  const isItemVegan = data?.dietaries?.some(dietary => dietary.name === LifeStyles.Vegan);
  const isItemVegetarian = data?.dietaries?.some(dietary => dietary.name === LifeStyles.Vegeterian);
  const restrictions = activeAllergies.filter(allergy => !isAllergyVegetarianOrVegan(allergy.name));
  const isItemBeingFilteredOut = useMemo(
    () => intersection(restrictions, data?.dietaries ?? []),
    [activeAllergies]
  );

  const renderItemWithImage = () =>
    isMobile ? (
      <MobileCardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    ) : (
      <CardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    );

  const renderItems = () =>
    hasImage ? (
      renderItemWithImage()
    ) : (
      <CardMenuItemWithoutImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        {...rest}
      />
    );

  if (isItemOfFoodCategory) {
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
