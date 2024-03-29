import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Tab, Tabs, Container, BoxSection, Button, Typography, ThemeFonts } from "@base";
import { Menu } from "@shared";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { classnames } from "tailwindcss-classnames";

interface Props {
  isAdmin: boolean;
  menus: Menu[];
  isMenuLoading: boolean;
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  setMenuID: Dispatch<SetStateAction<number>>;
  menuID: number;
}
const Menus: FC<Props> = ({
  isAdmin,
  isMenuLoading,
  menus,
  themeFont,
  themeColour,
  themeTint,
  restaurantSlug,
  setMenuID,
  menuID,
}) => {
  const navigate = useNavigate();

  if (isMenuLoading) return <Skeleton height={40} />;

  const renderTabs = () =>
    menus.map((menu, index) => (
      <Tab
        themeColour={themeColour}
        themeTint={themeTint}
        themeFont={themeFont}
        onClick={() => setMenuID(menu.id)}
        numOfTabs={menus.length}
        tabIndex={index}
        isActive={menu.id === menuID}
        key={menu.id}
      >
        {menu.name}
      </Tab>
    ));

  if (menus.length) {
    return <Tabs>{renderTabs()}</Tabs>;
  }

  if (isAdmin) {
    return (
      <Container>
        <BoxSection>
          <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
            <Typography
              css={classnames("font-bold", "m-8", "text-center", "text-2xl")}
              themeFont={themeFont}
              type="h2"
            >
              Looks like you do not have any menus yet
            </Typography>
            <Button
              themeColour={themeColour}
              themeTint={themeTint}
              size="XL"
              onClick={() => navigate(`/restaurants/${restaurantSlug}/settings/menus`)}
            >
              Add a menu
            </Button>
          </div>
        </BoxSection>
      </Container>
    );
  }
  return (
    <Container>
      <BoxSection>
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
          <Typography
            css={classnames("font-bold", "m-8", "text-center", "text-2xl")}
            themeFont={themeFont}
            type="h2"
          >
            No Menus, Please check back later!
          </Typography>
        </div>
      </BoxSection>
    </Container>
  );
};

export { Menus };
