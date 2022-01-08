import React from "react";
import type { FC } from "react";
import { UpdateRestaurantForm } from "@presentational";
import { useRestaurantQuery } from "@shared";
import { Card, CardContent, TabWrapper } from "@base";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}
const RestaurantSettings: FC<Props> = ({ themeTint, themeColour, restaurantSlug }) => {
  const { data, loading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });
  if (loading) {
    return <p>loading</p>;
  }
  if (data?.restaurant) {
    return (
      <TabWrapper>
        <Card css="mb-4">
          <CardContent>
            <SettingsHeader>Restaurant</SettingsHeader>
          </CardContent>
        </Card>
        <div className="w-full mt-10">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <UpdateRestaurantForm
              restaurantSlug={restaurantSlug}
              themeColour={themeColour}
              themeTint={themeTint}
              restaurant={data.restaurant}
            />
          </div>
        </div>
      </TabWrapper>
    );
  }
  return null;
};

export { RestaurantSettings };
