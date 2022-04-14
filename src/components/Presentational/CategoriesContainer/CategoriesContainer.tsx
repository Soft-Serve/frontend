import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { useCategoriesQuery } from "@shared";
import { ThemeFonts } from "@base";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  menuID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
  categoryID: number;
}
const CategoriesContainer: FC<Props> = ({
  themeFont,
  themeTint,
  themeColour,
  menuID,
  setCategoryID,
  categoryID,
}) => {
  const { data, loading } = useCategoriesQuery({
    variables: {
      menuID,
    },
    skip: !menuID,

    onCompleted: completedData => setCategoryID(completedData?.categories[0]?.id),
  });

  if (data?.categories && data?.categories?.length <= 1) {
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
          loading={loading}
          categories={data?.categories}
        />
      </div>
    </div>
  );
};

export { CategoriesContainer };
