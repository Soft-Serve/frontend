import React, { useState } from "react";
import type { FC } from "react";
import { Modal, Notification } from "@base";
import toast from "react-hot-toast";

import { ColourPicker } from "@presentational";
import { useUpdateRestaurantBackground } from "./UpdateRestaurantBackground.mutation";
import { RestaurantThemeData, RESTAURANT_THEME_QUERY } from "@shared";
import { lightColors } from "@constants";

interface Props {
  id: number;
  backgroundColor: string;
  backgroundTint: number;
  restaurantSlug: string;
}

const UpdateRestaurantBackgroundForm: FC<Props> = ({
  id,
  backgroundColor,
  backgroundTint,
  restaurantSlug,
}) => {
  const [isColourModalOpen, setIsColourModalOpen] = useState(false);
  const onSuccess = () => toast.custom(<Notification header="Background succesfully updated!" />);
  const [updateRestaurantBackground] = useUpdateRestaurantBackground({
    onCompleted: () => onSuccess(),
    update(cache, { data: backgroundData }) {
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
            ...backgroundData?.updateRestaurantBackground,
            font: restaurant?.font,
            colour: restaurant?.colour,
            tint: restaurant?.tint,
          },
        },
      });
    },
  });

  const handleSubmit = (background_colour: string, background_tint: number) => {
    updateRestaurantBackground({
      variables: {
        input: {
          id,
          background_colour,
          background_tint,
        },
      },
    });
  };

  return (
    <>
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="mr-4 font-Quicksand text-sm font-bold uppercase tracking-wider text-gray-900 ">
          Select Restaurant Background Colour
        </h3>
        <ColourPicker
          colours={lightColors}
          handleSubmit={handleSubmit}
          themeColour={backgroundColor}
          themeTint={backgroundTint}
          onClose={setIsColourModalOpen}
        />
      </Modal>
      <div className="flex items-end">
        <div>
          <span className="font-Quicksand text-sm font-bold text-gray-900">Background Colour</span>
          <div
            onKeyDown={() => setIsColourModalOpen(prevState => !prevState)}
            tabIndex={0}
            role="button"
            onClick={() => setIsColourModalOpen(prevState => !prevState)}
            className={`h-20 w-20 bg-${backgroundColor}-${backgroundTint} mr-4 mt-2 rounded-md`}
          >
            <span className="sr-only">colour</span>
          </div>
        </div>
      </div>
    </>
  );
};

export { UpdateRestaurantBackgroundForm };
