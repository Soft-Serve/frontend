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
}

const Categories: FC<Props> = ({ categories, loading, setCategoryID }) => {
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
            value={category}
            key={category.id}
            css={classnames("rounded-md", "mx-2", "whitespace-nowrap")}
          >
            {category.name}
          </RadioTile>
        ))}
      </div>
    </RadioTiles>
  );
};

export { Categories };
