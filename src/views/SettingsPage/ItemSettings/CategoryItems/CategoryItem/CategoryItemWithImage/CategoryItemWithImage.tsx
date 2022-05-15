import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { useViewportContext } from "@contexts";
import { MobileCategoryItemWithImage } from "./MobileCategoryItemWithImage";
import { DesktopCategoryItemWithImage } from "./DesktopCategoryItemWithImage";
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

const CategoryItemWithImage: FC<Props> = ({
  themeFont,
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  handleAddDietary,
  handleUpdatePhoto,
  themeTint,
  themeColour,
  item,
}) => {
  const { width } = useViewportContext();

  if (width > 1023 && width < 1140) {
    return (
      <MobileCategoryItemWithImage
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

  if (width < 515) {
    return (
      <MobileCategoryItemWithImage
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
    <DesktopCategoryItemWithImage
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

export { CategoryItemWithImage };
