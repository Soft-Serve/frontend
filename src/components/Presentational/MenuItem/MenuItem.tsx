import React from "react";
import type { FC } from "react";
import { useAllergyContext, useViewportContext } from "@contexts";
import { Item, useDietaryQuery } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { MobileCardMenuItemWithImage, MobileSkeletonMenuItem } from "./MobileCardMenuItemWithImage";
import { intersection } from "@utility";

interface Props {
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const MenuItem: FC<Props> = ({ item, themeTint, themeColour, themeFont }) => {
  const { width } = useViewportContext();
  const { activeAllergies } = useAllergyContext();

  const { data, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  if (!loading && data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }

  if (loading) return <MobileSkeletonMenuItem />;

  if (item.photo && item.photo.length) {
    return width < 515 ? (
      <MobileCardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
      />
    ) : (
      <CardMenuItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
      />
    );
  }
  return (
    <CardMenuItemWithoutImage
      themeFont={themeFont}
      themeColour={themeColour}
      themeTint={themeTint}
      item={item}
    />
  );
};

export { MenuItem };
