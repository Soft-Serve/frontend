import React, { SetStateAction } from "react";
import type { FC } from "react";
import { Button } from "@base";
import { Category } from "@shared";
import { SkeletonCategories } from "./SkeletonCategories";

interface Props {
  buttonStyle?: "primary" | "accent" | "naked" | "transparant";
  categories?: Category[];
  loading?: boolean;
  setCategoryID: (value: SetStateAction<number>) => void;
}

const Categories: FC<Props> = ({ buttonStyle = "accent", categories, loading, setCategoryID }) => {
  if (loading) return <SkeletonCategories />;
  return (
    <>
      {categories?.map(category => (
        <div key={category.id}>
          <Button
            css="mx-1"
            colour={buttonStyle}
            size="LG"
            onClick={() => setCategoryID(category.id)}
          >
            {category.name}
          </Button>
        </div>
      ))}
    </>
  );
};

export { Categories };
