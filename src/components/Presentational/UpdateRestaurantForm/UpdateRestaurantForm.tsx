import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Card, UploadImageBox } from "@base";
import { useUploadPhoto } from "@hooks";
import {
  ItemImage,
  UpdateRestaurantAddressForm,
  UpdateRestaurantFontForm,
  UpdateRestaurantSlugForm,
  UpdateRestaurantThemeForm,
} from "@presentational";
import { useItemsQuery } from "@shared";
import type { Restaurant } from "./UpdateRestaurant.mutation";
import { ExampleItem } from "./ExampleItem";

interface Props {
  restaurant: Restaurant;
}

const UpdateRestaurantForm: FC<Props> = ({ restaurant }) => {
  const { photoFile, setPhotoFile } = useUploadPhoto();
  const { data } = useItemsQuery({
    variables: {
      categoryID: 1,
    },
  });

  const renderItem = () => {
    if (data?.items?.[0])
      return (
        <Card withPadding={false} css={classnames("flex-col", "my-2", "p-4")}>
          <label className="text-sm font-bold text-gray-900 block my-4 font-Quicksand">
            Item Card
          </label>
          <ExampleItem item={data?.items?.[0]} />
        </Card>
      );
    return null;
  };

  return (
    <>
      <Card withPadding={false} css={classnames("flex-col")}>
        <UpdateRestaurantSlugForm id={restaurant.id} slug={restaurant.slug} />
      </Card>
      {renderItem()}
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantThemeForm
          id={restaurant.id}
          restaurantThemeTint={restaurant.tint}
          restaurantThemeColour={restaurant.colour}
          restaurantName={restaurant.name}
          logo={restaurant.logo}
        />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantFontForm id={restaurant.id} />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <label className="text-sm font-bold text-gray-900 block my-4 font-Quicksand">
          Restaurant Logo
        </label>
        <div className="flex items-center w-full justify-between flex-wrap">
          <div className="m-2">
            <ItemImage photoUrl={restaurant.logo} />
          </div>
          <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
        </div>
      </Card>
      <Card css="mt-4">
        <UpdateRestaurantAddressForm
          restaurantName={restaurant.name}
          id={restaurant.id}
          addressLineOne={restaurant.address_line_1}
          addressLineTwo={restaurant.address_line_2}
          city={restaurant.city}
          province={restaurant.province}
          postalCode={restaurant.postal_code}
        />
      </Card>
    </>
  );
};

export { UpdateRestaurantForm };
