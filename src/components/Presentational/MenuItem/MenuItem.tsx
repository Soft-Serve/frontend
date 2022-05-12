import React from "react";
import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAllergyContext } from "@contexts";
import { Item, useDietaryQuery } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { intersection } from "@utility";
import { ThemeFonts } from "@base";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
}

const MenuItem: FC<Props> = ({ item, themeTint, themeColour, themeFont, ...rest }) => {
  const { activeAllergies } = useAllergyContext();

  const { data, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const hasImage = !!item?.photo?.length;

  if (!loading && data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }

  return hasImage ? (
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
};

export { MenuItem };
