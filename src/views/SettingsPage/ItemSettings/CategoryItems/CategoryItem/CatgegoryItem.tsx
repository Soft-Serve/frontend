import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { CategoryItemWithImage } from "./CategoryItemWithImage";
import { CategoryItemWithoutImage } from "./CategoryItemWithoutImage";
import { ThemeFonts } from "@base";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  handleUpdatePhoto: (item: Item) => void;
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItem: FC<Props> = ({
  themeFont,
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  item,
  handleAddDietary,
  handleUpdatePhoto,
  themeColour,
  themeTint,
}) => {
  if (item?.photo) {
    return (
      <CategoryItemWithImage
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        item={item}
        handleUpdatePhoto={handleUpdatePhoto}
        handleAddDietary={handleAddDietary}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        categoryID={categoryID}
      />
    );
  }

  return (
    <CategoryItemWithoutImage
      themeFont={themeFont}
      themeColour={themeColour}
      themeTint={themeTint}
      item={item}
      handleUpdatePhoto={handleUpdatePhoto}
      handleAddDietary={handleAddDietary}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItem={handleUpdateItem}
      categoryID={categoryID}
    />
  );
};

export { CategoryItem };
