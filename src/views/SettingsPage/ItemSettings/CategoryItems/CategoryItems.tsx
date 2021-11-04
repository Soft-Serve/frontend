import React from "react";
import type { FC } from "react";
import { Category, Item, useItemsQuery } from "@shared";
import { CategoryItem, SkeletonCategoryItem } from "./CategoryItem";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  searchValue: string;
  activeCategory?: Category;
}
const CategoryItems: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  searchValue,
  handleUpdateItem,
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
        <CategoryItem
          categoryID={categoryID}
          key={item.id}
          item={item}
          handleDeleteItem={handleDeleteItem}
          handleUpdateItem={handleUpdateItem}
        />
      ))}
    </>
  );
};

export { CategoryItems };
