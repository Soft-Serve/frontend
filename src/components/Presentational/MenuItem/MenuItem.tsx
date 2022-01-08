import React from "react";
import type { FC } from "react";
import { useViewportContext } from "@contexts";
import { Item } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { MobileCardMenuItemWithImage } from "./MobileCardMenuItemWithImage";

interface Props {
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const MenuItem: FC<Props> = ({ item, themeTint, themeColour, themeFont }) => {
  const { width } = useViewportContext();
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
