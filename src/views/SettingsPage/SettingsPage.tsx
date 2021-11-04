import type { FC } from "react";
import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/solid";

import { SettingsSubMenu } from "src/components/Presentational";
import { Button, TabContent } from "@base";
import { classnames } from "tailwindcss-classnames";
import { SUB_NAVIGATION } from "src/constants";
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
import { SettingsBreadCrumbs } from "./SettingsBreadCrumbs";
import { SettingsWrapper } from "./SettingsWrapper";
import { CategorySettings } from "./CategorySettings";

interface MappableObject {
  [key: string]: JSX.Element;
}

const SettingsPage: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [selected, setSelected] = useState(SUB_NAVIGATION[0].name);

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

  const renderSettingsTab = () => SettingsMap[selected.toLowerCase()];

  const handleSetSelected = (value: any) => {
    setSelected(value);
    setIsSubNavOpen(false);
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
      <SettingsMobileHeader onButtonClick={setMobileMenuOpen}>
        <SettingsWrapper css={classnames("overflow-y-auto", "flex-col")}>
          <SettingsBreadCrumbs>
            <Button onClick={() => setIsSubNavOpen(true)} type="button" colour="naked">
              <ChevronLeftIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
              <span className="text-gray-900">Settings</span>
            </Button>
          </SettingsBreadCrumbs>

          <SettingsWrapper>
            <SettingsSubMenu
              selected={selected}
              setSelected={setSelected}
              className="hidden lg:block flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col "
            />
            <TabContent>{renderSettingsTab()}</TabContent>
          </SettingsWrapper>
        </SettingsWrapper>
      </SettingsMobileHeader>
    </MenuPage>
  );
};

export { SettingsPage };
