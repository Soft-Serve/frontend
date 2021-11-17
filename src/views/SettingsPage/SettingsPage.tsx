import type { FC } from "react";
import React, { useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { Fab } from "react-tiny-fab";

import { SettingsSubMenu } from "src/components/Presentational";
import { TabContent } from "@base";
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
      <div className="lg:hidden block">
        <Fab
          text="Settings"
          onClick={() => setIsSubNavOpen(true)}
          icon={<AdjustmentsIcon className="text-white bg-gray-900 rounded-full p-2" />}
        />
      </div>
    </MenuPage>
  );
};

export { SettingsPage };
