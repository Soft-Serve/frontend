import React, { ChangeEvent, useState, useEffect } from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Button, Card, Input, Modal, UploadImageBox } from "@base";
import { useUploadPhoto } from "@hooks";
import { ItemImage, UpdateRestaurantSlugForm } from "@presentational";
import { useRestaurantContext } from "@contexts";
import type { Restaurant } from "./UpdateRestaurant.mutation";
import { ColourPicker } from "../ColourPicker";

interface Props {
  restaurant: Restaurant;
}

type StateMap = {
  [key: string]: any;
};

const UpdateRestaurantForm: FC<Props> = ({ restaurant }) => {
  const [isColourModalOpen, setIsColourModalOpen] = useState(false);
  const { themeColour, themeTint } = useRestaurantContext();
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();

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
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mr-4">
          Select Restaurant Theme Colour
        </h3>
        <ColourPicker onClose={setIsColourModalOpen} />
      </Modal>
      <Card withPadding={false} css={classnames("flex-col")}>
        <UpdateRestaurantSlugForm id={restaurant.id} slug={restaurant.slug} />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <Input
          labelText="Restaurant name"
          value={input.name}
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
        />
        <div className="flex items-end">
          <div>
            <span className="font-medium text-gray-700 text-sm">Theme Colour</span>
            <div className={`w-20 h-20 bg-${themeColour}-${themeTint} mr-4 rounded-md mt-2`}>
              <span className="sr-only">colour</span>
            </div>
          </div>
          <Button size="XL" onClick={() => setIsColourModalOpen(true)}>
            select colour
          </Button>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block my-4">Restaurant Logo</label>
          <div className="flex items-center w-full justify-between flex-wrap">
            <div className="m-2">
              <ItemImage photoUrl={input.logo} />
            </div>
            <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
          </div>
        </div>
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
