import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { Category } from "@shared";
import { ThemeFonts } from "@base";

interface Props {
  isCategoriesLoading: boolean;
  categories: Category[];
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  menuID: number;
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
  category?: Category;
}
const CategoriesContainer: FC<Props> = ({
  isCategoriesLoading,
  categories,
  themeFont,
  themeTint,
  themeColour,
  setCategory,
  category,
}) => {
  if (categories.length < 1) {
    return null;
  }

  return (
    <div className="hidden w-full flex-wrap lg:flex">
      <div className="mt-4 mb-2 flex items-center">
        <Categories
          category={category}
          themeColour={themeColour}
          themeTint={themeTint}
          themeFont={themeFont}
          setCategory={setCategory}
          loading={isCategoriesLoading}
          categories={categories}
        />
      </div>
    </div>
  );
};

export { CategoriesContainer };
