import React, { useState } from "react";
import type { FC } from "react";
import { Modal, Notification } from "@base";
import toast from "react-hot-toast";

import { ColourPicker } from "@presentational";
import { useUpdateRestaurantTheme } from "./UpdateRestautantTheme.mutation";
import { RestaurantThemeData, RESTAURANT_THEME_QUERY } from "@shared";

interface Props {
  id: number;
  logo: string;
  themeColour: string;
  themeTint: number;
  restaurantName: string;
  restaurantThemeColour: string;
  restaurantSlug: string;
  restaurantThemeTint: number;
}

const UpdateRestaurantThemeForm: FC<Props> = ({ id, themeColour, themeTint, restaurantSlug }) => {
  const [isColourModalOpen, setIsColourModalOpen] = useState(false);
  const onSuccess = () => toast.custom(<Notification header="Theme succesfully updated!" />);
  const [updateRestaurantTheme] = useUpdateRestaurantTheme({
    onCompleted: () => onSuccess(),
    update(cache, { data: updatedTheme }) {
      const { restaurant } = cache.readQuery({
        query: RESTAURANT_THEME_QUERY,
        variables: {
          restaurantSlug,
        },
      }) as RestaurantThemeData;
      cache.writeQuery({
        query: RESTAURANT_THEME_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          restaurant: {
            ...updatedTheme?.updateRestaurantTheme,
            font: restaurant?.font,
          },
        },
      });
    },
  });

  const handleSubmit = (colour: string, tint: number) => {
    updateRestaurantTheme({
      variables: {
        input: {
          id,
          tint,
          colour,
        },
      },
    });
  };

  return (
    <>
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="mr-4 font-Quicksand text-sm font-bold uppercase tracking-wider text-gray-900 ">
          Select Restaurant Theme Colour
        </h3>
        <ColourPicker
          handleSubmit={handleSubmit}
          themeColour={themeColour}
          themeTint={themeTint}
          onClose={setIsColourModalOpen}
        />
      </Modal>
      <div className="flex items-end">
        <div>
          <span className="font-Quicksand text-sm font-bold text-gray-900">Theme Colour</span>
          <div
            onKeyDown={() => setIsColourModalOpen(prevState => !prevState)}
            tabIndex={0}
            role="button"
            onClick={() => setIsColourModalOpen(prevState => !prevState)}
            className={`h-20 w-20 bg-${themeColour}-${themeTint} mr-4 mt-2 rounded-md`}
          >
            <span className="sr-only">colour</span>
          </div>
        </div>
      </div>
    </>
  );
};

export { UpdateRestaurantThemeForm };
