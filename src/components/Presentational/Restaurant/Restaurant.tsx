import React from "react";
import type { FC } from "react";
import { useGlobalContext, useRestaurantContext } from "src/contexts";
import { AllergyLegend, Items, Menus, CategoriesContainer } from "@presentational";
import { useRestaurantQuery } from "@shared";
import { Container, BoxSection, Footer, HeroBanner } from "@base";
import { classnames } from "tailwindcss-classnames";
import { SkeletonRestaurant } from "./SkeletonRestaurant";

const Restaurant: FC = () => {
  const { restaurantSlug } = useRestaurantContext();
  const { categoryID } = useGlobalContext();
  const { data, error, loading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });
  const renderItems = () => {
    if (categoryID) return <Items />;
    return null;
  };
  if (loading) return <SkeletonRestaurant />;

  if (data?.restaurant)
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
  return <p>{error?.message}</p>;
};

export { Restaurant };
