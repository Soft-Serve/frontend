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
  setCategoryID: Dispatch<SetStateAction<number>>;
  categoryID: number;
}
const CategoriesContainer: FC<Props> = ({
  isCategoriesLoading,
  categories,
  themeFont,
  themeTint,
  themeColour,
  setCategoryID,
  categoryID,
}) => {
  if (categories.length < 1) {
    return null;
  }

  return (
    <div className="hidden w-full flex-wrap lg:flex">
      <div className="mt-4 mb-2 flex items-center">
        <Categories
          categoryID={categoryID}
          themeColour={themeColour}
          themeTint={themeTint}
          themeFont={themeFont}
          setCategoryID={setCategoryID}
          loading={isCategoriesLoading}
          categories={categories}
        />
      </div>
    </div>
  );
};

export { CategoriesContainer };
