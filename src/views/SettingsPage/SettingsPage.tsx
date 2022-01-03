import type { FC } from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Toaster } from "react-hot-toast";
import Loader from "react-loader-spinner";

import { SettingsSubMenu } from "@presentational";
import { useViewport } from "@hooks";
import { Footer, TabContent } from "@base";
import { useCurrentUserQuery } from "@shared";
import { classnames } from "tailwindcss-classnames";
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

  const { width } = useViewport();
  const [selected, setSelected] = useState(id);

  const restaurant = <RestaurantSettings />;
  const banner = <BannerSettings />;
  const users = <UsersSettings />;
  const menus = <MenuSettings />;
  const dietaries = <AllergiesSettings />;
  const items = <ItemSettings />;
  const account = <AccountSettings />;
  const billing = <BillingSettings />;
  const categories = <CategorySettings />;

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

  if (loading)
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader type="Grid" color="#000000" height={150} width={150} />
      </div>
    );

  if (data?.currentUser) {
    return (
      <>
        <SettingsMobileSubNavigation
          selected={selected}
          setSelected={handleSetSelected}
          isOpen={isOpen}
          onClose={onClose}
        />
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
        <Toaster />
      </>
    );
  }
  return null;
};

export { SettingsPage };
