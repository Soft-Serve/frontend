import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { useCategoriesQuery } from "@shared";

interface Props {
  themeFont: string;
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
      className="bg-white border-b lg:hidden sticky top-0 z-40 shadow-lg"
    >
      <div className="flex overflow-x-scroll my-2 hide-scroll-bar">
        <div className="flex flex-nowrap mx-2">
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
