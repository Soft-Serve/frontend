import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Tab, Tabs, Container, BoxSection, Button, Typography, ThemeFonts } from "@base";
import { FullLogoSVG } from "@svgs";
import { Menu } from "@shared";
import { routes } from "src/routes";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { classnames } from "tailwindcss-classnames";

interface Props {
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
  return (
    <Container>
      <BoxSection>
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
          <FullLogoSVG
            className={`w-36 fill-current stroke-current text-${themeColour}-${themeTint}`}
          />
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
