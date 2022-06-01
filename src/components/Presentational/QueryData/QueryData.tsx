import React, { ReactNode, Children, cloneElement, isValidElement } from "react";
import type { FC } from "react";
import {
  useCurrentUserQuery,
  useBannersQuery,
  useRestaurantThemeQuery,
  usePromotionsQuery,
} from "@shared";
import { useRestaurantOnboardingQuery } from "../Restaurant/RestaurantOnboarding.query";
import { LoadingScreen } from "@base";

interface Props {
  children: ReactNode;
  restaurantSlug: string;
}
const QueryData: FC<Props> = ({ children, restaurantSlug }) => {
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

  const { data: onBoardingData, loading: onboardingLoading } = useRestaurantOnboardingQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const { data: promoData } = usePromotionsQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const renderChildren = () =>
    Children.map(children, child =>
      isValidElement(child)
        ? cloneElement(child, {
            currentUser: currentUser?.currentUser,
            banners: bannersData?.banners,
            theme: themeData?.restaurant,
            onboarding: onBoardingData?.restaurant,
            promotions: promoData?.promotions,
          })
        : null
    );

  if (onboardingLoading || userLoading || bannersLoading || themeLoading) {
    return (
      <LoadingScreen
        themeColour={themeData?.restaurant?.colour || "red"}
        themeTint={themeData?.restaurant?.tint || 400}
      />
    );
  }
  return <>{renderChildren()}</>;
};

export { QueryData };
