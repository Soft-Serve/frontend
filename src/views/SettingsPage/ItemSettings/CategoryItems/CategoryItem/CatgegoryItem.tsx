import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { CategoryItemWithImage } from "./CategoryItemWithImage";
import { CategoryItemWithoutImage } from "./CategoryItemWithoutImage";

interface Props {
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItem: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  item,
  handleAddDietary,
}) => {
  if (item?.photo) {
    return (
      <CategoryItemWithImage
        item={item}
        handleAddDietary={handleAddDietary}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }

  return (
    <CategoryItemWithoutImage
      item={item}
      handleAddDietary={handleAddDietary}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItem={handleUpdateItem}
      categoryID={categoryID}
    />
  );
};

export { CategoryItem };
