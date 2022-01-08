import type { FC } from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Toaster } from "react-hot-toast";

import { SettingsSubMenu } from "@presentational";
import { useViewport } from "@hooks";
import { Footer, LoadingScreen, TabContent } from "@base";
import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "@shared";
import { useRestaurantContext } from "@contexts";
import { classnames } from "tailwindcss-classnames";
import { routes } from "@routes";
import { SettingsMobileSubNavigation } from "./SettingsMobileSubNavigation";
import { AccountSettings } from "./AccountSettings";
import { UsersSettings } from "./UsersSettings";
import { AllergiesSettings } from "./AllergiesSettings";
import { BillingSettings } from "./BillingSettings";
import { ItemSettings } from "./ItemSettings";
import { MenuSettings } from "./MenuSettings";
import { RestaurantSettings } from "./RestaurantSettings";
import { SettingsWrapper } from "./SettingsWrapper";
import { CategorySettings } from "./CategorySettings";
import { BannerSettings } from "./BannerSettings/BannerSettings";

interface MappableObject {
  [key: string]: JSX.Element;
}

type Param = {
  id: string;
};
interface Props {
  isOpen: boolean;
  onClose: any;
}

const SettingsPage: FC<Props> = ({ isOpen, onClose }) => {
  const { id } = useParams<Param>() as Param;
  const { data, loading } = useCurrentUserQuery();
  const { restaurantSlug, themeColour, themeTint, themeFont } = useRestaurantContext();

  const { width } = useViewport();
  const [selected, setSelected] = useState(id);

  const restaurant = <RestaurantSettings themeColour={themeColour} themeTint={themeTint} />;
  const banner = (
    <BannerSettings themeFont={themeFont} themeColour={themeColour} themeTint={themeTint} />
  );
  const users = <UsersSettings themeColour={themeColour} themeTint={themeTint} />;
  const menus = <MenuSettings themeColour={themeColour} themeTint={themeTint} />;
  const dietaries = <AllergiesSettings themeColour={themeColour} themeTint={themeTint} />;
  const items = (
    <ItemSettings themeFont={themeFont} themeColour={themeColour} themeTint={themeTint} />
  );
  const account = <AccountSettings themeColour={themeColour} themeTint={themeTint} />;
  const billing = <BillingSettings />;
  const categories = <CategorySettings themeColour={themeColour} themeTint={themeTint} />;

  const SettingsMap = {
    restaurant,
    banner,
    menus,
    items,
    account,
    billing,
    users,
    dietaries,
    categories,
  } as MappableObject;

  const renderSettingsTab = () => SettingsMap[id];

  useEffect(() => {
    setSelected(id);
  }, [id]);

  const handleSetSelected = (value: any) => {
    setSelected(value);
    onClose(false);
  };

  const renderMobileFooter = () => {
    if (width > 1024) return null;
    return <Footer />;
  };

  if (loading) return <LoadingScreen />;

  if (!data?.currentUser) {
    return <Navigate to={`${routes.restaurants}/${restaurantSlug}`} />;
  }
  return (
    <>
      <SettingsMobileSubNavigation
        themeColour={themeColour}
        themeTint={themeTint}
        selected={selected}
        setSelected={handleSetSelected}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SettingsWrapper css={classnames("overflow-y-auto", "flex-col")}>
        <SettingsWrapper>
          <SettingsSubMenu
            themeColour={themeColour}
            themeTint={themeTint}
            selected={selected}
            setSelected={setSelected}
            className="hidden lg:block flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col "
          />
          <TabContent>{renderSettingsTab()}</TabContent>
        </SettingsWrapper>
        {renderMobileFooter()}
      </SettingsWrapper>
      <Toaster />
    </>
  );
};

export { SettingsPage };
