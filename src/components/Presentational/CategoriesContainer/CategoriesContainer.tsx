import React from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { useCategoriesQuery } from "@shared";
import { useGlobalContext } from "@contexts";

const CategoriesContainer: FC = () => {
  const { menuID, setCategoryID } = useGlobalContext();

  const { data, loading } = useCategoriesQuery({
    variables: {
      menuID,
    },
    skip: !menuID,
    onCompleted: completedData => setCategoryID(completedData.categories[0].id),
  });

  if (data?.categories && data?.categories?.length <= 1) {
    return null;
  }

  return (
    <div className="w-full flex-wrap lg:flex hidden">
      <div className="mt-4 mb-2 flex items-center">
        <Categories setCategoryID={setCategoryID} loading={loading} categories={data?.categories} />
      </div>
    </div>
  );
};

export { CategoriesContainer };
