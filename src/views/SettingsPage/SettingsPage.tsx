import type { FC } from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Toaster } from "react-hot-toast";

import { SettingsSubMenu } from "src/components/Presentational";
import { useViewport } from "@hooks";
import { Footer, TabContent } from "@base";
import { classnames } from "tailwindcss-classnames";
import { MenuPage } from "../MenuPage";
import { SettingsMobileNavigation } from "./SettingsMobileNavigation";
import { SettingsNavigation } from "./SettingsNavigation";
import { SettingsMobileHeader } from "./SettingsMobileHeader";
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

interface MappableObject {
  [key: string]: JSX.Element;
}

interface SettingsTab {
  setting: string;
}

const SettingsPage: FC = () => {
  const { setting } = useParams<SettingsTab>();

  const { width } = useViewport();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [selected, setSelected] = useState(setting);

  const restaurant = <RestaurantSettings />;
  const users = <UsersSettings />;
  const menus = <MenuSettings />;
  const dietaries = <AllergiesSettings />;
  const items = <ItemSettings />;
  const account = <AccountSettings />;
  const billing = <BillingSettings />;
  const categories = <CategorySettings />;

  const SettingsMap = {
    restaurant,
    menus,
    items,
    account,
    billing,
    users,
    dietaries,
    categories,
  } as MappableObject;

  const renderSettingsTab = () => SettingsMap[setting];

  useEffect(() => {
    setSelected(setting);
  }, [setting]);

  const handleSetSelected = (value: any) => {
    setSelected(value);
    setIsSubNavOpen(false);
  };

  const renderMobileFooter = () => {
    if (width > 1024) return null;
    return <Footer />;
  };

  return (
    <MenuPage>
      <SettingsMobileNavigation isOpen={mobileMenuOpen} onClose={setMobileMenuOpen} />
      <SettingsNavigation />
      <SettingsMobileSubNavigation
        selected={selected}
        setSelected={handleSetSelected}
        isOpen={isSubNavOpen}
        onClose={setIsSubNavOpen}
      />
      <SettingsMobileHeader setIsSubNavOpen={setIsSubNavOpen} setMobileMenuOpen={setMobileMenuOpen}>
        <SettingsWrapper css={classnames("overflow-y-auto", "flex-col")}>
          <SettingsWrapper>
            <SettingsSubMenu
              selected={selected}
              setSelected={setSelected}
              className="hidden lg:block flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col "
            />
            <TabContent>{renderSettingsTab()}</TabContent>
          </SettingsWrapper>
          {renderMobileFooter()}
        </SettingsWrapper>
      </SettingsMobileHeader>
      <Toaster />
    </MenuPage>
  );
};

export { SettingsPage };
