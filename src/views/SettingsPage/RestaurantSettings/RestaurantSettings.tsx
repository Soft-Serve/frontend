import React from "react";
import type { FC } from "react";
import { UpdateRestaurantForm } from "@presentational";
import { useRestaurantQuery } from "@shared";
import { Card, CardContent, TabWrapper, ThemeFonts } from "@base";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  themeFont: ThemeFonts;
  backgroundColour: string;
  backgroundTint: number;
}
const RestaurantSettings: FC<Props> = ({
  themeTint,
  themeColour,
  restaurantSlug,
  themeFont,
  backgroundColour,
  backgroundTint,
}) => {
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
        <div className="mt-10 w-full">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <UpdateRestaurantForm
              themeFont={themeFont}
              restaurantSlug={restaurantSlug}
              themeColour={themeColour}
              themeTint={themeTint}
              backgroundColour={backgroundColour}
              backgroundTint={backgroundTint}
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
