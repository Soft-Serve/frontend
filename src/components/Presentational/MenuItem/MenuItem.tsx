import React from "react";
import type { FC } from "react";
import { useViewportContext } from "@contexts";
import { Item } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";
import { MobileCardMenuItemWithImage } from "./MobileCardMenuItemWithImage";

interface Props {
  item: Item;
}

const MenuItem: FC<Props> = ({ item }) => {
  const { width } = useViewportContext();
  if (item.photo && item.photo.length) {
    return width < 515 ? (
      <MobileCardMenuItemWithImage item={item} />
    ) : (
      <CardMenuItemWithImage item={item} />
    );
  }
  return <CardMenuItemWithoutImage item={item} />;
};

export { MenuItem };
