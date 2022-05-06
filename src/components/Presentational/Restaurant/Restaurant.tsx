import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Items, Menus, CategoriesContainer, WelcomePage, MobileSubHeader } from "@presentational";
import {
  useMenusQuery,
  useRestaurantThemeQuery,
  useCurrentUserQuery,
  useCategoriesQuery,
} from "@shared";
import { Container, BoxSection, HeroBanner, LoadingScreen } from "@base";

import { useRestaurantOnboardingQuery } from "./RestaurantOnboarding.query";
import { useParams } from "react-router-dom";

type Param = {
  id: string;
};

interface Props {
  menuID: number;
  setMenuID: Dispatch<SetStateAction<number>>;
  categoryID: number;
  setCategoryID: Dispatch<SetStateAction<number>>;
}

const Restaurant: FC<Props> = ({ menuID, setMenuID, categoryID, setCategoryID }) => {
  const { id: restaurantSlug } = useParams<Param>() as Param;

  const { data: currentUser, loading: userLoading } = useCurrentUserQuery();

  const { data: themeData } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const { data, error, loading } = useRestaurantOnboardingQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const { data: menusData, loading: menusLoading } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
    onCompleted: completedData => setMenuID(completedData?.menus?.[0]?.id),
  });

  const { data: categoryData, loading: categoryLoading } = useCategoriesQuery({
    variables: {
      menuID,
    },
    skip: !menuID,
    onCompleted: completedData =>
      setCategoryID(completedData?.categories?.filter(cat => cat.name !== "No category")?.[0]?.id),
  });

  if (loading || menusLoading || userLoading || categoryLoading) return <LoadingScreen />;

  const renderItems = () => {
    return (
      <Items
        categoryID={categoryID}
        restaurantSlug={restaurantSlug}
        themeFont={themeData?.restaurant?.font || "Quicksand"}
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
      />
    );
  };

  if (
    (!menusData?.menus.length || !data?.restaurant?.has_items || !data?.restaurant?.has_styles) &&
    !data?.restaurant?.onboarding_done
  ) {
    return (
      <Container>
        <BoxSection withPadding css={classnames("lg:py-10")}>
          <WelcomePage
            restaurantName={data?.restaurant?.name}
            isAdmin={!!currentUser?.currentUser}
            adminName={currentUser?.currentUser?.first_name}
            restaurantSlug={restaurantSlug}
            themeColour={themeData?.restaurant?.colour || "red"}
            themeTint={themeData?.restaurant?.tint || 400}
            hasMenus={menusData?.menus.length !== 0}
            hasItems={!!data?.restaurant?.has_items}
            hasStyles={!!data?.restaurant?.has_styles}
          />
        </BoxSection>
      </Container>
    );
  }

  if (data?.restaurant.has_items) {
    const categories = categoryData?.categories?.filter(cat => cat.name !== "No category") ?? [];

    return (
      <>
        <HeroBanner
          restaurantSlug={restaurantSlug}
          themeColour={themeData?.restaurant?.colour || "red"}
          themeFont={themeData?.restaurant?.font || "Quicksand"}
        />
        <Container>
          <BoxSection withPadding={false} css={classnames("max-w-6xl")}>
            <div className="hidden w-full lg:flex">
              <Menus
                isMenuLoading={menusLoading}
                menus={menusData?.menus ?? []}
                setMenuID={setMenuID}
                menuID={menuID}
                restaurantSlug={restaurantSlug}
                themeFont={themeData?.restaurant?.font || "Quicksand"}
                themeColour={themeData?.restaurant?.colour || "red"}
                themeTint={themeData?.restaurant?.tint || 400}
              />
            </div>
            <CategoriesContainer
              categories={categories}
              isCategoriesLoading={categoryLoading}
              categoryID={categoryID}
              menuID={menuID}
              setCategoryID={setCategoryID}
              themeFont={themeData?.restaurant?.font || "Quicksand"}
              themeColour={themeData?.restaurant?.colour || "red"}
              themeTint={themeData?.restaurant?.tint || 400}
            />
            <MobileSubHeader
              categories={categories}
              isCategoriesLoading={categoryLoading}
              menuID={menuID}
              categoryID={categoryID}
              setCategoryID={setCategoryID}
              themeFont={themeData?.restaurant?.font || "Quicksand"}
              themeColour={themeData?.restaurant?.colour || "red"}
              themeTint={themeData?.restaurant?.tint || 400}
            />
          </BoxSection>
          {renderItems()}
        </Container>
      </>
    );
  }
  return <p>{error?.message}</p>;
};

export { Restaurant };
