import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { CategoryItemWithImage } from "./CategoryItemWithImage";
import { CategoryItemWithoutImage } from "./CategoryItemWithoutImage";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItem: FC<Props> = ({ handleDeleteItem, categoryID, handleUpdateItem, item }) => {
  if (item?.photo) {
    return (
      <CategoryItemWithImage
        item={item}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }

  return (
    <CategoryItemWithoutImage
      item={item}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItem={handleUpdateItem}
      categoryID={categoryID}
    />
  );
};

export { CategoryItem };
