import React from "react";
import type { FC } from "react";
import { UpdateRestaurantForm } from "@presentational";
import { useRestaurantQuery } from "@shared";
import { TabWrapper, ThemeFonts } from "@base";
import { SettingsHeader } from "../SettingsHeader";
import { Box, Column, Columns } from "@interface";

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
        <Box>
          <Columns isMarginless>
            <Column columnWidth="six" className="justify-center">
              <SettingsHeader>Restaurant</SettingsHeader>
            </Column>
          </Columns>
        </Box>
        <UpdateRestaurantForm
          themeFont={themeFont}
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          backgroundColour={backgroundColour}
          backgroundTint={backgroundTint}
          restaurant={data.restaurant}
        />
      </TabWrapper>
    );
  }
  return null;
};

export { RestaurantSettings };
