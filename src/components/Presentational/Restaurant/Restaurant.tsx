import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Items, Menus, CategoriesContainer, WelcomePage, MobileSubHeader } from "@presentational";
import { useMenusQuery, RESTAURANT_QUERY, useRestaurantThemeQuery } from "@shared";
import { Container, BoxSection, HeroBanner, LoadingScreen } from "@base";

import { useUpdateRestaurantOnboarding } from "./UpdateRestaurantOnboarding.mutation";
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
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

const Restaurant: FC<Props> = ({ menuID, setMenuID, categoryID, setCategoryID, setActiveMenu }) => {
  const { id: restaurantSlug } = useParams<Param>() as Param;

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
  });

  const [updateRestaurantOnboarding] = useUpdateRestaurantOnboarding({
    refetchQueries: [
      {
        query: RESTAURANT_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
  });

  if (loading || menusLoading) return <LoadingScreen />;

  const hideWelcomePage = () => {
    updateRestaurantOnboarding({
      variables: {
        input: {
          id: restaurantSlug,
          onboarding_done: true,
        },
      },
    });
  };

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
            restaurantSlug={restaurantSlug}
            themeColour={themeData?.restaurant?.colour || "red"}
            themeTint={themeData?.restaurant?.tint || 400}
            hasMenus={menusData?.menus.length !== 0}
            hasItems={!!data?.restaurant?.has_items}
            hasStyles={!!data?.restaurant?.has_styles}
            hideWelcomePage={hideWelcomePage}
          />
        </BoxSection>
      </Container>
    );
  }

  if (data?.restaurant.has_items) {
    return (
      <>
        <HeroBanner
          restaurantSlug={restaurantSlug}
          themeColour={themeData?.restaurant?.colour || "red"}
          themeFont={themeData?.restaurant?.font || "Quicksand"}
        />
        <Container>
          <BoxSection withPadding={false} css={classnames("max-w-6xl")}>
            <div className="w-full lg:flex hidden">
              <Menus
                setActiveMenu={setActiveMenu}
                setMenuID={setMenuID}
                menuID={menuID}
                restaurantSlug={restaurantSlug}
                themeFont={themeData?.restaurant?.font || "Quicksand"}
                themeColour={themeData?.restaurant?.colour || "red"}
                themeTint={themeData?.restaurant?.tint || 400}
              />
            </div>
            <CategoriesContainer
              categoryID={categoryID}
              menuID={menuID}
              setCategoryID={setCategoryID}
              themeFont={themeData?.restaurant?.font || "Quicksand"}
              themeColour={themeData?.restaurant?.colour || "red"}
              themeTint={themeData?.restaurant?.tint || 400}
            />
            <MobileSubHeader
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
