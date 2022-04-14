import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { useCategoriesQuery } from "@shared";
import { ThemeFonts } from "@base";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  categoryID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
  menuID: number;
}
const MobileSubHeader: FC<Props> = ({
  themeFont,
  themeColour,
  themeTint,
  categoryID,
  setCategoryID,
  menuID,
}) => {
  const { data, loading } = useCategoriesQuery({
    variables: {
      menuID,
    },
    skip: !menuID,
    onCompleted: completedData => {
      if (completedData?.categories[0]?.id) {
        setCategoryID(completedData.categories[0].id);
      }
    },
  });

  if (data?.categories && data?.categories?.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="sticky top-0 z-40 border-b bg-white shadow-lg lg:hidden"
    >
      <div className="hide-scroll-bar my-2 flex overflow-x-scroll">
        <div className="mx-2 flex flex-nowrap">
          <Categories
            categoryID={categoryID}
            themeColour={themeColour}
            themeTint={themeTint}
            themeFont={themeFont}
            setCategoryID={setCategoryID}
            loading={loading}
            categories={data?.categories}
          />
        </div>
      </div>
    </nav>
  );
};

export { MobileSubHeader };
