import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import type { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Modal, UploadImageBox } from "@base";
import { useUploadPhoto } from "@hooks";
import { ItemImage } from "@presentational";
import { RESTAURANT_QUERY } from "@shared";
import { useRestaurantContext } from "@contexts";
import { useUpdateRestaurant } from "./UpdateRestaurant.mutation";
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
  const { setRestaurantSlug } = useRestaurantContext();
  const { themeColour, themeTint } = useRestaurantContext();
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();
  const currentRestaurant: StateMap = {
    ...restaurant,
  };
  const history = useHistory();
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

  const [updateRestaurant] = useUpdateRestaurant({
    update(cache, { data: updatedRestaurantData }) {
      cache.writeQuery({
        query: RESTAURANT_QUERY,
        data: {
          Restaurant: { ...updatedRestaurantData?.updatedRestaurant },
        },
      });
    },
    onCompleted: completedData => {
      setRestaurantSlug(completedData.updatedRestaurant.slug);

      history.push(`/settings/${completedData.updatedRestaurant.slug}`);

      window.location.reload();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRestaurant({
      variables: {
        input: {
          slug: input.slug,
          name: input.name,
          primary_colour: input.primary_colour,
          secondary_colour: input.secondary_colour,
          logo: input.logo,
          address_line_1: input.address_line_1,
          address_line_2: input.address_line_2,
          city: input.city,
          province: input.province,
          postal_code: input.postal_code,
          country: input.country,
          __typename: "Mutation",
          id: input.id,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updatedRestaurant: {
          slug: input.slug,
          name: input.name,
          primary_colour: input.primary_colour,
          secondary_colour: input.secondary_colour,
          logo: input.logo,
          address_line_1: input.address_line_1,
          address_line_2: input.address_line_2,
          city: input.city,
          province: input.province,
          postal_code: input.postal_code,
          country: input.country,
          __typename: "Mutation",
          id: input.id,
        },
      },
    });
  };

  const isRestaurantUpdated = () => {
    if (Object.keys(restaurant).length === Object.keys(input).length) {
      return !Object.keys(restaurant).every(
        key =>
          Object.prototype.hasOwnProperty.call(input, key) && input[key] === currentRestaurant[key]
      );
    }
    return false;
  };

  return (
    <>
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mr-4">
          Select Restaurant Theme Colour
        </h3>
        <ColourPicker onClose={setIsColourModalOpen} />
      </Modal>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1 sm:col-span-1">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Slug
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span
                    className={`inline-flex sm:hidden lg:block items-center px-3 rounded-l-md  border-r-0 border-2 border-${themeColour}-${themeTint}  text-white bg-${themeColour}-${themeTint}  sm:text-sm font-bold"`}
                  >
                    http://www.softserve.com/restaurants/
                  </span>
                  <input
                    value={input.slug}
                    onChange={handleChange}
                    type="text"
                    name="slug"
                    id="slug"
                    className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} sm:text-sm border-2 border-${themeColour}-${themeTint}`}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2">
                <Input
                  labelText="Restaurant name"
                  value={input.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <div className="flex items-end">
                  <div>
                    <span className="font-medium text-gray-700 text-sm">Theme Colour</span>
                    <div
                      className={`w-20 h-20 bg-${themeColour}-${themeTint} mr-4 rounded-md mt-2`}
                    >
                      <span className="sr-only">colour</span>
                    </div>
                  </div>
                  <Button size="XL" onClick={() => setIsColourModalOpen(true)}>
                    select colour
                  </Button>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Input
                  labelText="Text colour"
                  type="text"
                  value={input.secondary_colour}
                  onChange={handleChange}
                  name="secondary_colour"
                  id="secondary_colour"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block">Restaurant Logo</label>
              <div className="flex items-center w-full justify-between">
                <ItemImage photoUrl={input.logo} />
                <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
              </div>
            </div>
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
          </div>
          {(isRestaurantUpdated() || photoFile) && (
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button size="XL" type="submit">
                Save
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export { UpdateRestaurantForm };
