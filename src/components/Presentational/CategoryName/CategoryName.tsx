import React from "react";
import type { FC } from "react";
import { useCategoryNameQuery } from "./CategoryName.query";

interface Props {
  categoryID: number;
}
const CategoryName: FC<Props> = ({ categoryID }) => {
  const { data } = useCategoryNameQuery({
    variables: {
      categoryID,
    },
    skip: !categoryID,
  });
  return <span>{data?.categoryName?.name}</span>;
};

export { CategoryName };
