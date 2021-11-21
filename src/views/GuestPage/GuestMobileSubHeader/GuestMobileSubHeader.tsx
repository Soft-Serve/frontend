import React from "react";
import type { FC } from "react";
import { Categories } from "@presentational";
import { useCategoriesQuery } from "@shared";
import { useGlobalContext } from "@contexts";

const GuestMobileSubHeader: FC = () => {
  const { menuID, setCategoryID } = useGlobalContext();

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
            setCategoryID={setCategoryID}
            loading={loading}
            categories={data?.categories}
          />
        </div>
      </div>
    </nav>
  );
};

export { GuestMobileSubHeader };
