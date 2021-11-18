import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";

interface Props {
  item: Item;
}

const MenuItem: FC<Props> = ({ item }) => {
  if (item.photo && item.photo.length) {
    return <CardMenuItemWithImage item={item} />;
  }
  return <CardMenuItemWithoutImage item={item} />;
};

export { MenuItem };
