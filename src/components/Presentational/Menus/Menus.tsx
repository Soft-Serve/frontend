import React, { Dispatch, SetStateAction, useEffect } from "react";
import type { FC } from "react";
import { Tab, Tabs, Container, BoxSection, Button } from "@base";
import { FullLogoSVG } from "@svgs";
import { useMenusQuery } from "@shared";
import { routes } from "src/routes";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";

interface Props {
  themeFont: string;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  setMenuID: Dispatch<SetStateAction<number>>;
  setActiveMenu: Dispatch<SetStateAction<string>>;
  menuID: number;
}
const Menus: FC<Props> = ({
  themeFont,
  themeColour,
  themeTint,
  restaurantSlug,
  setActiveMenu,
  setMenuID,
  menuID,
}) => {
  const navigate = useNavigate();

  const { data, error, loading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    onCompleted: completedData => {
      if (completedData?.menus?.length > 0) {
        setMenuID(completedData?.menus?.[0]?.id);
        setActiveMenu(completedData?.menus?.[0]?.name);
      }
    },
  });

  useEffect(() => {
    if (data?.menus?.[0].name) setActiveMenu(data?.menus?.[0].name);
    if (data?.menus?.[0].id) setMenuID(data?.menus?.[0].id);
  }, [setActiveMenu, setMenuID, data?.menus]);

  if (error) return <p>error</p>;
  if (loading) return <Skeleton height={40} />;
  if (data?.menus && data?.menus?.length) {
    return (
      <Tabs>
        {data?.menus.map((menu, index) => (
          <Tab
            themeColour={themeColour}
            themeTint={themeTint}
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
            themeColour={themeColour}
            themeTint={themeTint}
            size="XL"
            onClick={() => navigate(`${routes.settings}/${restaurantSlug}/menus`)}
          >
            Add a menu
          </Button>
        </div>
      </BoxSection>
    </Container>
  );
};

export { Menus };
