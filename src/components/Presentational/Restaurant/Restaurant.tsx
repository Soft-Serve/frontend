import React from "react";
import type { FC } from "react";
import { useGlobalContext, useRestaurantContext } from "src/contexts";
import { AllergyLegend, Items, Menus, CategoriesContainer, WelcomePage } from "@presentational";
import { useRestaurantQuery, useMenusQuery, RESTAURANT_QUERY } from "@shared";
import { Container, BoxSection, Footer, HeroBanner } from "@base";
import { classnames } from "tailwindcss-classnames";
import { SkeletonRestaurant } from "./SkeletonRestaurant";
import { useUpdateRestaurantOnboarding } from "./UpdateRestaurantOnboarding.mutation";

const Restaurant: FC = () => {
  const { restaurantSlug, themeFont } = useRestaurantContext();
  const { categoryID } = useGlobalContext();
  const { data, error, loading } = useRestaurantQuery({
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

  if (loading || menusLoading) return <SkeletonRestaurant />;

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
    if (!categoryID) return null;
    return <Items />;
  };

  if (
    (!menusData?.menus.length || !data?.restaurant?.has_items || !data?.restaurant?.has_styles) &&
    !data?.restaurant?.onboarding_done
  ) {
    return (
      <Container>
        <BoxSection withPadding css={classnames("lg:py-10")}>
          <WelcomePage
            hasMenus={menusData?.menus.length !== 0}
            hasItems={!!data?.restaurant?.has_items}
            hasStyles={!!data?.restaurant?.has_styles}
            hideWelcomePage={hideWelcomePage}
          />
        </BoxSection>
      </Container>
    );
  }

  if (data?.restaurant) {
    return (
      <>
        <div className="lg:block hidden">
          <HeroBanner />
        </div>
        <Container>
          <BoxSection withPadding={false} css={classnames("max-w-6xl")}>
            <div className="w-full lg:flex hidden">
              <Menus themeFont={themeFont} />
            </div>
            <CategoriesContainer />
          </BoxSection>
          <div className="px-2 flex items-start sm:px-6 lg:px-8 lg:mt-2">
            <AllergyLegend />
          </div>
          {renderItems()}
        </Container>
        <Footer />
      </>
    );
  }
  return <p>{error?.message}</p>;
};

export { Restaurant };
