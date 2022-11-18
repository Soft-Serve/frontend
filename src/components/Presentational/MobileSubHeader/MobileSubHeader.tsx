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
  category?: Category;
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
  menuID: number;
}
const MobileSubHeader: FC<Props> = ({
  isCategoriesLoading,
  categories,
  themeFont,
  themeColour,
  themeTint,
  category,
  setCategory,
}) => {
  if (categories.length < 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="rounded-lg border border-gray-100 bg-white shadow-lg lg:hidden"
    >
      <div className="scrollbar-hide my-4 flex overflow-x-scroll">
        <div className="mx-2 flex flex-nowrap">
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
    </nav>
  );
};

export { MobileSubHeader };
