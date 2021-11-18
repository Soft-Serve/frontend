import React, { ChangeEvent, useState, useEffect } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Card, Input } from "@base";
import { useUploadPhoto } from "@hooks";
import { UpdateRestaurantSlugForm, UpdateRestaurantThemeForm } from "@presentational";
import type { Restaurant } from "./UpdateRestaurant.mutation";

interface Props {
  restaurant: Restaurant;
}

type StateMap = {
  [key: string]: any;
};

const UpdateRestaurantForm: FC<Props> = ({ restaurant }) => {
  const { photoFile, fetchPhoto } = useUploadPhoto();

  const currentRestaurant: StateMap = {
    ...restaurant,
  };
  const [input, setInput] = useState<StateMap>(currentRestaurant);

  useEffect(() => {
    if (!photoFile) return;

    const updateLogoState = async () => {
      const logo = await fetchPhoto();
      setInput(prevState => ({ ...prevState, logo }));
    };

    updateLogoState();
  }, [photoFile, fetchPhoto, restaurant]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Card withPadding={false} css={classnames("flex-col")}>
        <UpdateRestaurantSlugForm id={restaurant.id} slug={restaurant.slug} />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantThemeForm
          id={restaurant.id}
          restaurantThemeTint={restaurant.tint}
          restaurantThemeColour={restaurant.colour}
          restaurantName={restaurant.name}
          logo={restaurant.logo}
        />
      </Card>
      <Card css="mt-4">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input
              labelText="Address line 1"
              type="text"
              name="address_line_1"
              id="address_line_1"
              onChange={handleChange}
              value={input.address_line_1}
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input
              labelText="Address line 2"
              type="text"
              name="address_line_2"
              id="address_line_2"
              onChange={handleChange}
              value={input.address_line_2}
              autoComplete="address_line_2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input
              labelText="City"
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={input.city}
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input
              labelText="Province"
              type="text"
              name="province"
              id="province"
              onChange={handleChange}
              value={input.province}
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Input
              labelText="Postal code"
              type="text"
              name="postal_code"
              id="postal_code"
              onChange={handleChange}
              value={input.postal_code}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export { UpdateRestaurantForm };
