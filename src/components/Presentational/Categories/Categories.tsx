import React, { SetStateAction } from "react";
import type { FC } from "react";
import { RadioTile, RadioTiles } from "@base";
import { Category } from "@shared";
import { useGlobalContext } from "@contexts";
import { classnames } from "tailwindcss-classnames";
import { SkeletonCategories } from "./SkeletonCategories";

interface Props {
  categories?: Category[];
  loading?: boolean;
  setCategoryID: (value: SetStateAction<number>) => void;
  themeFont: string;
  themeColour: string;
  themeTint: number;
}

const Categories: FC<Props> = ({
  categories,
  loading,
  setCategoryID,
  themeFont,
  themeTint,
  themeColour,
}) => {
  const { categoryID } = useGlobalContext();
  if (loading) return <SkeletonCategories />;

  return (
    <RadioTiles
      value={categories?.find(category => category?.id === categoryID)}
      onChange={currentCategory => setCategoryID(currentCategory.id)}
    >
      <div className="flex">
        {categories?.map(category => (
          <RadioTile
            themeColour={themeColour}
            themeTint={themeTint}
            value={category}
            key={category.id}
            css={classnames("rounded-md", "mx-2", "whitespace-nowrap")}
          >
            <span className={`font-${themeFont}`}>{category.name}</span>
          </RadioTile>
        ))}
      </div>
    </RadioTiles>
  );
};

export { Categories };
