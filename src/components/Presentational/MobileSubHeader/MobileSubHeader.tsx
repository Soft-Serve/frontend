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
  categoryID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
  menuID: number;
}
const MobileSubHeader: FC<Props> = ({
  isCategoriesLoading,
  categories,
  themeFont,
  themeColour,
  themeTint,
  categoryID,
  setCategoryID,
}) => {
  if (categories.length < 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-white shadow-lg lg:hidden">
      <div className="hide-scroll-bar my-2 flex overflow-x-scroll">
        <div className="mx-2 flex flex-nowrap">
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
    </nav>
  );
};

export { MobileSubHeader };
