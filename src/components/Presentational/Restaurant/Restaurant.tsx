import React, { useState } from "react";
import type { FC } from "react";
import { useGlobalContext, useRestaurantContext } from "src/contexts";
import { AllergyLegend, Items, Menus, CategoriesContainer, WelcomePage } from "@presentational";
import { useRestaurantQuery, useMenusQuery } from "@shared";
import { Container, BoxSection, Footer, HeroBanner } from "@base";
import { classnames } from "tailwindcss-classnames";
import { SkeletonRestaurant } from "./SkeletonRestaurant";

const Restaurant: FC = () => {
  const [skipChecklist, setSkipChecklist] = useState(false);
  const { restaurantSlug } = useRestaurantContext();
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
  const renderItems = () => {
    if (categoryID) return <Items />;
    return null;
  };
  if (loading || menusLoading) return <SkeletonRestaurant />;

  if (
    (menusData?.menus.length === 0 ||
      !data?.restaurant?.has_items ||
      !data?.restaurant?.has_styles) &&
    !skipChecklist
  ) {
    return (
      <Container>
        <BoxSection withPadding css={classnames("lg:py-10")}>
          <WelcomePage
            hasMenus={menusData?.menus.length !== 0}
            hasItems={!!data?.restaurant?.has_items}
            hasStyles={data?.restaurant?.logo !== null || !!data?.restaurant?.has_styles}
            skipChecklist={state => setSkipChecklist(state)}
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
              <Menus />
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
