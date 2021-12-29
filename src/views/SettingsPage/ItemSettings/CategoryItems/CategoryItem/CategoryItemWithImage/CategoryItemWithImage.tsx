import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { useViewportContext } from "@contexts";
import { MobileCategoryItemWithImage } from "./MobileCategoryItemWithImage";
import { DesktopCategoryItemWithImage } from "./DesktopCategoryItemWithImage";

interface Props {
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItemWithImage: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  handleAddDietary,
  item,
}) => {
  const { width } = useViewportContext();

  if (width > 1023 && width < 1140) {
    return (
      <MobileCategoryItemWithImage
        item={item}
        handleAddDietary={handleAddDietary}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }

  if (width < 515) {
    return (
      <MobileCategoryItemWithImage
        item={item}
        handleAddDietary={handleAddDietary}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }
  return (
    <DesktopCategoryItemWithImage
      item={item}
      handleAddDietary={handleAddDietary}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItem={handleUpdateItem}
      categoryID={categoryID}
    />
  );
};

export { CategoryItemWithImage };
