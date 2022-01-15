import type { FC } from "react";
import { Fab } from "react-tiny-fab";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Toaster } from "react-hot-toast";
import { SettingsSubMenu } from "@presentational";
import { Navigate } from "react-router-dom";
import { useViewport } from "@hooks";
import { Footer, LoadingScreen, TabContent } from "@base";
import { useCurrentUserQuery, useRestaurantThemeQuery } from "@shared";
import { AdjustmentsIcon } from "@heroicons/react/solid";
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
import "react-tiny-fab/dist/styles.css";

interface MappableObject {
  [key: string]: JSX.Element;
}

type Param = {
  id: string;
};

interface Props {
  restaurantSlug: string;
}

const SettingsPage: FC<Props> = ({ restaurantSlug }) => {
  const { id } = useParams<Param>() as Param;
  const [isOpen, onClose] = useState(false);
  const { data, loading } = useCurrentUserQuery();
  const { data: themeData } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
  });

  const { width } = useViewport();
  const [selected, setSelected] = useState(id);

  const restaurant = (
    <RestaurantSettings
      restaurantSlug={restaurantSlug}
      themeFont={themeData?.restaurant?.font || "Quicksand"}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const banner = (
    <BannerSettings
      restaurantSlug={restaurantSlug}
      themeFont={themeData?.restaurant?.font || "Quicksand"}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const users = (
    <UsersSettings
      restaurantSlug={restaurantSlug}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const menus = (
    <MenuSettings
      restaurantSlug={restaurantSlug}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const dietaries = (
    <AllergiesSettings
      restaurantSlug={restaurantSlug}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const items = (
    <ItemSettings
      restaurantSlug={restaurantSlug}
      themeFont={themeData?.restaurant?.font || "Quicksand"}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const account = (
    <AccountSettings
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );
  const billing = <BillingSettings />;
  const categories = (
    <CategorySettings
      restaurantSlug={restaurantSlug}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
    />
  );

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
    return (
      <Footer
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
      />
    );
  };

  if (loading) return <LoadingScreen />;

  if (!data?.currentUser) {
    return <Navigate to={`${routes.restaurants}/${restaurantSlug}`} />;
  }
  return (
    <>
      <div className="lg:hidden block">
        <Fab
          onClick={() => onClose(prevState => !prevState)}
          icon={
            <AdjustmentsIcon
              className={`bg-${themeData?.restaurant?.colour || "red"}-${
                themeData?.restaurant?.tint || 400
              } rounded-full`}
            />
          }
        />
      </div>
      <SettingsMobileSubNavigation
        restaurantSlug={restaurantSlug}
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
        selected={selected}
        setSelected={handleSetSelected}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SettingsWrapper css={classnames("overflow-y-auto", "flex-col")}>
        <SettingsWrapper>
          <SettingsSubMenu
            restaurantSlug={restaurantSlug}
            themeColour={themeData?.restaurant?.colour || "red"}
            themeTint={themeData?.restaurant?.tint || 400}
            selected={selected}
            setSelected={setSelected}
            className="hidden lg:block flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col "
          />
          <TabContent
            themeColour={themeData?.restaurant?.colour || "red"}
            themeTint={themeData?.restaurant?.tint || 400}
          >
            {renderSettingsTab()}
          </TabContent>
        </SettingsWrapper>
        {renderMobileFooter()}
      </SettingsWrapper>
      <Toaster />
    </>
  );
};

export { SettingsPage };
