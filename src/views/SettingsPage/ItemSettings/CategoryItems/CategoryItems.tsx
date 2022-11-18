import React from "react";
import type { FC } from "react";
import { Category, Item, useItemsQuery } from "@shared";
import { CategoryItem, SkeletonCategoryItem } from "./CategoryItem";
import { ThemeFonts } from "@base";
import { Column } from "@interface";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  searchValue: string;
  activeCategory?: Category;
}
const CategoryItems: FC<Props> = ({
  themeFont,
  handleDeleteItem,
  categoryID,
  searchValue,
  handleUpdateItem,
  handleAddDietary,
  themeColour,
  themeTint,
}) => {
  const { data, loading } = useItemsQuery({
    variables: {
      categoryID,
    },
  });

  const filterdItems = data?.items.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return (
      <>
        {[...new Array(3)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonCategoryItem key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {filterdItems?.map(item => (
        <Column key={item.id} columnWidth="six">
          <CategoryItem
            themeFont={themeFont}
            themeColour={themeColour}
            themeTint={themeTint}
            categoryID={categoryID}
            item={item}
            handleAddDietary={handleAddDietary}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItem={handleUpdateItem}
          />
        </Column>
      ))}
    </>
  );
};

export { CategoryItems };
