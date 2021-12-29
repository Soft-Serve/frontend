import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { useViewportContext } from "@contexts";
import { MobileCategoryItemWithImage } from "./MobileCategoryItemWithImage";
import { DesktopCategoryItemWithImage } from "./DesktopCategoryItemWithImage";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItemWithImage: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  item,
}) => {
  const { width } = useViewportContext();

  if (width < 615) {
    return (
      <MobileCategoryItemWithImage
        item={item}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }
  return (
    <DesktopCategoryItemWithImage
      item={item}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItem={handleUpdateItem}
      categoryID={categoryID}
    />
  );
};

export { CategoryItemWithImage };
