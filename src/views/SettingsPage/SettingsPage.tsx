import { FC, lazy, Suspense } from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Toaster } from "react-hot-toast";
import { SettingsSubMenu } from "@presentational";
import { useViewport } from "@hooks";
import { Button, FontsMap, Footer, LoadingScreen, TabContent } from "@base";
import { useRestaurantThemeQuery } from "@shared";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { classnames } from "tailwindcss-classnames";
import { SettingsMobileSubNavigation } from "./SettingsMobileSubNavigation";
import { SettingsWrapper } from "./SettingsWrapper";

interface MappableObject {
  [key: string]: JSX.Element;
}

type Param = {
  id: string;
};

interface Props {
  restaurantSlug: string;
}

const RestaurantSettings = lazy(() => import("./RestaurantSettings"));
const BannerSettings = lazy(() => import("./BannerSettings"));
const UsersSettings = lazy(() => import("./UsersSettings"));
const MenuSettings = lazy(() => import("./MenuSettings"));
const AllergiesSettings = lazy(() => import("./AllergiesSettings"));
const ItemSettings = lazy(() => import("./ItemSettings"));
const AccountSettings = lazy(() => import("./AccountSettings"));
const BillingSettings = lazy(() => import("./BillingSettings"));
const CategorySettings = lazy(() => import("./CategorySettings"));
const QRCodeSettings = lazy(() => import("./QRCodeSettings"));
const PromotionSettings = lazy(() => import("./PromotionsSettings"));

const SettingsPage: FC<Props> = ({ restaurantSlug }) => {
  const { id } = useParams<Param>() as Param;
  const [isOpen, onClose] = useState(false);
  const { data: themeData } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
  });

  const { width } = useViewport();
  const [selected, setSelected] = useState(id);

  useEffect(() => {
    setSelected(id);
  }, [id]);

  const restaurant = (
    <RestaurantSettings
      restaurantSlug={restaurantSlug}
      themeFont={themeData?.restaurant?.font || FontsMap.Quicksand}
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
      backgroundColour={themeData?.restaurant?.background_colour || "gray"}
      backgroundTint={themeData?.restaurant?.background_tint || 200}
    />
  );
  const banner = (
    <BannerSettings
      restaurantSlug={restaurantSlug}
      themeFont={themeData?.restaurant?.font || FontsMap.Quicksand}
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
      themeFont={themeData?.restaurant?.font || FontsMap.Quicksand}
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
  const QR = (
    <QRCodeSettings
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
      restaurantSlug={restaurantSlug}
    />
  );
  const promotions = (
    <PromotionSettings
      themeColour={themeData?.restaurant?.colour || "red"}
      themeTint={themeData?.restaurant?.tint || 400}
      restaurantSlug={restaurantSlug}
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
    QR,
    promotions,
  } as MappableObject;

  const renderSettingsTab = () => SettingsMap[id];

  const handleSetSelected = (value: string) => {
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

  return (
    <>
      <div className="mt-4 ml-4 block bg-slate-50 print:hidden lg:hidden">
        <Button
          css={classnames("items-center")}
          size="XL"
          onClick={() => onClose(prevState => !prevState)}
          themeColour={themeData?.restaurant?.colour || "red"}
          themeTint={themeData?.restaurant?.tint || 400}
        >
          Settings
          <ChevronRightIcon className="h-5 w-5 text-white" />
        </Button>
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
            className="border-blue-gray-200 hidden w-96 flex-shrink-0 border-r bg-white lg:block xl:flex xl:flex-col "
          />
          <TabContent
            themeColour={themeData?.restaurant?.colour || "red"}
            themeTint={themeData?.restaurant?.tint || 400}
          >
            <Suspense
              fallback={
                <LoadingScreen
                  reverseTheme
                  themeColour={themeData?.restaurant?.colour || "red"}
                  themeTint={themeData?.restaurant?.tint || 400}
                />
              }
            >
              {renderSettingsTab()}
            </Suspense>
          </TabContent>
        </SettingsWrapper>
        {renderMobileFooter()}
      </SettingsWrapper>
      <Toaster />
    </>
  );
};

export { SettingsPage };
