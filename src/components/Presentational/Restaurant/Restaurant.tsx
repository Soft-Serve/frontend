import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import {
  Items,
  Menus,
  CategoriesContainer,
  WelcomePage,
  MobileSubHeader,
  PromotionBanners,
} from "@presentational";
import { useMenusQuery, useCategoriesQuery, Category, Banner, Promotion } from "@shared";
import { Container, BoxSection, HeroBanner } from "@base";

import type { Onboarding } from "./RestaurantOnboarding.query";
import { useParams } from "react-router-dom";
import { User } from "src/shared/Users.query";
import { Theme } from "src/shared/RestaurantTheme.query";
import { filterCategories } from "src/utility";

type Param = {
  id: string;
};

interface Props {
  menuID: number;
  setMenuID: Dispatch<SetStateAction<number>>;
  category?: Category;
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
  currentUser?: User;
  banners?: Banner[];
  theme?: Theme;
  onboarding?: Onboarding;
  promotion?: Promotion;
}

const Restaurant: FC<Props> = ({
  menuID,
  setMenuID,
  category,
  setCategory,
  currentUser,
  banners,
  theme,
  onboarding,
  promotion,
}) => {
  const { id: restaurantSlug } = useParams<Param>() as Param;

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
    onCompleted: completedData => setCategory(filterCategories(completedData?.categories)?.[0]),
  });

  const isUserOnboarded = onboarding?.has_items || onboarding?.has_styles;

  const renderItems = () => {
    return (
      <Items
        category={category}
        restaurantSlug={restaurantSlug}
        themeFont={theme?.font || "Quicksand"}
        themeColour={theme?.colour || "red"}
        themeTint={theme?.tint || 400}
      />
    );
  };

  if (isUserOnboarded) {
    return (
      <>
        <PromotionBanners
          promotion={promotion}
          themeTint={theme?.tint || 400}
          themeFont={theme?.font || "Quicksand"}
          themeColour={theme?.colour || "red"}
        />
        <HeroBanner
          subHeader={banners?.[0]?.sub_header}
          header={banners?.[0]?.header}
          image={banners?.[0]?.photo}
          restaurantSlug={restaurantSlug}
          themeFont={theme?.font || "Quicksand"}
          themeColour={theme?.colour || "red"}
        />
        <Container css="bg-gray-50">
          <BoxSection withPadding={false} css={classnames("max-w-6xl")}>
            <div className="hidden w-full lg:flex">
              <Menus
                isAdmin={!!currentUser}
                isMenuLoading={menusLoading}
                menus={menusData?.menus ?? []}
                setMenuID={setMenuID}
                menuID={menuID}
                restaurantSlug={restaurantSlug}
                themeFont={theme?.font || "Quicksand"}
                themeColour={theme?.colour || "red"}
                themeTint={theme?.tint || 400}
              />
            </div>
            <CategoriesContainer
              categories={filterCategories(categoryData?.categories) ?? []}
              isCategoriesLoading={categoryLoading}
              category={category}
              menuID={menuID}
              setCategory={setCategory}
              themeFont={theme?.font || "Quicksand"}
              themeColour={theme?.colour || "red"}
              themeTint={theme?.tint || 400}
            />
            <MobileSubHeader
              categories={filterCategories(categoryData?.categories) ?? []}
              isCategoriesLoading={categoryLoading}
              menuID={menuID}
              category={category}
              setCategory={setCategory}
              themeFont={theme?.font || "Quicksand"}
              themeColour={theme?.colour || "red"}
              themeTint={theme?.tint || 400}
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
          restaurantName={onboarding?.name}
          isAdmin={!!currentUser}
          adminName={currentUser?.first_name}
          restaurantSlug={restaurantSlug}
          themeColour={theme?.colour || "red"}
          themeTint={theme?.tint || 400}
          hasMenus={menusData?.menus.length !== 0}
          hasItems={!!onboarding?.has_items}
          hasStyles={!!onboarding?.has_styles}
        />
      </BoxSection>
    </Container>
  );
};

export { Restaurant };
