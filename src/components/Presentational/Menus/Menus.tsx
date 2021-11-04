import React from "react";
import type { FC } from "react";
import { Tab, Tabs } from "@base";
import { useGlobalContext } from "src/contexts";
import { useMenusQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

const Menus: FC = () => {
  const { setMenuID, setActiveMenu, menuID } = useGlobalContext();
  const { restaurantSlug } = useGlobalContext();

  const { data, error, loading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => {
      if (completedData?.menus.length > 0) {
        setMenuID(completedData.menus[0].id);
        setActiveMenu(completedData.menus[0].name);
      }
    },
  });

  if (error) return <p>error</p>;
  if (loading) return <Skeleton height={40} />;
  if (data?.menus && data?.menus.length) {
    return (
      <Tabs>
        {data?.menus.map((menu, index) => (
          <Tab
            onClick={() => setMenuID(menu.id)}
            numOfTabs={data.menus.length}
            tabIndex={index}
            isActive={menu.id === menuID}
            key={menu.id}
          >
            {menu.name}
          </Tab>
        ))}
      </Tabs>
    );
  }
  return <p>add a menu</p>;
};

export { Menus };
