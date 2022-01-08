import React, { FormEvent, useState } from "react";
import type { FC } from "react";
import { Button, Modal, Notification } from "@base";
import toast from "react-hot-toast";

import { ColourPicker } from "@presentational";
import { RESTAURANT_QUERY } from "@shared";
import { useViewport } from "@hooks";
import { useUpdateRestaurantTheme } from "./UpdateRestautantTheme.mutation";

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

const UpdateRestaurantThemeForm: FC<Props> = ({
  id,
  restaurantThemeColour,
  restaurantThemeTint,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  const [isColourModalOpen, setIsColourModalOpen] = useState(false);
  const { width } = useViewport();
  const onSuccess = () => toast.custom(<Notification header="Theme succesfully updated!" />);

  const [currentThemeColour, setCurrentThemeColour] = useState(themeColour);
  const [currentThemeTint, setCurrentThemeTint] = useState(themeTint);

  const isTablet = width < 592;

  const isThemeColourUpdated = restaurantThemeColour !== themeColour;
  const isThemeTintUpdated = restaurantThemeTint !== themeTint;
  const isThemeUpdated = isThemeColourUpdated || isThemeTintUpdated;

  const [updateRestaurantTheme, { loading }] = useUpdateRestaurantTheme({
    onCompleted: () => onSuccess(),
    refetchQueries: [
      {
        query: RESTAURANT_QUERY,
        variables: {
          restaurantSlug,
        },
      },
    ],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRestaurantTheme({
      variables: {
        input: {
          id,
          tint: currentThemeTint,
          colour: currentThemeColour,
        },
      },
    });
  };

  const renderUpdateSlugButton = () => {
    if (isThemeUpdated) {
      return (
        <div className="px-4 py-3  text-right sm:px-6 mt-4">
          <Button
            themeColour={themeColour}
            themeTint={themeTint}
            loading={loading}
            isFullwidth={isTablet}
            size="XXL"
            type="submit"
          >
            Update
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Modal isOpen={isColourModalOpen} onClose={setIsColourModalOpen}>
        <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mr-4 font-Quicksand ">
          Select Restaurant Theme Colour
        </h3>
        <ColourPicker
          themeColour={themeColour}
          themeTint={themeTint}
          setTheme={setCurrentThemeColour}
          setTint={setCurrentThemeTint}
          onClose={setIsColourModalOpen}
        />
      </Modal>
      <form onSubmit={handleSubmit}>
        <div className="flex items-end">
          <div>
            <span className="font-bold text-gray-900 text-sm font-Quicksand">Theme Colour</span>
            <div
              onKeyDown={() => setIsColourModalOpen(prevState => !prevState)}
              tabIndex={0}
              role="button"
              onClick={() => setIsColourModalOpen(prevState => !prevState)}
              className={`w-20 h-20 bg-${themeColour}-${themeTint} mr-4 rounded-md mt-2`}
            >
              <span className="sr-only">colour</span>
            </div>
          </div>
          {renderUpdateSlugButton()}
        </div>
      </form>
    </>
  );
};

export { UpdateRestaurantThemeForm };
