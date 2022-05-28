import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Items, Menus, CategoriesContainer, WelcomePage, MobileSubHeader } from "@presentational";
import {
  useMenusQuery,
  useRestaurantThemeQuery,
  useCurrentUserQuery,
  useCategoriesQuery,
  Category,
  useBannersQuery,
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
  category?: Category;
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
}

const Restaurant: FC<Props> = ({ menuID, setMenuID, category, setCategory }) => {
  const { id: restaurantSlug } = useParams<Param>() as Param;

  const { data: currentUser, loading: userLoading } = useCurrentUserQuery();

  const { data: bannersData, loading: bannersLoading } = useBannersQuery({
    variables: {
      restaurantSlug,
    },
  });

  const { data: themeData, loading: themeLoading } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const { data, loading } = useRestaurantOnboardingQuery({
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
    onCompleted: completedData => {
      setCategory(completedData?.categories?.filter(cat => cat.name !== "No category")?.[0]);
    },
  });

  const categories = categoryData?.categories?.filter(cat => cat.name !== "No category") ?? [];

  if (loading || userLoading || bannersLoading || themeLoading)
    return (
      <LoadingScreen
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
      />
    );

  const renderItems = () => {
    return (
      <Items
        category={category}
        restaurantSlug={restaurantSlug}
        themeFont={themeData?.restaurant?.font || "Quicksand"}
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
      />
    );
  };

  const isUserOnboarded =
    (data?.restaurant?.has_items || data?.restaurant?.has_styles) &&
    data?.restaurant?.onboarding_done;

  if (isUserOnboarded) {
    return (
      <>
        <HeroBanner
          subHeader={bannersData?.banners?.[0]?.sub_header}
          header={bannersData?.banners?.[0]?.header}
          image={bannersData?.banners?.[0]?.photo}
          restaurantSlug={restaurantSlug}
          themeFont={themeData?.restaurant?.font || "Quicksand"}
          themeColour={themeData?.restaurant?.colour || "red"}
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
              category={category}
              menuID={menuID}
              setCategory={setCategory}
              themeFont={themeData?.restaurant?.font || "Quicksand"}
              themeColour={themeData?.restaurant?.colour || "red"}
              themeTint={themeData?.restaurant?.tint || 400}
            />
            <MobileSubHeader
              categories={categories}
              isCategoriesLoading={categoryLoading}
              menuID={menuID}
              category={category}
              setCategory={setCategory}
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
};

export { Restaurant };
