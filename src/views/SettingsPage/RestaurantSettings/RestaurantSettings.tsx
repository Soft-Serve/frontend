import React from "react";
import type { FC } from "react";
import { UpdateRestaurantForm } from "@presentational";
import { useRestaurantQuery } from "@shared";
import { useRestaurantContext } from "@contexts";
import { Card, CardContent } from "@base";
import { SettingsHeader } from "../SettingsHeader";

const RestaurantSettings: FC = () => {
  const { restaurantSlug } = useRestaurantContext();

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
      <>
        <Card css="mb-4">
          <CardContent>
            <SettingsHeader>Restaurant</SettingsHeader>
          </CardContent>
        </Card>
        <div className="w-full mt-10">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <UpdateRestaurantForm restaurant={data.restaurant} />
          </div>
        </div>
      </>
    );
  }
  return null;
};

export { RestaurantSettings };
