import React from "react";
import type { FC } from "react";
import { Tab, Tabs, Container, BoxSection, Button } from "@base";
import { FullLogoSVG } from "@svgs";
import { useGlobalContext, useRestaurantContext } from "src/contexts";
import { useMenusQuery } from "@shared";
import { routes } from "src/routes";
import Skeleton from "react-loading-skeleton";

interface Props {
  themeFont: string;
}
const Menus: FC<Props> = ({ themeFont }) => {
  const { setMenuID, setActiveMenu, menuID } = useGlobalContext();
  const { restaurantSlug, themeColour, themeTint } = useRestaurantContext();

  const { data, error, loading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => {
      if (completedData?.menus?.length > 0) {
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
            themeFont={themeFont}
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
  return (
    <Container>
      <BoxSection>
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center">
          <FullLogoSVG
            className={`w-36 fill-current stroke-current text-${themeColour}-${themeTint}`}
          />
          <h2 className={`m-8 text-center text-2xl font-bold  text-${themeColour}-${themeTint}`}>
            Looks like you do not have any menus yet
          </h2>
          <Button
            size="XL"
            onClick={() => window.location.assign(`${routes.settings}/${restaurantSlug}/menus`)}
          >
            Add a menu
          </Button>
        </div>
      </BoxSection>
    </Container>
  );
};

export { Menus };
